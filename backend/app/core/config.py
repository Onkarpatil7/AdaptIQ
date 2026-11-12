
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str

    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    FRONTEND_ORIGIN: str = "http://localhost:5173"
    COOKIE_SECURE: bool = False

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    @property
    def DATABASE_URL(self):
        from sqlalchemy.engine import URL

        return URL.create(
            drivername="postgresql+psycopg",
            username=self.DB_USER,
            password=self.DB_PASSWORD,
            host=self.DB_HOST,
            port=self.DB_PORT,
            database=self.DB_NAME
        )


settings = Settings()
