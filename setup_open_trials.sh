#!/bin/bash

echo "Creating OpenTrials Platform project..."

PROJECT="open-trials-platform"

mkdir -p $PROJECT
cd $PROJECT

mkdir -p backend/app/{api,core,models,schemas,repositories,services}
mkdir -p frontend
mkdir -p docs
mkdir -p scripts
mkdir -p datasets

touch README.md

cd backend

python3 -m venv venv

cat <<EOF > requirements.txt
fastapi
uvicorn
sqlalchemy
psycopg2-binary
pydantic
pandas
polars
python-jose
passlib[bcrypt]
pytest
alembic
EOF

mkdir -p app

cat <<EOF > app/main.py
from fastapi import FastAPI
from app.api.study_routes import router as study_router
from app.core.database import Base, engine

app = FastAPI(title="OpenTrials Research API")

Base.metadata.create_all(bind=engine)

app.include_router(study_router)

@app.get("/")
def root():
    return {"message": "OpenTrials API Running"}
EOF

mkdir -p app/core

cat <<EOF > app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres:password@localhost/open_trials"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()
EOF

mkdir -p app/models

cat <<EOF > app/models/study.py
from sqlalchemy import Column, Integer, String, Date
from app.core.database import Base

class Study(Base):
    __tablename__ = "studies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    principal_investigator = Column(String)
    start_date = Column(Date)
    end_date = Column(Date)
EOF

cat <<EOF > app/models/participant.py
from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class Participant(Base):
    __tablename__ = "participants"

    id = Column(Integer, primary_key=True)
    study_id = Column(Integer, ForeignKey("studies.id"))
    age = Column(Integer)
    gender = Column(String)
    health_conditions = Column(String)
EOF

cat <<EOF > app/models/visit.py
from sqlalchemy import Column, Integer, Date, ForeignKey
from app.core.database import Base

class Visit(Base):
    __tablename__ = "visits"

    id = Column(Integer, primary_key=True)
    participant_id = Column(Integer, ForeignKey("participants.id"))
    visit_date = Column(Date)
EOF

cat <<EOF > app/models/observation.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.core.database import Base

class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True)
    visit_id = Column(Integer, ForeignKey("visits.id"))
    metric_name = Column(String)
    value = Column(Float)
    unit = Column(String)
EOF

mkdir -p app/schemas

cat <<EOF > app/schemas/study.py
from pydantic import BaseModel

class StudyCreate(BaseModel):
    title: str
    description: str
    principal_investigator: str

class StudyResponse(BaseModel):
    id: int
    title: str
    description: str
    principal_investigator: str

    class Config:
        from_attributes = True
EOF

mkdir -p app/repositories

cat <<EOF > app/repositories/study_repo.py
from sqlalchemy.orm import Session
from app.models.study import Study

def create_study(db: Session, study):
    new_study = Study(**study.dict())
    db.add(new_study)
    db.commit()
    db.refresh(new_study)
    return new_study

def get_studies(db: Session):
    return db.query(Study).all()
EOF

mkdir -p app/api

cat <<EOF > app/api/study_routes.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.study import StudyCreate
from app.repositories.study_repo import create_study, get_studies
from app.core.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/studies")
def add_study(study: StudyCreate, db: Session = Depends(get_db)):
    return create_study(db, study)

@router.get("/studies")
def list_studies(db: Session = Depends(get_db)):
    return get_studies(db)
EOF

cat <<EOF > Dockerfile
FROM python:3.11
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

cd ..

cat <<EOF > README.md
# OpenTrials Research Platform

Clinical trial and research study management system.

## Features

- Study management
- Participant enrollment
- Clinical observations
- Research analytics
- API-driven architecture

## Stack

FastAPI
PostgreSQL
React (planned)
Docker

EOF

echo "Project setup complete."