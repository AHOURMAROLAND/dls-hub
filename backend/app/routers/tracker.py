from fastapi import APIRouter
from app.services.tracker_service import fetch_player_data, parse_player_info
router = APIRouter()

@router.get("/verify/{dll_idx}")
async def verify_player(dll_idx: str):
    data = await fetch_player_data(dll_idx)
    return parse_player_info(data)
