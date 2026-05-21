from sqlalchemy.orm import Session
from app.models.participant import Participant


def create_participant(db: Session, participant):

    new_participant = Participant(**participant.dict())

    db.add(new_participant)
    db.commit()
    db.refresh(new_participant)

    return new_participant


def get_participants(db: Session):

    return db.query(Participant).all()