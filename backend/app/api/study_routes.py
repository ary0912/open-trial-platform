from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.study import StudyCreate, StudyResponse
from app.repositories.study_repo import create_study, get_studies, get_study_by_id
from app.core.database import SessionLocal

router = APIRouter(
    prefix="/studies",
    tags=["Studies"]
)


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# Create a new study
# -----------------------------
@router.post("/", response_model=StudyResponse)
def add_study(
    study: StudyCreate,
    db: Session = Depends(get_db)
):
    return create_study(db, study)


# -----------------------------
# Get all studies
# -----------------------------
@router.get("/", response_model=List[StudyResponse])
def list_studies(
    db: Session = Depends(get_db)
):
    studies = get_studies(db)
    return studies


# -----------------------------
# Get single study
# -----------------------------
@router.get("/{study_id}", response_model=StudyResponse)
def get_single_study(
    study_id: int,
    db: Session = Depends(get_db)
):
    study = get_study_by_id(db, study_id)

    if not study:
        raise HTTPException(
            status_code=404,
            detail="Study not found"
        )

    return study