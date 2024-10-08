from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session, sessionmaker
from starlette import status
from database import SessionLocal
from models import Users
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from schemas import CreateUserRequest, Token, EmailPasswordRequest, User, UsernameEmailCheck
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
import os

router = APIRouter(
    prefix="/auth",
    tags=["/auth"]
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/login")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()
    
db_dependency = Annotated[Session, Depends(get_db)]



#skapa användare
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
    
    
#login
@router.post("/login", response_model=Token)
async def login(login_data: EmailPasswordRequest, db: Session = Depends(get_db)):
    email = login_data.email
    password = login_data.password
    
    user = authenticate_user(email, password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid email or password")
    token = create_access_token(user.email, user.id, timedelta(minutes=20))
    return {"access_token": token, "token_type": "bearer"}


def authenticate_user(email: str, password: str, db):
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

async def get_current_user(token: str = Depends(oauth2_bearer), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        user_id: int = payload.get("id")
        username: str = fetch_username_from_database(db, email) 
        if email is None or user_id is None or username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Could not validate user.")
        return {"email": email, "id": user_id, "username": username}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate user.")
        
def fetch_username_from_database(db: Session, email: str) -> str:
    user = db.query(Users).filter(Users.email == email).first()
    if user:
        return user.username
    else:
        return None
        

#kontrollera befintlig username och email
@router.post("/check-existing-users")
async def check_username_email(data: UsernameEmailCheck, db: Session = Depends(get_db)):
    username = data.username
    email = data.email
    
    user_with_username = db.query(User).filter(User.username == username).first()
    user_with_email = db.query(User).filter(User.email == email).first()
    
    return {
        "username_exists": bool(user_with_username),
        "email_exists": bool(user_with_email)
    }
    
@router.get("/me")
def read_users_me(current_user: Annotated[User, Depends(get_current_user)]) -> UsernameEmailCheck:
    return current_user
    