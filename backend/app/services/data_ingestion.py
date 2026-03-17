import pandas as pd
from sqlalchemy.orm import Session

from app.models.participant import Participant
from app.models.visit import Visit
from app.models.observation import Observation


def process_csv(file_path: str, study_id: int, db: Session):

    df = pd.read_csv(file_path)

    visits_cache = {}

    # Detect format
    long_format = "metric_name" in df.columns and "value" in df.columns

    for _, row in df.iterrows():

        # -----------------------
        # Extract participant + date
        # -----------------------

        participant_external_id = row.get("participant_id")

        if pd.isna(participant_external_id):
            continue

        visit_date = row.get("visit_date")

        if pd.isna(visit_date):
            continue

        visit_date = pd.to_datetime(visit_date).date()

        # -----------------------
        # Extract gender (NEW 🔥)
        # -----------------------

        gender = None

        if "gender" in df.columns:
            gender_val = row.get("gender")
            if not pd.isna(gender_val):
                gender = str(gender_val).strip()

        # -----------------------
        # Ensure participant exists
        # -----------------------

        participant = (
            db.query(Participant)
            .filter(
                Participant.external_id == str(participant_external_id),
                Participant.study_id == study_id
            )
            .first()
        )

        if not participant:

            participant = Participant(
                study_id=study_id,
                external_id=str(participant_external_id),
                gender=gender  # ✅ STORE GENDER
            )

            db.add(participant)
            db.flush()

        else:
            # ✅ Update gender if missing
            if not participant.gender and gender:
                participant.gender = gender
                db.flush()

        # -----------------------
        # Create visit (cached)
        # -----------------------

        visit_key = (participant.id, visit_date)

        if visit_key not in visits_cache:

            visit = Visit(
                participant_id=participant.id,
                visit_date=visit_date
            )

            db.add(visit)
            db.flush()

            visits_cache[visit_key] = visit

        visit = visits_cache[visit_key]

        # -----------------------
        # LONG FORMAT CSV
        # -----------------------

        if long_format:

            metric = row["metric_name"]
            value = row["value"]

            if pd.isna(value):
                continue

            try:
                numeric_value = float(value)
                text_value = None
            except:
                numeric_value = None
                text_value = str(value)

            observation = Observation(
                visit_id=visit.id,
                metric_name=str(metric),
                value=numeric_value,
                value_text=text_value
            )

            db.add(observation)

        # -----------------------
        # WIDE FORMAT CSV
        # -----------------------

        else:

            for column in df.columns:

                if column in ["participant_id", "visit_date", "gender"]:
                    continue

                value = row[column]

                if pd.isna(value):
                    continue

                try:
                    numeric_value = float(value)
                    text_value = None
                except:
                    numeric_value = None
                    text_value = str(value)

                observation = Observation(
                    visit_id=visit.id,
                    metric_name=str(column),
                    value=numeric_value,
                    value_text=text_value
                )

                db.add(observation)

    db.commit()

    return {"message": "Dataset imported successfully"}