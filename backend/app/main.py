from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tournaments, players, matches, tracker

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

@app.get("/")
async def root():
    return {"message": "DLS Hub API", "version": "1.0.0", "status": "ok"}
