from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Participant(Base):

    __tablename__ = "participants"

    id = Column(Integer, primary_key=True, index=True)

    study_id = Column(Integer, ForeignKey("studies.id"))

    external_id = Column(String, index=True)

    # ✅ ADD THIS LINE
    gender = Column(String, nullable=True)

    # relationship
    visits = relationship("Visit", back_populates="participant")