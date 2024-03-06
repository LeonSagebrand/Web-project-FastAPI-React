from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Table
from database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    groups = relationship("Group", secondary="user_group", back_populates="members")

class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    members = relationship("User", secondary="user_group", back_populates="groups")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    category = Column(String)
    description = Column(String)
    is_income = Column(Boolean)
    date = Column(String)