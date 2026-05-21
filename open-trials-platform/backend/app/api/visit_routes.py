from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.visit import VisitCreate
from app.repositories.visit_repo import create_visit
from app.core.database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/visits")
def add_visit(visit: VisitCreate, db: Session = Depends(get_db)):

    return create_visit(db, visit)