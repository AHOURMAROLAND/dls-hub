from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tournaments, players, matches, tracker
from app.websocket.manager import manager

app = FastAPI(
    title="DLS Hub API",
    description="Plateforme de gestion de tournois Dream League Soccer",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tournaments.router, prefix="/api/tournaments", tags=["Tournois"])
app.include_router(players.router, prefix="/api/players", tags=["Joueurs"])
app.include_router(matches.router, prefix="/api/matches", tags=["Matchs"])
app.include_router(tracker.router, prefix="/api/tracker", tags=["Tracker DLL"])

@app.websocket("/ws/{tournament_id}")
async def websocket_endpoint(websocket: WebSocket, tournament_id: str):
    await manager.connect(websocket, tournament_id)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket, tournament_id)

@app.get("/")
async def root():
    return {"message": "DLS Hub API", "version": "1.0.0", "status": "ok"}
