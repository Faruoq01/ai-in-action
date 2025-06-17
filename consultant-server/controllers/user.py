import datetime
import os
import uuid
from jose import jwt
from uuid import uuid4
from typing import Annotated
from bson import ObjectId
from fastapi import APIRouter, Cookie, Depends, File, HTTPException, Header, Request, Response, UploadFile
from fastapi.security import OAuth2PasswordBearer
from schemas.agents import TokenRequest, User
from config.mongodb import MongoDBClient
import google.auth.transport.requests
import google.oauth2.id_token
# from middleware.process_time import add_process_time_dependency, add_process_time_header

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

################# Environments ###########################
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 86400  
COOKIE_NAME = "consultant-gateway"
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
FRONTEND_REDIRECT_URI = os.getenv("FRONTEND_REDIRECT_URI")


################## Routes ###############################
def convert_objectid_to_str(doc: dict) -> dict:
    """Convert all ObjectId values in a dict to strings."""
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            doc[key] = str(value)
    return doc

@router.post("/auth/google")
async def verify_google_token(req: TokenRequest, response: Response):
    db = MongoDBClient.get_database()
    try:
        request = google.auth.transport.requests.Request()
        id_info = google.oauth2.id_token.verify_oauth2_token(
            req.token, request, GOOGLE_CLIENT_ID
        )
        
        user_data = {
            "id": str(uuid.uuid4()),
            "google_id": id_info.get("sub"),
            "email": id_info.get("email"),
            "name": id_info.get("name"),
            "email_verified": id_info.get("email_verified"),
            "picture": id_info.get("picture"),
        }

        # Find existing user by google_id
        user = await db["users"].find_one({"google_id": user_data["google_id"]})
        
        if not user:
            insert_result = await db["users"].insert_one(user_data)
            user_data["_id"] = insert_result.inserted_id
            user = user_data
        
        user = convert_objectid_to_str(user)

        # Check if session exists
        auth = await db["auth"].find_one({"user_id": user["id"]})
        if not auth:
            session_data = {
                "id": str(uuid.uuid4()),
                "user_id": user["id"],
                "token": create_jwt_token(user),
            }
            await db["auth"].insert_one(session_data)

        response.set_cookie(
            key=COOKIE_NAME,
            value=str(auth["id"]),  
            httponly=True,
            max_age=86400,
            expires=86400,
            samesite="lax",
            secure=True,
            path="/"
        )
        
        return {"user": user}
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
async def verify_token(x_token: Annotated[str | None, Cookie()] = None):
    if not x_token:
        raise HTTPException(status_code=401, detail="Missing token cookie")
    print("Token from cookie:", x_token)
    return x_token

@router.get("/user/me")
async def get_current_user(
    token: str = Depends(verify_token)
):
    db = MongoDBClient.get_database()
    
    # Find auth session by token (which is auth._id as string)
    auth_session = await db["auth"].find_one({"_id": ObjectId(token)})
    if not auth_session:
        raise HTTPException(status_code=401, detail="Invalid session token")
    
    user_id = auth_session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=404, detail="User ID not found in session")

    # Find user by user_id (assuming user_id stored as string UUID)
    user = await db["users"].find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Remove sensitive fields before returning if needed
    user.pop("_id", None)

    return {"user": user}

def create_jwt_token(data: dict, expires_delta: int = ACCESS_TOKEN_EXPIRE_SECONDS):
    to_encode = data.copy()
    current_time = datetime.datetime.utcnow() 
    expire = current_time + datetime.timedelta(seconds=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
 