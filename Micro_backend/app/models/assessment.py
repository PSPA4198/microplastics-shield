"""
Stores every risk assessment a user submits. user_id is nullable
because on Day 2 we allow anonymous (not-logged-in) assessments too —
Day 4 auth will let logged-in users link assessments to their account
and see history.
"""
from sqlalchemy import Column, Integer, String, Float, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    # Location
    city    = Column(String, nullable=True)
    state   = Column(String, nullable=True)
    country = Column(String, nullable=True)

    # Raw answers exactly as submitted (kept for re-scoring / audit / research export later)
    raw_answers = Column(JSON, nullable=False)

    # Computed results
    overall_score   = Column(Float, nullable=False)
    risk_tier        = Column(String, nullable=False)   # "Low" | "Moderate" | "High"
    category_scores  = Column(JSON, nullable=False)      # {"diet": 62, "water": 40, ...}
    top_solutions     = Column(JSON, nullable=False)      # list of solution dicts
    ai_plan = Column(String, nullable=True)
    

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="assessments")
