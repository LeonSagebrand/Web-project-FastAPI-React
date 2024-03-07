from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Table, Float
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from database import Base

DATABASE_NAME = "db"
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DATABASE_NAME}"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()  



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)  

class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    members = relationship("User", back_populates="groups")
    
class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    share = Column(String)
    date = Column(String)
    
class Share(Base):
    __tablename__ = "shares"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    price = Column(Float)
    member_id = Column(Integer, ForeignKey('users.id'))
    member = relationship("User", back_populates="shares")



user_group_association = Table(
    'user_group', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('group_id', Integer, ForeignKey('groups.id'))
)


Base.metadata.create_all(bind=engine)
