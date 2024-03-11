from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from .database import Base
from sqlalchemy.orm import relationship

#användare
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    groups = relationship("Group", back_populates="creator")
    
class UserCreate(BaseModel):
    username: str
    email: str
    password: str
        
class UserLogin(BaseModel):
    email: str
    password: str
    
    
    
#grupper
class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    creator_id = Column(Integer, ForeignKey('users.id'))
    creator = relationship("User", back_populates="groups")
    
class GroupCreate(BaseModel):
    name: str
    description: str
    creator_id: int