from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes import router

# Load environment variables from .env
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AQUA - AI Voice Agent 🌊",
    description="Transcribe and generate AI voice with Murf and AssemblyAI",
    version="1.0.0",
)

# Allow frontend access (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:3000",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routes
app.include_router(router)

# Run app
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
