from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.tournament import Tournament, TournamentStatus
from app.models.player import Player, PlayerStatus
from app.schemas.tournament import TournamentCreate, TournamentOut
from app.services.session_service import generate_session_token, generate_tournament_slug
from app.services.draw_service import balanced_draw, elimination_draw
from app.schemas.match import DrawRequest
from app.websocket.manager import manager
import cloudinary.uploader
from app.config import settings
import cloudinary
from uuid import UUID
import json

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)

router = APIRouter()

@router.post("/", response_model=TournamentOut)
async def create_tournament(
    name: str = Form(...),
    tournament_type: str = Form(...),
    elimination_type: str = Form("single"),
    championship_legs: str = Form("single"),
    max_teams: int = Form(...),
    group_count: int = Form(0),
    teams_per_group: int = Form(0),
    qualified_per_group: int = Form(2),
    elimination_round: str = Form(""),
    logo: UploadFile = File(None),
    db: AsyncSession = Depends(get_db)
):
    session_token = generate_session_token()
    slug = generate_tournament_slug()
    logo_url = None
    if logo:
        result = cloudinary.uploader.upload(await logo.read(), folder="dls-hub/tournaments")
        logo_url = result.get("secure_url")
    tournament = Tournament(
        slug=slug,
        name=name,
        logo_url=logo_url,
        tournament_type=tournament_type,
        elimination_type=elimination_type,
        championship_legs=championship_legs,
        max_teams=max_teams,
        group_count=group_count,
        teams_per_group=teams_per_group,
        qualified_per_group=qualified_per_group,
        elimination_round=elimination_round,
        creator_session=session_token,
        status=TournamentStatus.REGISTRATION
    )
    db.add(tournament)
    await db.commit()
    await db.refresh(tournament)
    return tournament

@router.get("/{slug}")
async def get_tournament(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tournament).where(Tournament.slug == slug))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(404, "Tournoi introuvable")
    return t

@router.get("/{slug}/players")
async def get_players(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tournament).where(Tournament.slug == slug))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(404, "Tournoi introuvable")
    players = await db.execute(select(Player).where(Player.tournament_id == t.id))
    return players.scalars().all()

@router.post("/{slug}/draw")
async def generate_draw(slug: str, body: DrawRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tournament).where(Tournament.slug == slug))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(404, "Tournoi introuvable")
    if t.creator_session != body.creator_session:
        raise HTTPException(403, "Acces refuse")
    players_result = await db.execute(
        select(Player).where(
            Player.tournament_id == t.id,
            Player.status == PlayerStatus.ACCEPTED
        )
    )
    players = players_result.scalars().all()
    players_data = [
        {"id": str(p.id), "pseudo": p.pseudo, "team_name": p.team_name,
         "dll_division": p.dll_division, "dll_won": p.dll_won}
        for p in players
    ]
    if t.tournament_type == "groups":
        draw = balanced_draw(players_data, t.group_count)
    else:
        draw = elimination_draw(players_data)
    return {"draw": draw, "status": "preview"}

@router.post("/{slug}/draw/confirm")
async def confirm_draw(slug: str, body: DrawRequest, draw: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tournament).where(Tournament.slug == slug))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(404, "Tournoi introuvable")
    if t.creator_session != body.creator_session:
        raise HTTPException(403, "Acces refuse")
    t.status = TournamentStatus.IN_PROGRESS
    await db.commit()
    await manager.broadcast(str(t.id), {"event": "draw_confirmed", "draw": draw})
    return {"message": "Tirage confirme"}
