from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

class User(BaseModel):
    name: str
    email: str
    age: int

class PromptRequest(BaseModel):
    query: str

class PromptResponse(BaseModel):
    result: str | dict | float


