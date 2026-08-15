from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Databases are now per-account (see app/database.py), so a single
    # database_url is no longer required. Kept optional for backwards compat.
    database_url: str | None = None
    overtrading_threshold: int = 3
    revenge_window_minutes: int = 30

    class Config:
        env_file = ".env"


settings = Settings()