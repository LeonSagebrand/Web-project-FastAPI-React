from datetime import timedelta, datetime
from fastapi import HTTPException, status, APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Users, Group
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from schemas import CreateUserRequest, Token, EmailPasswordRequest, User
from sqlalchemy.exc import IntegrityError
from typing import List
from sqlalchemy import select, update, delete, insert


router = APIRouter()

SECRET_KEY = "F3xH2sN8JrLp5Rq1e9mV7E8gH4iQ2kT6mX3sY9vB1W7zR5yD2oP1lV9cN3jF6"
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

# Create user
@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(
    create_user_request: CreateUserRequest,
    db: Session = Depends(get_db)
):
    try:
        hashed_password = bcrypt_context.hash(create_user_request.password)
        
        user = Users(
            username=create_user_request.username,
            email=create_user_request.email,
            hashed_password=hashed_password
        )

        db.add(user)
        db.commit()
        db.refresh(user)
        
        return user
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error"
        )

# Login
@router.post("/login", response_model=Token)
async def login(request_data: EmailPasswordRequest, db: Session = Depends(get_db)):
    user = authenticate_user(request_data.email, request_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid email or password")
    token = create_access_token(user.email, user.id, timedelta(minutes=20))
    return {"access_token": token, "token_type": "bearer"}
      

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

async def get_current_user(token: str = Depends(oauth2_bearer)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        user_id: int = payload.get("id")
        if email is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Could not validate user.")
        return {"email": email, "id": user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate user.")
    

@router.delete("/users/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}
    
    

# Create Groups

@router.post("/groups", response_model=Group, status_code=status.HTTP_201_CREATED)
async def create_group(creator_id: int, group_name: str, db: Session = Depends(get_db)):
    new_group = Group(name = group_name, creator_id = creator_id)
    db.add(new_group)
    db.commit()
    return new_group


def join_group(group_id: int, user_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()
    user = db.query(User).filter(User.id == user_id).first()
    if not group or not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group not found")
    if user in group.members:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is already a member of the group")
    
    group.users.append(user)
    db.commit()
    return group


@router.get("/groups/{group_id}/users/", response_model=List[User])
async def get_group_members(group_id: int, db: Session = Depends(get_db)):
    
    query = select(Group)
    users = db.scalars(query).all()
    return users


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