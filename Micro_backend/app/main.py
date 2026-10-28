"""
Main FastAPI application entrypoint.
Run with: uvicorn app.main:app --reload
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.routers import assessment

# Import every model module here so SQLAlchemy registers all tables on Base
# BEFORE create_all() runs. Without this, models that aren't imported
# anywhere else (like User, which only Day 4 auth code will use directly)
# never get registered, and any foreign key pointing to them fails.
from app.models import user, assessment as assessment_model  # noqa: F401

# Creates all tables (users, assessments) in PostgreSQL if they don't exist yet.
# For a real production app you'd use Alembic migrations instead of this,
# but for Day 2 development this is the fastest path to a working DB.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MicroShield API",
    description="AI-powered microplastic exposure risk assessment backend",
    version="1.0.0",
)

# Allow the React frontend (running on a different port) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assessment.router)


@app.get("/")
def root():
    return {"status": "MicroShield API is running", "docs": "/docs"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
