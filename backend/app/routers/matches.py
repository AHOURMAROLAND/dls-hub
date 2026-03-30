from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.match import Match, MatchStatus
from app.models.player import Player
from app.models.tournament import Tournament
from app.schemas.match import MatchValidate, MatchOut
from app.services.tracker_service import fetch_player_data, find_recent_matches_vs_opponent
from app.websocket.manager import manager
from datetime import datetime

router = APIRouter()

@router.get("/tournament/{slug}")
async def get_matches(slug: str, db: AsyncSession = Depends(get_db)):
    t_result = await db.execute(select(Tournament).where(Tournament.slug == slug))
    t = t_result.scalar_one_or_none()
    if not t:
        raise HTTPException(404, "Tournoi introuvable")
    matches = await db.execute(select(Match).where(Match.tournament_id == t.id))
    return matches.scalars().all()

@router.get("/{match_id}/tracker-suggest")
async def get_tracker_suggestions(
    match_id: str,
    creator_session: str,
    db: AsyncSession = Depends(get_db)
):
    m_result = await db.execute(select(Match).where(Match.id == match_id))
    match = m_result.scalar_one_or_none()
    if not match:
        raise HTTPException(404, "Match introuvable")
    t_result = await db.execute(select(Tournament).where(Tournament.id == match.tournament_id))
    t = t_result.scalar_one_or_none()
    if t.creator_session != creator_session:
        raise HTTPException(403, "Acces refuse")
    home = await db.execute(select(Player).where(Player.id == match.home_player_id))
    home_player = home.scalar_one_or_none()
    away = await db.execute(select(Player).where(Player.id == match.away_player_id))
    away_player = away.scalar_one_or_none()
    data = await fetch_player_data(home_player.dll_idx)
    suggestions = find_recent_matches_vs_opponent(data, away_player.dll_idx)
    return {
        "home_player": {"pseudo": home_player.pseudo, "team": home_player.team_name},
        "away_player": {"pseudo": away_player.pseudo, "team": away_player.team_name},
        "suggestions": suggestions
    }

@router.post("/validate")
async def validate_match(body: MatchValidate, db: AsyncSession = Depends(get_db)):
    m_result = await db.execute(select(Match).where(Match.id == body.match_id))
    match = m_result.scalar_one_or_none()
    if not match:
        raise HTTPException(404, "Match introuvable")
    t_result = await db.execute(select(Tournament).where(Tournament.id == match.tournament_id))
    t = t_result.scalar_one_or_none()
    if t.creator_session != body.creator_session:
        raise HTTPException(403, "Acces refuse")
    match.home_score = body.home_score
    match.away_score = body.away_score
    match.home_scorers = body.home_scorers
    match.away_scorers = body.away_scorers
    match.motm = body.motm
    match.is_manual = body.is_manual
    match.status = MatchStatus.MANUAL if body.is_manual else MatchStatus.VALIDATED
    match.dll_match_timestamp = body.dll_match_timestamp
    match.validated_at = datetime.utcnow()
    await db.commit()
    await manager.broadcast(str(t.id), {
        "event": "match_validated",
        "match_id": str(match.id),
        "home_score": body.home_score,
        "away_score": body.away_score,
        "is_manual": body.is_manual,
        "home_scorers": body.home_scorers,
        "away_scorers": body.away_scorers,
        "motm": body.motm
    })
    return {"message": "Match valide", "is_manual": body.is_manual}

@router.get("/standings/{slug}")
async def get_standings(slug: str, db: AsyncSession = Depends(get_db)):
    t_result = await db.execute(select(Tournament).where(Tournament.slug == slug))
    t = t_result.scalar_one_or_none()
    if not t:
        raise HTTPException(404, "Tournoi introuvable")
    players_result = await db.execute(select(Player).where(Player.tournament_id == t.id))
    players = players_result.scalars().all()
    matches_result = await db.execute(
        select(Match).where(Match.tournament_id == t.id, Match.status.in_(["validated", "manual"]))
    )
    matches = matches_result.scalars().all()
    standings = {}
    for p in players:
        standings[str(p.id)] = {
            "player_id": str(p.id), "pseudo": p.pseudo, "team_name": p.team_name,
            "team_logo_url": p.team_logo_url, "played": 0, "won": 0,
            "draw": 0, "lost": 0, "gf": 0, "ga": 0, "diff": 0, "pts": 0,
            "form": []
        }
    for m in matches:
        h, a = str(m.home_player_id), str(m.away_player_id)
        hs, as_ = m.home_score or 0, m.away_score or 0
        if h in standings and a in standings:
            standings[h]["played"] += 1
            standings[a]["played"] += 1
            standings[h]["gf"] += hs
            standings[h]["ga"] += as_
            standings[a]["gf"] += as_
            standings[a]["ga"] += hs
            standings[h]["diff"] = standings[h]["gf"] - standings[h]["ga"]
            standings[a]["diff"] = standings[a]["gf"] - standings[a]["ga"]
            if hs > as_:
                standings[h]["won"] += 1; standings[h]["pts"] += 3
                standings[a]["lost"] += 1
                standings[h]["form"].append("W"); standings[a]["form"].append("L")
            elif hs < as_:
                standings[a]["won"] += 1; standings[a]["pts"] += 3
                standings[h]["lost"] += 1
                standings[a]["form"].append("W"); standings[h]["form"].append("L")
            else:
                standings[h]["draw"] += 1; standings[h]["pts"] += 1
                standings[a]["draw"] += 1; standings[a]["pts"] += 1
                standings[h]["form"].append("D"); standings[a]["form"].append("D")
    result = sorted(standings.values(), key=lambda x: (-x["pts"], -x["diff"], -x["gf"]))
    return result

@router.get("/scorers/{slug}")
async def get_scorers(slug: str, db: AsyncSession = Depends(get_db)):
    t_result = await db.execute(select(Tournament).where(Tournament.slug == slug))
    t = t_result.scalar_one_or_none()
    if not t:
        raise HTTPException(404, "Tournoi introuvable")
    matches_result = await db.execute(
        select(Match).where(Match.tournament_id == t.id, Match.status.in_(["validated", "manual"]))
    )
    matches = matches_result.scalars().all()
    scorers = {}
    for m in matches:
        for goal in (m.home_scorers or []):
            name = goal.get("scorer", "")
            if name:
                if name not in scorers:
                    scorers[name] = {"name": name, "goals": 0, "assists": 0}
                scorers[name]["goals"] += 1
        for goal in (m.away_scorers or []):
            name = goal.get("scorer", "")
            if name:
                if name not in scorers:
                    scorers[name] = {"name": name, "goals": 0, "assists": 0}
                scorers[name]["goals"] += 1
    return sorted(scorers.values(), key=lambda x: -x["goals"])[:20]
