from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    overtrading_threshold: int = 3
    revenge_window_minutes: int = 30

    class Config:
        env_file = ".env"


settings = Settings()