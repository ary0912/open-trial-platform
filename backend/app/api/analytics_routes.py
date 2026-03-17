from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import defaultdict
from datetime import datetime

from app.core.database import SessionLocal
from app.models.participant import Participant
from app.models.visit import Visit
from app.models.observation import Observation

# ✅ Import service
from app.services.analytics_service import get_gender_distribution

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/analytics/study/{study_id}")
def get_analytics(study_id: int, db: Session = Depends(get_db)):

    # -------------------------
    # Participants
    # -------------------------

    participants = db.query(Participant).filter(
        Participant.study_id == study_id
    ).all()

    if not participants:
        return {
            "total_participants": 0,
            "numeric_metrics": {},
            "categorical_metrics": {},
            "enrollment_trend": []
        }

    participant_ids = [p.id for p in participants]

    # -------------------------
    # Visits
    # -------------------------

    visits = db.query(Visit).filter(
        Visit.participant_id.in_(participant_ids)
    ).all()

    visit_ids = [v.id for v in visits]

    # -------------------------
    # Observations
    # -------------------------

    observations = db.query(Observation).filter(
        Observation.visit_id.in_(visit_ids)
    ).all()

    # -------------------------
    # Total Participants
    # -------------------------

    total_participants = len(participants)

    # -------------------------
    # Enrollment Trend (unique per month)
    # -------------------------

    enrollment = defaultdict(int)
    seen = set()

    for v in visits:
        if v.visit_date:
            month_key = v.visit_date.strftime("%Y-%m")
            unique_key = (month_key, v.participant_id)

            if unique_key not in seen:
                seen.add(unique_key)
                enrollment[month_key] += 1

    sorted_months = sorted(enrollment.keys())

    enrollment_trend = [
        {
            "month": datetime.strptime(m, "%Y-%m").strftime("%b"),
            "participants": enrollment[m]
        }
        for m in sorted_months
    ]

    # -------------------------
    # Metrics
    # -------------------------

    numeric_metrics = defaultdict(list)
    categorical_metrics = defaultdict(lambda: defaultdict(int))

    for obs in observations:

        metric_name = obs.metric_name.lower().replace(" ", "_")

        if obs.value is not None:
            numeric_metrics[metric_name].append(obs.value)

        if obs.value_text is not None:
            categorical_metrics[metric_name][obs.value_text] += 1

    # -------------------------
    # Numeric Summary
    # -------------------------

    numeric_summary = {}

    for metric, values in numeric_metrics.items():
        if not values:
            continue

        numeric_summary[metric] = {
            "avg": round(sum(values) / len(values), 2),
            "min": min(values),
            "max": max(values),
            "count": len(values)
        }

    # -------------------------
    # Categorical Summary
    # -------------------------

    categorical_summary = {
        metric: dict(counts)
        for metric, counts in categorical_metrics.items()
    }

    # =========================
    # 🔥 ADD GENDER HERE
    # =========================

    gender_counts = get_gender_distribution(db, study_id)

    # Inject into categorical metrics
    categorical_summary["gender"] = gender_counts

    # -------------------------
    # Final Response
    # -------------------------

    return {
        "total_participants": total_participants,
        "numeric_metrics": numeric_summary,
        "categorical_metrics": categorical_summary,
        "enrollment_trend": enrollment_trend
    }