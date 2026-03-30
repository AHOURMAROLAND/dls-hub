import uuid
from sqlalchemy import Column, String, Integer, Boolean, DateTime, Enum, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base
import enum

class TournamentType(str, enum.Enum):
    ELIMINATION = "elimination"
    GROUPS = "groups"
    CHAMPIONSHIP = "championship"

class EliminationType(str, enum.Enum):
    SINGLE = "single"
    DOUBLE = "double"

class ChampionshipLegs(str, enum.Enum):
    SINGLE = "single"
    DOUBLE = "double"

class TournamentStatus(str, enum.Enum):
    DRAFT = "draft"
    REGISTRATION = "registration"
    DRAW = "draw"
    IN_PROGRESS = "in_progress"
    FINISHED = "finished"

class Tournament(Base):
    __tablename__ = "tournaments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String(12), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    logo_url = Column(String(255), nullable=True)
    tournament_type = Column(Enum(TournamentType), nullable=False)
    elimination_type = Column(Enum(EliminationType), default=EliminationType.SINGLE)
    championship_legs = Column(Enum(ChampionshipLegs), default=ChampionshipLegs.SINGLE)
    max_teams = Column(Integer, nullable=False)
    group_count = Column(Integer, default=0)
    teams_per_group = Column(Integer, default=0)
    qualified_per_group = Column(Integer, default=2)
    elimination_round = Column(String(10), default="")
    status = Column(Enum(TournamentStatus), default=TournamentStatus.DRAFT)
    creator_session = Column(String(64), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
