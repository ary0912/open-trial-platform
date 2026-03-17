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
