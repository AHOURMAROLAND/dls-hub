from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID

class MatchOut(BaseModel):
    id: UUID
    home_player_id: UUID
    away_player_id: UUID
    home_score: Optional[int]
    away_score: Optional[int]
    home_score_agg: Optional[int]
    away_score_agg: Optional[int]
    is_manual: bool
    phase: str
    round_number: int
    group_id: Optional[str]
    status: str
    motm: Optional[str]
    home_scorers: Optional[List]
    away_scorers: Optional[List]

    class Config:
        from_attributes = True

class MatchValidate(BaseModel):
    match_id: UUID
    creator_session: str
    dll_match_timestamp: Optional[str] = None
    home_score: int
    away_score: int
    home_scorers: Optional[List] = []
    away_scorers: Optional[List] = []
    motm: Optional[str] = ""
    is_manual: bool = False

class DrawRequest(BaseModel):
    tournament_id: UUID
    creator_session: str
