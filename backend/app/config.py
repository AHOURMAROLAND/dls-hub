from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379"
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    SECRET_KEY: str = "changeme"
    TRACKER_API_URL: str = "https://st.cf.api.ftpub.net/StatsTracker_Frontline"
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"

settings = Settings()
