from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.participant import Participant
from app.models.visit import Visit
from app.models.observation import Observation

router = APIRouter()


@router.get("/participants/study/{study_id}/detailed")
def get_detailed_participants(study_id: int, db: Session = Depends(get_db)):

    # Fetch participants, visits, and observations in a single query with joinedload to solve the N+1 query problem
    participants = db.query(Participant).filter(
        Participant.study_id == study_id
    ).options(
        joinedload(Participant.visits).joinedload(Visit.observations)
    ).all()

    result = []

    for p in participants:
        for v in p.visits:
            row = {
                "id": p.id,
                "external_id": p.external_id,
                "visit_date": v.visit_date,
                "gender": p.gender
            }

            # ✅ ADD ALL METRICS DYNAMICALLY
            for obs in v.observations:
                metric = obs.metric_name.lower().replace(" ", "_")
                if obs.value is not None:
                    row[metric] = obs.value
                elif obs.value_text is not None:
                    row[metric] = obs.value_text

            result.append(row)

    return result