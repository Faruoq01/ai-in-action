from typing import Annotated
from bson import ObjectId
from fastapi import APIRouter, Cookie, Depends, File, HTTPException, Header, Request, Response, UploadFile
from fastapi.security import OAuth2PasswordBearer
from schemas.climate import Item, User
from config.mongodb import MongoDBClient
# from middleware.process_time import add_process_time_dependency, add_process_time_header

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@router.post("/users/")
async def create_user(user: User):
    db = MongoDBClient.get_database()
    user_dict = user.model_dump() 
    try:
        result = await db["users"].insert_one(user_dict)
        return {"message": "User created", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {e}")
    
@router.get("/users/{user_id}")
async def get_user(user_id: str):
    db = MongoDBClient.get_database()
    user = await db["users"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["id"] = str(user["_id"])
    del user["_id"]
    return user

@router.put("/users/{user_id}")
async def update_user(user_id: str, user: User):
    db = MongoDBClient.get_database()
    user_dict = user.model_dump(exclude_unset=True)  # Only update fields sent
    result = await db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": user_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User updated"}

@router.delete("/users/{user_id}")
async def delete_user(user_id: str):
    db = MongoDBClient.get_database()
    result = await db["users"].delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}


async def verify_token(x_token: Annotated[str, Cookie()] = None):
    print(x_token)
    return x_token

@router.get("/protected", dependencies=[Depends(verify_token)])
async def protected_route():
    return {"message": "Protected content"}
 