from fastapi import FastAPI, status, Depends, HTTPException
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import auth
from auth import get_current_user
from fastapi.middleware.cors import CORSMiddleware
import logging


app = FastAPI()
app.include_router(auth.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "FastAPI is running"}

@app.post("/")
async def root_post():
    return {"message": "POST request received at root"}

@app.get("/user", status_code=status.HTTP_200_OK)
async def user(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")
    return {"User": user}

logging.basicConfig(level=logging.INFO)
try:
    with engine.connect() as connection:
        logging.info("Database connection successful")
except Exception as e:
    logging.error("Failed to connect to database: %s", e)
