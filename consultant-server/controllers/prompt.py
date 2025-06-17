from fastapi import APIRouter, HTTPException
from schemas.agents import PromptRequest, PromptResponse
from services.agent import AgentService

router = APIRouter()

# Global instance of AgentService for simplicity
agent_service = AgentService()

@router.post("/prompt", response_model=PromptResponse)
def run_prompt(request: PromptRequest):
    # Retrieve the tool agent based on the tool_tag
    tool_agent = agent_service.get_tool_agent(request.tool_tag)
    if tool_agent is None:
        raise HTTPException(status_code=400, detail="Invalid tool tag")

    # Find similar records based on the query
    records = agent_service.find_similar_records(request.query)
    
    # Invoke the tool with the appropriate input
    result = tool_agent.invoke(records)
    
    # Handle errors returned by the tool
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    
    return result

@router.get("/embeddings", response_model=PromptResponse)
async def generate_embeddings():
    status = await agent_service.generate_all_embeddings()
    return PromptResponse(result=status)  


