from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from database import Base
from sqlalchemy.orm import relationship, Mapped, mapped_column
from typing import List
from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Table
from database import Base  
from sqlalchemy.orm import relationship
from pydantic import BaseModel


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    groups = relationship("Group", secondary="user_group", back_populates="members")

class Group(Base):
    __tablename__ = "groups"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True)
    users: Mapped[List["User"]] = mapped_column(ForeignKey('users.id'), nullable=False) # The users column references the user ids from users table.
    # This is Mapped as a list of users for each group. Defined as the user class

    # Add other group attributes as needed

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    members = relationship("User", secondary="user_group", back_populates="groups")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    share = Column(String)
    date = Column(String)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    amount: Mapped[int] = mapped_column(Float)
    category: Mapped[str] = mapped_column(String)
    description: Mapped[str] = Column(String)
    is_income: Mapped[bool] = Column(Boolean)
    date: Mapped[date] = mapped_column(String)
    
class Share(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    price = Column(Float)
    member = relationship("User")
    
class UserLogin(BaseModel):
    email: str
    password: str