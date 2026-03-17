from sqlalchemy.orm import Session
from app.models.observation import Observation


def create_observation(db: Session, observation):

    new_observation = Observation(**observation.dict())

    db.add(new_observation)
    db.commit()
    db.refresh(new_observation)

    return new_observation