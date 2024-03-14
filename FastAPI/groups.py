from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Depends
from fastapi.responses import HTMLResponse
from database import User, SessionLocal
from sqlalchemy.orm import Session
from auth import get_current_user

app = FastAPI()


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.get("/")
async def get():
    return HTMLResponse(html)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# def get_user_id(client_id: int, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.id == client_id).first()
#     if user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user.id


# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     try:
#         payload = decode(token, verify=False)
#         return payload
#     except PyJWTError:
#         raise HTTPException(status_code=401, detail="Could not validate user")


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int, current_user: User = Depends(get_current_user)):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"User {current_user.username} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client {current_user.username} (ID: {current_user.id}) has left the chat")
