from pydantic import BaseModel
from typing import Dict, List, Optional

class ClimateRecord(BaseModel):
    temperatureAt2Meters: Optional[float] = None
    precipitationCorrected: Optional[float] = None
    soilMoisture: Optional[float] = None
    humidity: Optional[float] = None
    irradiance: Optional[float] = None
    cloudAmount: Optional[float] = None
    windSpeed: Optional[float] = None
    windDirection: Optional[float] = None
    soilWetness: Optional[float] = None

class ToolResult(BaseModel):
    tool_name: str
    output: str | float | Dict