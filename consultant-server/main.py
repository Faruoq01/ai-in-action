import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from controllers.user import router as climate_router
from controllers.prompt import router as prompt_router
from services.agent import AgentService
agent = AgentService()

app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=1000)

# CORS - cross-origin security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://smart-consultant.online"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Router Registration ---
app.include_router(climate_router, prefix="/api/v1", tags=["Climate"])
app.include_router(prompt_router, prefix="/api/v1", tags=["Prompt"])

@app.get("/")
async def root():
    return "Hello welcome to smart health consultant, login and try it out"

@app.on_event("startup")
async def start_background_task():
    asyncio.create_task(agent.generate_all_embeddings())



