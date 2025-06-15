from fastapi import APIRouter
from schemas.climate import ClimateQuery, ToolOutput
from services.climate_service import climate_service

router = APIRouter()

@router.post("/run-tools", response_model=ToolOutput)
async def run_tools(payload: ClimateQuery):
    result = climate_service.run_tools(payload)
    return {"outputs": result}