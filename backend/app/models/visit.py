from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Visit(Base):

    __tablename__ = "visits"

    id = Column(Integer, primary_key=True, index=True)

    participant_id = Column(Integer, ForeignKey("participants.id"))

    visit_date = Column(Date)

    # REQUIRED reverse relationship
    participant = relationship("Participant", back_populates="visits")

    # observations relationship
    observations = relationship("Observation", back_populates="visit")