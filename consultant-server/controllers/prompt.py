from fastapi import APIRouter, HTTPException
from schemas.agents import PromptRequest, PromptResponse
from services.agent import AgentService
from config.mongodb import MongoDBClient

router = APIRouter()

# Global instance of AgentService for simplicity
agent_service = AgentService()


@router.post("/prompt", response_model=PromptResponse)
async def run_prompt(request: PromptRequest):
    # Step 1: Find similar medical records via vector search
    records = await agent_service.find_similar_records(request.query)
    if not records:
        raise HTTPException(status_code=404, detail="No relevant records found")

    # Step 2: Analyze those records using the multi-agent tool routing logic
    try:
        analysis_result = await agent_service.analyze_medical_records(records)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent analysis failed: {str(e)}")

    # Step 3: Return results as structured PromptResponse
    return PromptResponse(result=analysis_result)


@router.get("/embeddings/createIndex", response_model=PromptResponse)
async def create_index():
    db = MongoDBClient.get_database()
    try:
        # Create the vector index
        db["health_record"].create_index(
            [("embeddings", "knnVector")],
            name="climate_vector_index",
            knnVector={
                "dimensions": 768,
                "similarity": "cosine"
            }
        )
        return PromptResponse(result="Index created successfully")
    except Exception as e:
        return PromptResponse(result=f"Error creating index: {str(e)}")


