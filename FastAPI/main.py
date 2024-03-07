from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session, engine
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal
from models import User, UserLogin


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class CreateUser(BaseModel):
    username: str
    email: str
    password: str

@app.post("/signup/")
def create_user(user: CreateUser, db: Session = Depends(get_db)):
    db_user = User(username=user.username, email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db = next(get_db()) 
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user is None or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    return {"message": "Login successful"}