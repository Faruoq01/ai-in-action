import asyncio
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
import httpx
from starlette.middleware.gzip import GZipMiddleware
from controllers.user import router as climate_router
from controllers.prompt import router as prompt_router
from services.agent import AgentService
agent = AgentService()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
FRONTEND_REDIRECT_URI = os.getenv("FRONTEND_REDIRECT_URI")

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

@app.get("/callback")
async def google_callback(request: Request):
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Missing code")

    # Step 1: Exchange code for token
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code"
    }

    async with httpx.AsyncClient() as client:
        token_res = await client.post(token_url, data=data)
        if token_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Token exchange failed")

        tokens = token_res.json()
        access_token = tokens.get("access_token")
        id_token = tokens.get("id_token")

        # Step 2: Get user info
        userinfo_res = await client.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        if userinfo_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch user info")

        user = userinfo_res.json()
        print("User info:", user)  # or store in DB/session

    # Step 3: Redirect to frontend (with token or session, if applicable)
    return RedirectResponse(url=FRONTEND_REDIRECT_URI)



