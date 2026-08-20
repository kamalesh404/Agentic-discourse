import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Agentic-Discourse API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DebateRequest(BaseModel):
    topic: str

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Agentic-Discourse Backend is running"}

@app.post("/api/debate/start")
def start_debate(request: DebateRequest):
    """
    Endpoint to start a debate.
    In a full implementation, this would kick off a LangGraph process
    and return an ID to connect to a WebSocket or SSE stream.
    """
    return {"message": f"Debate started for topic: {request.topic}", "debate_id": "test_id_123"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    uvicorn.run("main:app", host=host, port=port, reload=True)
