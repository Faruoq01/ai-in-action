import subprocess
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.gzip import GZipMiddleware
from controllers.user import router as climate_router
from controllers.prompt import router as prompt_router

app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(HTTPSRedirectMiddleware)
app.add_middleware(
    TrustedHostMiddleware, allowed_hosts=["api.smart-consultant.online", "localhost", "127.0.0.1"]
)

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

@app.post("/deploy")
async def webhook_handler(request: Request):
    payload = await request.json()
    print("Received webhook from main:", payload)

    subprocess.Popen(["./deploy.sh"])
    return {"status": "OK"}

