from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from pydantic import BaseModel
import models

app = FastAPI()

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

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/signup/")
def create_user(user: CreateUser, db: Session = Depends(get_db)):
    db_user = models.User(username=user.username, email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user is None or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    return {"message": "Login successful"}