from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.participant import Participant
from app.models.visit import Visit
from app.models.observation import Observation

router = APIRouter()


@router.get("/participants/study/{study_id}/detailed")
def get_detailed_participants(study_id: int, db: Session = Depends(get_db)):

    participants = db.query(Participant).filter(
        Participant.study_id == study_id
    ).all()

    result = []

    for p in participants:

        visits = db.query(Visit).filter(
            Visit.participant_id == p.id
        ).all()

        for v in visits:

            observations = db.query(Observation).filter(
                Observation.visit_id == v.id
            ).all()

            row = {
                "id": p.id,
                "external_id": p.external_id,
                "visit_date": v.visit_date,
                "gender": p.gender
            }

            # ✅ ADD ALL METRICS DYNAMICALLY
            for obs in observations:

                metric = obs.metric_name.lower().replace(" ", "_")

                if obs.value is not None:
                    row[metric] = obs.value
                elif obs.value_text is not None:
                    row[metric] = obs.value_text

            result.append(row)

    return result