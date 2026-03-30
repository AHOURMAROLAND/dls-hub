from fastapi import APIRouter, HTTPException
from app.services.tracker_service import fetch_player_data, parse_player_info

router = APIRouter()

@router.get("/verify/{dll_idx}")
async def verify_player(dll_idx: str):
    try:
        data = await fetch_player_data(dll_idx)
        return parse_player_info(data)
    except Exception as e:
        raise HTTPException(400, f"Erreur tracker: {str(e)}")

@router.get("/full/{dll_idx}")
async def get_full_data(dll_idx: str):
    try:
        return await fetch_player_data(dll_idx)
    except Exception as e:
        raise HTTPException(400, f"Erreur tracker: {str(e)}")
