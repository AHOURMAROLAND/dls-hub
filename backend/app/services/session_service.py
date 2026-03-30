import secrets
import hashlib
from datetime import datetime, timedelta

SESSION_DURATION_DAYS = 30

def generate_session_token() -> str:
    return secrets.token_hex(32)

def generate_tournament_slug() -> str:
    return secrets.token_urlsafe(8)[:8]

def is_session_valid(created_at: datetime) -> bool:
    return datetime.utcnow() - created_at < timedelta(days=SESSION_DURATION_DAYS)
