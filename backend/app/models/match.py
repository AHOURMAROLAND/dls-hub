import uuid
import enum
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.sql import func
from app.database import Base

class MatchStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    PENDING_VALIDATION = "pending_validation"
    VALIDATED = "validated"
    MANUAL = "manual"

class MatchPhase(str, enum.Enum):
    GROUP = "group"
    R16 = "r16"
    QF = "quarterfinal"
    SF = "semifinal"
    FINAL = "final"
    CHAMPIONSHIP = "championship"
    DOUBLE_FIRST = "double_first"
    DOUBLE_SECOND = "double_second"

class Match(Base):
    __tablename__ = "matches"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    tournament_id = Column(String(36), ForeignKey("tournaments.id"), nullable=False)
    home_player_id = Column(String(36), ForeignKey("players.id"), nullable=False)
    away_player_id = Column(String(36), ForeignKey("players.id"), nullable=False)
    home_score = Column(Integer, nullable=True)
    away_score = Column(Integer, nullable=True)
    home_score_agg = Column(Integer, nullable=True)
    away_score_agg = Column(Integer, nullable=True)
    is_manual = Column(Boolean, default=False)
    phase = Column(Enum(MatchPhase), nullable=False)
    round_number = Column(Integer, default=1)
    group_id = Column(String(5), nullable=True)
    status = Column(Enum(MatchStatus), default=MatchStatus.SCHEDULED)
    dll_match_timestamp = Column(String(20), nullable=True)
    stats_data = Column(JSON, nullable=True)
    home_scorers = Column(JSON, nullable=True)
    away_scorers = Column(JSON, nullable=True)
    motm = Column(String(80), nullable=True)
    played_at = Column(DateTime(timezone=True), nullable=True)
    validated_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
