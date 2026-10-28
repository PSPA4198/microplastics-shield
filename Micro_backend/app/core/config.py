"""
Loads environment variables from .env into a typed Settings object.
Import `settings` anywhere you need the DB URL, secret key, etc.
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str = "dev-secret-change-me"
    FRONTEND_URL: str = "http://localhost:5173"
    GEMINI_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
