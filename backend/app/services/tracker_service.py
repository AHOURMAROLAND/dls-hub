import httpx
from app.config import settings

HEADERS = {
    "accept": "application/json, text/plain, */*",
    "content-type": "application/json",
    "origin": "https://tracker.ftgames.com",
    "referer": "https://tracker.ftgames.com/",
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5) AppleWebKit/537.36 Chrome/146.0.0.0 Mobile Safari/537.36"
}

async def fetch_player_data(dll_idx: str) -> dict:
    payload = {
        "queryType": "AWSGetUserData",
        "queryData": {"TId": dll_idx},
        "analytics": {"idx": None}
    }
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.post(
            settings.TRACKER_API_URL,
            json=payload,
            headers=HEADERS
        )
        response.raise_for_status()
        return response.json()

def parse_player_info(data: dict) -> dict:
    return {
        "team_name": data.get("TNm", ""),
        "division": data.get("Div", 0),
        "played": data.get("Pla", 0),
        "won": data.get("Won", 0),
        "lost": data.get("Los", 0),
    }

def find_recent_matches_vs_opponent(data: dict, opponent_idx: str, limit: int = 3) -> list:
    matches = data.get("Matches", {}).get("results", [])
    filtered = [m for m in matches if m.get("OId") == opponent_idx]
    filtered.sort(key=lambda x: int(x.get("MTm", 0)), reverse=True)
    result = []
    for m in filtered[:limit]:
        ts = int(m.get("MTm", 0))
        from datetime import datetime
        heure = datetime.fromtimestamp(ts).strftime("%d/%m/%Y %H:%M") if ts else "?"
        home = m.get("Hom", True)
        result.append({
            "timestamp": ts,
            "heure": heure,
            "home_score": m.get("HSc") if home else m.get("ASc"),
            "away_score": m.get("ASc") if home else m.get("HSc"),
            "home_scorers": m.get("UGo", []) if home else m.get("OGo", []),
            "away_scorers": m.get("OGo", []) if home else m.get("UGo", []),
            "motm": m.get("MOTM", ""),
            "minutes": m.get("Min", 90),
            "opponent_name": m.get("TNL", ""),
        })
    return result
