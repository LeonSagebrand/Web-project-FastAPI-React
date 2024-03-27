from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base

group_user_association = Table('group_user_association', Base.metadata,
    Column('group_id', Integer, ForeignKey('groups.id')),
    Column('user_id', Integer, ForeignKey('users.id'))
)

class Users(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    
    # Define the many-to-many relationship with Group
    groups = relationship("Group", secondary=group_user_association, back_populates="members")
    
    
class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False) 
    creator_name = Column(String, nullable=False)  
    
    # Define the many-to-many relationship with User
    members = relationship("Users", secondary=group_user_association, back_populates="groups")


#     # This is Mapped as a list of users for each group. Defined as the user class

#     # Add other group attributes as needed

#     id: Mapped[int] = mapped_column(Integer, primary_key=True)
#     name: Mapped[str] = mapped_column(String, unique=True)
#     members: Mapped["User"] = relationship("User", secondary="user_group", back_populates="groups")

# class Transaction(Base):
#     __tablename__ = "transactions"
    
#     id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
#     amount: Mapped[float] = mapped_column(Float)
#     share: Mapped[str] = mapped_column(String)
#     date: Mapped[str] = mapped_column(String)
#     id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
#     amount: Mapped[int] = mapped_column(Float)
#     category: Mapped[str] = mapped_column(String)
#     description: Mapped[str] = Column(String)
#     is_income: Mapped[bool] = Column(Boolean)
#     date: Mapped[int] = mapped_column(String)
    
# class Share(Base):
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, unique=True)
#     price = Column(Float)
#     member = relationship("User")
    
# class UserLogin(BaseModel):
#     email: str
#     password: str