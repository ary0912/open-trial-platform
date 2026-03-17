from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from app.api.study_routes import router as study_router
from app.api.participant_routes import router as participant_router
from app.api.visit_routes import router as visit_router
from app.api.observation_routes import router as observation_router
from app.api.upload_routes import router as upload_router
from app.api.analytics_routes import router as analytics_router

# Database
from app.core.database import Base, engine

# Models (IMPORTANT for table creation)
from app.models.study import Study
from app.models.participant import Participant
from app.models.visit import Visit
from app.models.observation import Observation

# --------------------------------------------------
# App Initialization
# --------------------------------------------------

app = FastAPI(
    title="OpenTrials Research API",
    version="1.0.0"
)

# --------------------------------------------------
# CORS Configuration
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Database Setup
# --------------------------------------------------

# Create tables automatically
Base.metadata.create_all(bind=engine)

# --------------------------------------------------
# Routers (OPTIONAL PREFIX IMPROVEMENT)
# --------------------------------------------------

app.include_router(study_router, tags=["Studies"])
app.include_router(participant_router, tags=["Participants"])
app.include_router(visit_router, tags=["Visits"])
app.include_router(observation_router, tags=["Observations"])
app.include_router(upload_router, tags=["Upload"])
app.include_router(analytics_router, tags=["Analytics"])

# --------------------------------------------------
# Health Check (VERY IMPORTANT)
# --------------------------------------------------

@app.get("/")
def root():
    return {"message": "OpenTrials API is running 🚀"}