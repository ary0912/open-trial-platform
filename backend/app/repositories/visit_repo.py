from sqlalchemy.orm import Session
from app.models.visit import Visit


def create_visit(db: Session, visit):

    new_visit = Visit(**visit.dict())

    db.add(new_visit)
    db.commit()
    db.refresh(new_visit)

    return new_visit