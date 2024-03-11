from fastapi import FastAPI, HTTPException
from . import models, database
import logging
from .models import User
from .database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)





Base.metadata.create_all(bind=engine)
database.Base.metadata.create_all(bind=database.engine)
@app.get("/")
async def root():
    return {"running"}

@app.post("/")
async def root_post():
    return {"message": "POST request received at root"}


logging.basicConfig(level=logging.INFO)
try:
    with engine.connect() as connection:
        logging.info("Database connection successful")
except Exception as e:
    logging.error("Failed to connect to database: %s", e)





@app.post("/register/")
def register_user(user: models.UserCreate):
    logging.info("Received user data: %s", user.dict())

    db = database.SessionLocal()
    try:
        db_user = models.User(**user.dict())
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        logging.info("User registered successfully: %s", db_user)        
        return db_user
    except Exception as e:
        logging.error("Error registering user: %s", e)
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to register user: " + str(e))

@app.post("/login/")
def login_user(login_data: models.UserLogin):
    db = database.SessionLocal()
    user = db.query(models.User).filter(models.User.email == login_data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if login_data.password != user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return {"message": "Login successful", "user_id": user.id}



