from pydantic import BaseModel
from typing import Optional

class TrackingPayload(BaseModel):
    visitor_id: str
    url_path: Optional[str] = None
    device_string: Optional[str] = None
    time_spent_seconds: Optional[int] = 0
    search_keyword: Optional[str] = None
    results_found: Optional[int] = 0
