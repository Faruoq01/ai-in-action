from fastapi import APIRouter
from schemas.agents import PromptRequest, PromptResponse
from services.agent import AgentService
from config.mongodb import MongoDBClient

router = APIRouter()

# Global instance of AgentService for simplicity
agent_service = AgentService()

@router.post("/prompt", response_model=PromptResponse)
async def run_prompt(request: PromptRequest):
    # Find similar records based on the query
    records = await agent_service.find_similar_records(request.query)
    print(records, "records")

    # # Retrieve the tool agent based on the tool_tag
    # tool_agent = agent_service.get_tool_agent(request.tool_tag)
    # if tool_agent is None:
    #     raise HTTPException(status_code=400, detail="Invalid tool tag")
    
    # # Invoke the tool with the appropriate input
    # result = tool_agent.invoke(records)
    
    # # Handle errors returned by the tool
    # if "error" in result:
    #     raise HTTPException(status_code=404, detail=result["error"])
    
    # return result
    return PromptResponse(result="This is a text response")


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


