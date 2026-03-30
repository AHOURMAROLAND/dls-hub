from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID

class PlayerRegister(BaseModel):
    pseudo: str = Field(..., min_length=2, max_length=50)
    dll_idx: str = Field(..., min_length=4, max_length=20)
    session_token: str

class PlayerVerify(BaseModel):
    dll_idx: str

class PlayerOut(BaseModel):
    id: UUID
    pseudo: str
    dll_idx: str
    team_name: str
    team_logo_url: Optional[str]
    dll_division: int
    dll_played: int
    dll_won: int
    dll_lost: int
    status: str
    group_id: Optional[str]
    is_creator: bool

    class Config:
        from_attributes = True

class PlayerDecision(BaseModel):
    player_id: UUID
    decision: str
    creator_session: str
