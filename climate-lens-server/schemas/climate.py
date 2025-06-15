from pydantic import BaseModel
from typing import List, Dict

class ClimateQuery(BaseModel):
    query: str
    functional_tags: List[str]

class ToolOutput(BaseModel):
    outputs: Dict[str, str | float | Dict]