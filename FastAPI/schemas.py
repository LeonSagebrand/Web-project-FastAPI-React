from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import List

class UserRegister(BaseModel):
    user_id: int
    username: str
    email: EmailStr


class Group(BaseModel):
    id: int 
    name: str
    users: List[UserRegister]


class Stock(BaseModel):
    stock_id: int
    name: str
    value: int
    date: date