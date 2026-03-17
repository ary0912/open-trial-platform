from pydantic import BaseModel

class ParticipantCreate(BaseModel):
    study_id: int
    age: int
    gender: str
    health_conditions: str


class ParticipantResponse(BaseModel):
    id: int
    study_id: int
    age: int
    gender: str
    health_conditions: str

    class Config:
        from_attributes = True