from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from enum import Enum

class TournamentType(str, Enum):
    ELIMINATION = "elimination"
    GROUPS = "groups"
    CHAMPIONSHIP = "championship"

class EliminationType(str, Enum):
    SINGLE = "single"
    DOUBLE = "double"

class ChampionshipLegs(str, Enum):
    SINGLE = "single"
    DOUBLE = "double"

class TournamentCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    tournament_type: TournamentType
    elimination_type: EliminationType = EliminationType.SINGLE
    championship_legs: ChampionshipLegs = ChampionshipLegs.SINGLE
    max_teams: int = Field(..., ge=4, le=64)
    group_count: int = Field(0, ge=0, le=16)
    teams_per_group: int = Field(0, ge=0)
    qualified_per_group: int = Field(2, ge=1)
    elimination_round: str = ""

class TournamentOut(BaseModel):
    id: UUID
    slug: str
    name: str
    logo_url: Optional[str]
    tournament_type: TournamentType
    elimination_type: EliminationType
    championship_legs: ChampionshipLegs
    max_teams: int
    group_count: int
    status: str
    creator_session: str

    class Config:
        from_attributes = True
