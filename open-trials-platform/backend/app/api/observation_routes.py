from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.observation import ObservationCreate
from app.repositories.observation_repo import create_observation
from app.core.database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/observations")
def add_observation(observation: ObservationCreate, db: Session = Depends(get_db)):

    return create_observation(db, observation)