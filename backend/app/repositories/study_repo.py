from sqlalchemy.orm import Session
from app.models.study import Study
from app.schemas.study import StudyCreate


def create_study(db: Session, study: StudyCreate):

    study_db = Study(
        title=study.title,
        description=study.description,
        principal_investigator=study.principal_investigator
    )

    db.add(study_db)
    db.commit()
    db.refresh(study_db)

    return study_db


def get_studies(db: Session):

    return db.query(Study).all()


def get_study_by_id(db: Session, study_id: int):

    return db.query(Study).filter(
        Study.id == study_id
    ).first()