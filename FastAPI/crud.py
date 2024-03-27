from datetime import timedelta, datetime
from fastapi import HTTPException, status, APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Users, Group
from passlib.context import CryptContext
from jose import jwt, JWTError
from schemas import CreateUserRequest, Token, EmailPasswordRequest, User, CreateGroupRequest
from sqlalchemy.exc import IntegrityError
from typing import List, Annotated
from sqlalchemy import select, update, delete, insert
from auth import get_current_user


router = APIRouter(
    prefix="/crud",
    tags=["/crud"])


def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

from passlib.context import CryptContext
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import Users
from schemas import Token
from typing import Annotated
from fastapi import Depends, status, HTTPException
from database import get_db




SECRET_KEY = "F3xH2sN8JrLp5Rq1e9mV7E8gH4iQ2kT6mX3sY9vB1W7zR5yD2oP1lV9cN3jF6"
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def authenticate_user(email: str, password: str, db: Session):
    user = db.query(Users).filter(Users.email == email).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(email: str, user_id: int, expires_delta: timedelta):
    encode = {"sub": email, "id": user_id}
    expires = datetime.utcnow() + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


# async def get_current_user(token: str = Depends(oauth2_bearer)):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         email: str = payload.get("sub")
#         user_id: int = payload.get("id")
#         if email is None or user_id is None:
#             raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
#                                 detail="Could not validate user.")
#         return {"email": email, "id": user_id}
#     except JWTError:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
#                             detail="Could not validate user.")
    

@router.delete("/users/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}
    
    

# Create Groups

@router.post("/groups", status_code=status.HTTP_201_CREATED)
def create_group(create_group_request: CreateGroupRequest, db: Session = Depends(get_db)):
    try:
        new_group = Group(**create_group_request.model_dump())
        db.add(new_group)
        db.commit()
    except IntegrityError as e:
        raise HTTPException(status_code=400, detail="Database error")
    return new_group



@router.post("/groups", status_code=status.HTTP_200_OK)
def join_group(group_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Fetch the group from the database
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group not found")
    
    # Add the current user to the group
    group.members.append(current_user)
    db.commit()

    return {"message": f"User {current_user.username} joined group {group.name}"}



# @router.post("/groups/join/{user_id}")
# def join_group(group_id: int, user_id: int, db: Session = Depends(get_db)):
#     group = db.query(Group).filter(Group.id == group_id).first()
#     user = db.query(User).filter(User.id == user_id).first()
#     if not group or not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group not found")
#     if user in group.members:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is already a member of the group")
    
#     group.members.append(user)
#     db.commit()
#     return group


@router.get("/groups")
def get_groups(db: Session = Depends(get_db)):
    groups = db.query(Group).all()
    return groups

@router.get("/groups/recent")
def get_recent_groups(db: Session = Depends(get_db)):
    groups = get_groups(db)
    
    recent_groups = groups[-5:]
    return recent_groups


@router.get("/groups/{group_id}/users/", response_model=List[User])
async def get_group_members(group_id: int, db: Session = Depends(get_db)):
    
    query = select(Group)
    users = db.scalars(query).all()
    return Group.users


@router.delete("/groups/{group_id}/users/{user_id}")
async def delete_user_from_group(group_id: int, user_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group not found")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if user not in group.members:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User is not a member of the group")
    
    group.members.remove(user)
    db.commit()

    return {"message": "User removed from the group"}

@router.delete("/groups/{group_id}/")
def delete_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group not found")
    
    db.delete(group)
    db.commit()

    return {"message": "Group deleted"}


# def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     token_data = verify_token_access(token, credentials_exception)
#     user = db.scalars(select(User).where(User.id == token_data.sub)).first()
#     return user

