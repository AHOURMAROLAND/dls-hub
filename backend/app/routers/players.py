from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.player import Player, PlayerStatus
from app.models.tournament import Tournament
from app.schemas.player import PlayerDecision, PlayerOut
from app.services.tracker_service import fetch_player_data, parse_player_info
from app.services.session_service import generate_session_token
from app.websocket.manager import manager
import cloudinary.uploader
from app.config import settings
import cloudinary
from uuid import UUID

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)

router = APIRouter()

@router.get("/verify/{dll_idx}")
async def verify_player(dll_idx: str):
    try:
        data = await fetch_player_data(dll_idx)
        return parse_player_info(data)
    except Exception:
        raise HTTPException(400, "Identifiant DLL invalide ou tracker indisponible")

@router.post("/register/{slug}")
async def register_player(
    slug: str,
    pseudo: str = Form(...),
    dll_idx: str = Form(...),
    logo: UploadFile = File(None),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Tournament).where(Tournament.slug == slug))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(404, "Tournoi introuvable")
    existing = await db.execute(
        select(Player).where(Player.tournament_id == t.id, Player.dll_idx == dll_idx)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(400, "Cet identifiant DLL est deja inscrit")
    tracker_data = await fetch_player_data(dll_idx)
    info = parse_player_info(tracker_data)
    logo_url = None
    if logo:
        res = cloudinary.uploader.upload(await logo.read(), folder="dls-hub/teams")
        logo_url = res.get("secure_url")
    session_token = generate_session_token()
    player = Player(
        tournament_id=t.id,
        session_token=session_token,
        pseudo=pseudo,
        dll_idx=dll_idx,
        team_name=info["team_name"],
        team_logo_url=logo_url,
        dll_division=info["division"],
        dll_played=info["played"],
        dll_won=info["won"],
        dll_lost=info["lost"],
        status=PlayerStatus.PENDING
    )
    db.add(player)
    await db.commit()
    await db.refresh(player)
    await manager.broadcast(str(t.id), {
        "event": "new_registration",
        "player": {"pseudo": pseudo, "team_name": info["team_name"], "division": info["division"]}
    })
    return {"session_token": session_token, "player_id": str(player.id), "status": "pending"}

@router.post("/decision")
async def player_decision(body: PlayerDecision, db: AsyncSession = Depends(get_db)):
    player_result = await db.execute(select(Player).where(Player.id == body.player_id))
    player = player_result.scalar_one_or_none()
    if not player:
        raise HTTPException(404, "Joueur introuvable")
    t_result = await db.execute(select(Tournament).where(Tournament.id == player.tournament_id))
    t = t_result.scalar_one_or_none()
    if t.creator_session != body.creator_session:
        raise HTTPException(403, "Acces refuse")
    if body.decision == "accept":
        player.status = PlayerStatus.ACCEPTED
    elif body.decision == "reject":
        player.status = PlayerStatus.REJECTED
    else:
        raise HTTPException(400, "Decision invalide (accept ou reject)")
    await db.commit()
    await manager.broadcast(str(t.id), {
        "event": "player_decision",
        "player_id": str(player.id),
        "decision": body.decision
    })
    return {"message": f"Joueur {body.decision}e"}
