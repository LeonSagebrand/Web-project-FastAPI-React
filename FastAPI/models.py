from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from pydantic import validator, EmailStr
from pydantic import BaseModel
from sqlalchemy.orm import relationship


@validator("account_id")
def validate_account_id(cls, value):
    if value <= 0:
        raise ValueError(f"account_id must be positive: {value}")
    return value


class Users(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    
@validator("email")
def validate_email(cls, value):
    if not EmailStr.validate(value):
        raise ValueError("Invalid email address")
    return value




