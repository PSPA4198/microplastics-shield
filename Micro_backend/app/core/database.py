"""
Sets up the SQLAlchemy engine, session factory, and declarative Base.
Every model file imports `Base` from here. Every router imports `get_db`
to receive a database session for that single request.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """
    FastAPI dependency. Opens a DB session for one request,
    always closes it afterward — even if the request errors out.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
