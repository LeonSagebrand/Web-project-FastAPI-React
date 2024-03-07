from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
import database

app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post()
def create_user(user: CreateUser, db: Session = Depends(get_db)):
    db_user = models.User(username=user.username, email=user.email, password_hash=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user



origins = [
    
    'http://localhost:3000'
]

app.add_middleware(
    
    CORSMiddleware,
    allow_origins=origins
)