from pydantic import BaseModel
from datetime import date


class VisitCreate(BaseModel):

    participant_id: int
    visit_date: date


class VisitResponse(BaseModel):

    id: int
    participant_id: int
    visit_date: date

    class Config:
        from_attributes = True