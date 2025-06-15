import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from controllers.climate_controller import router as climate_router
from middleware.custom_middleware import add_logging_middleware

# Configuration
PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT")
PROJECT_LOCATION = os.environ.get("GOOGLE_CLOUD_LOCATION")
DATABASE_NAME = os.environ.get("DATABASE_NAME")
COLLECTION_NAME = os.environ.get("COLLECTION_NAME")
CONNECTION_STRING = os.environ.get("CONNECTION_STRING")

# Initialize FastAPI app
app = FastAPI(title="Climate Lens API", version="1.0.0")

# Apply CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Apply logging middleware
add_logging_middleware(app)

# Include routers
app.include_router(climate_router, prefix="/api", tags=["climate"])

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Climate Lens API!"}

# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)