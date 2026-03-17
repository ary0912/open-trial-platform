from sqlalchemy.orm import Session
from app.models.participant import Participant


def get_gender_distribution(db: Session, study_id: int):

    participants = db.query(Participant).filter(
        Participant.study_id == study_id
    ).all()

    gender_counts = {}

    for p in participants:
        if p.gender:
            gender_counts[p.gender] = gender_counts.get(p.gender, 0) + 1

    return gender_counts