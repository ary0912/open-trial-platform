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
