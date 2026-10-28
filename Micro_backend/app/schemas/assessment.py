"""
Pydantic schemas for the /assess endpoint.
AssessmentRequest = shape of what the frontend sends.
AssessmentResponse = shape of what we send back.
Field constraints (ge=0, le=3) mean FastAPI auto-rejects bad input
with a clear 422 error before our scoring code ever runs.
"""
from typing import Optional
from pydantic import BaseModel, Field


class AssessmentRequest(BaseModel):
    # Location (optional — scoring works without it, used for future regional weighting)
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None

    # Diet & Water (each answer is 0-3, matching the frontend Select options)
    bottled_water: int = Field(ge=0, le=3)
    seafood: int = Field(ge=0, le=3)
    packaged_food: int = Field(ge=0, le=3)
    water_source: int = Field(ge=0, le=3)

    # Air & Home
    air_quality: int = Field(ge=0, le=3)
    indoor_dust: int = Field(ge=0, le=3)

    # Clothing & Personal Care
    synthetic_clothing: int = Field(ge=0, le=3)
    cosmetics: int = Field(ge=0, le=3)

    # Optional - only present if the user is logged in (Day 4)
    user_id: Optional[int] = None

    class Config:
        json_schema_extra = {
            "example": {
                "city": "Jaipur",
                "state": "Rajasthan",
                "country": "India",
                "bottled_water": 2,
                "seafood": 1,
                "packaged_food": 2,
                "water_source": 1,
                "air_quality": 2,
                "indoor_dust": 1,
                "synthetic_clothing": 3,
                "cosmetics": 1,
            }
        }


class SolutionItem(BaseModel):
    key: str
    fix: str
    impact: str
    cost: str
    severity: int


class AssessmentResponse(BaseModel):
    id: int
    overall_score: float
    risk_tier: str
    category_scores: dict
    top_solutions: list[SolutionItem]
    ai_plan: str
    

    class Config:
        from_attributes = True  # lets us return a SQLAlchemy model directly
