from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse, HTMLResponse
import os
import requests
import json
from models import TextToSpeechRequest
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter()

# Health check
@router.get("/health")
async def health_check():
    return HTMLResponse(content="<h1>Service is running fully fit 📈 </h1>", status_code=200)

# Welcome route
@router.get("/")
async def serve_index():
    message = {"message": "Welcome to the FastAPI AI-Powered Voice Agent application!"}
    return JSONResponse(content=message, status_code=200)

# Murf AI TTS Generation
@router.post("/server")
async def server(request: TextToSpeechRequest):
    MURF_API_KEY = os.getenv('MURF_AI_API_KEY')
    if not MURF_API_KEY:
        return JSONResponse(content={"error": "MURF_AI_API_KEY not found"}, status_code=500)

    endpoint = "https://api.murf.ai/v1/speech/generate"
    headers = {
        "api-key": MURF_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    data = {
        "text": request.text,
        "voice_id": "en-UK-ruby",
        "style": "Conversational",
        "multiNativeLocale": "en-US"
    }

    try:
        response = requests.post(endpoint, headers=headers, data=json.dumps(data))
        audio_url = response.json()['audioFile']
        return JSONResponse(content={"audioUrl": audio_url}, status_code=200)
    except requests.exceptions.RequestException as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    except json.JSONDecodeError:
        return JSONResponse(content={"error": "Failed to decode JSON response"}, status_code=500)

# Upload Audio File
@router.post("/upload-audio")
async def upload_audio(file: UploadFile = File(...)):
    try:
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)

        file_location = os.path.join(upload_dir, file.filename)
        with open(file_location, "wb") as f:
            f.write(await file.read())

        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "size": os.path.getsize(file_location)
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

#  Transcribe audio using AssemblyAI (Day 6)
@router.post("/transcribe/file")
async def transcribe_file(file: UploadFile = File(...)):
    try:
        import assemblyai as aai

        # Load API key from .env
        aai.settings.api_key = os.getenv("ASSEMBLYAI_API_KEY")
        if not aai.settings.api_key:
            return JSONResponse(content={"error": "ASSEMBLYAI_API_KEY not found"}, status_code=500)

        # Read the audio file
        audio_data = await file.read()

        # Transcribe audio
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(audio_data)

        return {"transcript": transcript.text}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
