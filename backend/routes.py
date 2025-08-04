from fastapi import APIRouter
from fastapi.responses import JSONResponse, HTMLResponse
import os
import requests
import json
from models import TextToSpeechRequest

router = APIRouter()

@router.get("/health")
async def health_check():
    return HTMLResponse(content="<h1>Service is running fully fit 📈 </h1>", status_code=200)

@router.get("/")
async def serve_index():
    message = {"message": "Welcome to the FastAPI AI-Powered Voice Agent application!"}
    return JSONResponse(content=message, status_code=200)

@router.post('/server')
async def server(request: TextToSpeechRequest):
    MURF_API_KEY = os.getenv('MURF_AI_API_KEY')
    if not MURF_API_KEY:
        return JSONResponse(content={"error": "MURF_AI_API_KEY not found"}, status_code=500)
    endpoint = "https://api.murf.ai/v1/speech/generate"
    headers = {
        "api-key" : MURF_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    textToSay = "Hello, I am WIMSY, your AI-powered voice agent. How can I assist you today?"

    if request.text:
        textToSay = request.text

    data = {
        "text" : request.text,
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













    # {"voice_id":"en-UK-ruby","style":"Promo","multiNativeLocale":"en-US"}
