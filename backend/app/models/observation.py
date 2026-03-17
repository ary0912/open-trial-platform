from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


class Observation(Base):

    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)

    visit_id = Column(Integer, ForeignKey("visits.id"))

    metric_name = Column(String)

    value = Column(Float, nullable=True)

    value_text = Column(String, nullable=True)

    visit = relationship("Visit", back_populates="observations")