import shutil
import os
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.data_ingestion import process_csv

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload/{study_id}")
def upload_dataset(
    study_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = process_csv(file_path, study_id, db)

    return result