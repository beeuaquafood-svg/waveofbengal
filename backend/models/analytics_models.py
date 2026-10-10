from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database import Base
import datetime

class PageView(Base):
    __tablename__ = "page_views"

    id = Column(Integer, primary_key=True, index=True)
    visitor_id = Column(String, index=True)
    url_path = Column(String, index=True)
    time_spent_seconds = Column(Integer, default=0)
    city = Column(String, default="Unknown")
    device_type = Column(String, default="Desktop")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class SearchEvent(Base):
    __tablename__ = "search_events"

    id = Column(Integer, primary_key=True, index=True)
    visitor_id = Column(String, index=True)
    query = Column(String, index=True)
    results_found = Column(Integer, default=0)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class VisitorLog(Base):
    __tablename__ = "visitor_logs"

    visitor_id = Column(String, primary_key=True, index=True)
    is_repeat = Column(Boolean, default=False)
    first_seen = Column(DateTime, default=datetime.datetime.utcnow)
    last_seen = Column(DateTime, default=datetime.datetime.utcnow)
