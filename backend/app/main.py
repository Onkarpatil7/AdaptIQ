
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import Base, engine
from app.db import models
from app.api.auth import router as auth_router
from app.api import datasets


# Initial local-development table creation.
# Use Alembic migrations as the project evolves.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AdaptIQ API",
    description="Adaptive Business Intelligence Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_ORIGIN,
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(datasets.router)


@app.get("/")
def root():
    return {
        "message": "AdaptIQ backend is running."
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
