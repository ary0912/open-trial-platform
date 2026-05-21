from pydantic import BaseModel

class ObservationCreate(BaseModel):
    visit_id: int
    metric_name: str
    value: float
    unit: str