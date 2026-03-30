from fastapi import WebSocket
from typing import Dict, List

class ConnectionManager:
    def __init__(self):
        self.connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, tournament_id: str):
        await websocket.accept()
        if tournament_id not in self.connections:
            self.connections[tournament_id] = []
        self.connections[tournament_id].append(websocket)

    def disconnect(self, websocket: WebSocket, tournament_id: str):
        if tournament_id in self.connections:
            self.connections[tournament_id].remove(websocket)

    async def broadcast(self, tournament_id: str, message: dict):
        if tournament_id in self.connections:
            for ws in self.connections[tournament_id]:
                await ws.send_json(message)

manager = ConnectionManager()
