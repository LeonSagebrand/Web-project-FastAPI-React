from pydantic import BaseModel, EmailStr, Field

class CreateUserRequest(BaseModel):
    username: str
    email: EmailStr
    password: str = Field("Minimum 6 tokens", min_length=6)

class CreateGroupRequest(BaseModel):
    name: str
    creator_name: str

class User(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True

class EmailPasswordRequest(BaseModel):
    email: str
    password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

class Group(BaseModel):
    id: int
    name: str
    users: str
    creator_id: int
    
