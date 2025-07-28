import asyncio
import json
import os
import threading
import time
import uuid
import webbrowser
from pathlib import Path
from typing import Dict, List

from fastapi import (
    BackgroundTasks,
    FastAPI,
    HTTPException,
    Request,
    WebSocket,
    WebSocketDisconnect,
)
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

# Import Genesis agent instead of Manus
from app.agent.genesis_agent import get_genesis_agent, GenesisWebSocketManager
from config.genesis_config import GENESIS_CONFIG, UI_CONFIG, GENESIS_BACKEND_URL

# Control browser auto-open
AUTO_OPEN_BROWSER = os.environ.get("AUTO_OPEN_BROWSER", "1") == "1"
last_opened = False

app = FastAPI(title="Infinity X One - GENESIS™ Web Interface")

# Get current directory
current_dir = Path(__file__).parent
# Mount static files
app.mount("/static", StaticFiles(directory=current_dir / "static"), name="static")
# Setup templates
templates = Jinja2Templates(directory=current_dir / "templates")

# Store active sessions and their results
active_sessions: Dict[str, dict] = {}
cancel_events: Dict[str, asyncio.Event] = {}

# WebSocket manager
websocket_manager = GenesisWebSocketManager()

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    user_id: str = None

class SessionResponse(BaseModel):
    session_id: str
    status: str
    message: str = ""

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    """Main page with Genesis branding"""
    return templates.TemplateResponse("index_genesis.html", {
        "request": request,
        "title": UI_CONFIG["title"],
        "subtitle": UI_CONFIG["subtitle"],
        "backend_url": GENESIS_BACKEND_URL,
        "features": UI_CONFIG["features"],
        "theme": UI_CONFIG["theme"]
    })

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    genesis = await get_genesis_agent()
    backend_health = await genesis.health_check()
    
    return {
        "status": "healthy",
        "frontend": "OpenManusWeb with Genesis Integration",
        "backend": backend_health,
        "genesis_backend_url": GENESIS_BACKEND_URL,
        "timestamp": time.time()
    }

@app.post("/api/chat")
async def create_chat_session(chat_request: ChatRequest, background_tasks: BackgroundTasks):
    """Create a new chat session with Genesis"""
    try:
        genesis = await get_genesis_agent()
        session_id = await genesis.create_chat_session(
            message=chat_request.message,
            user_id=chat_request.user_id
        )
        
        # Store session locally
        active_sessions[session_id] = {
            "id": session_id,
            "message": chat_request.message,
            "status": "processing",
            "created_at": time.time(),
            "user_id": chat_request.user_id,
            "thinking_steps": [],
            "files": [],
            "logs": []
        }
        
        # Start background monitoring
        background_tasks.add_task(monitor_session, session_id)
        
        return SessionResponse(
            session_id=session_id,
            status="processing",
            message="Genesis AI system activated"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/chat/{session_id}")
async def get_chat_session(session_id: str):
    """Get chat session status and results"""
    try:
        genesis = await get_genesis_agent()
        
        # Get session status from Genesis backend
        backend_status = await genesis.get_session_status(session_id)
        
        # Get local session info
        local_session = active_sessions.get(session_id, {})
        
        # Combine information
        session_info = {
            "session_id": session_id,
            "status": backend_status.get("session", {}).get("status", "unknown"),
            "message": local_session.get("message", ""),
            "ai_response": backend_status.get("session", {}).get("ai_response", ""),
            "created_at": local_session.get("created_at", time.time()),
            "thinking_steps": await genesis.get_thinking_process(session_id),
            "files": await genesis.get_session_files(session_id),
            "logs": await genesis.get_session_logs(session_id)
        }
        
        return {"success": True, "session": session_info}
        
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/api/chat/{session_id}/stop")
async def stop_chat_session(session_id: str):
    """Stop a chat session"""
    try:
        genesis = await get_genesis_agent()
        result = await genesis.stop_session(session_id)
        
        # Update local session
        if session_id in active_sessions:
            active_sessions[session_id]["status"] = "stopped"
        
        # Set cancel event
        if session_id in cancel_events:
            cancel_events[session_id].set()
        
        return result
        
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/api/thinking/{session_id}")
async def get_thinking_process(session_id: str):
    """Get thinking process for a session"""
    try:
        genesis = await get_genesis_agent()
        thinking_steps = await genesis.get_thinking_process(session_id)
        
        return {
            "success": True,
            "session_id": session_id,
            "thinking_steps": thinking_steps
        }
        
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/api/files")
async def get_workspace_files():
    """Get all workspace files"""
    try:
        genesis = await get_genesis_agent()
        files = await genesis.get_workspace_files()
        
        return {"success": True, "files": files}
        
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/api/files/{file_path:path}")
async def get_file_content(file_path: str):
    """Get content of a specific file"""
    try:
        genesis = await get_genesis_agent()
        content = await genesis.get_file_content(file_path)
        
        if content is not None:
            return {"success": True, "content": content, "path": file_path}
        else:
            return {"success": False, "error": "File not found"}
            
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/job/{job_id}/files")
async def get_job_files(job_id: str):
    """Get files for a specific job/session (OpenManus compatibility)"""
    try:
        genesis = await get_genesis_agent()
        files = await genesis.get_session_files(job_id)
        
        return {"files": files}
        
    except Exception as e:
        return {"files": []}

@app.get("/job/{job_id}/logs")
async def get_job_logs(job_id: str):
    """Get logs for a specific job/session (OpenManus compatibility)"""
    try:
        genesis = await get_genesis_agent()
        logs = await genesis.get_session_logs(job_id)
        
        return {"logs": logs}
        
    except Exception as e:
        return {"logs": []}

@app.get("/api/agents")
async def get_agents():
    """Get Genesis agents"""
    try:
        genesis = await get_genesis_agent()
        agents = await genesis.get_agents()
        
        return {"success": True, "agents": agents}
        
    except Exception as e:
        return {"success": False, "error": str(e), "agents": GENESIS_CONFIG["agents"]}

@app.get("/api/predictions")
async def get_predictions():
    """Get financial predictions from Genesis"""
    try:
        genesis = await get_genesis_agent()
        predictions = await genesis.get_predictions()
        
        return {"success": True, "predictions": predictions}
        
    except Exception as e:
        return {"success": False, "error": str(e), "predictions": []}

@app.post("/api/genesis/start")
async def start_genesis():
    """Start Genesis autonomous system"""
    try:
        genesis = await get_genesis_agent()
        result = await genesis.start_genesis_system()
        
        return result
        
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/api/genesis/status")
async def get_genesis_status():
    """Get Genesis system status"""
    try:
        genesis = await get_genesis_agent()
        status = await genesis.get_genesis_status()
        
        return status
        
    except Exception as e:
        return {"success": False, "genesis_active": False, "error": str(e)}

@app.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for real-time updates"""
    await websocket.accept()
    connection_id = await websocket_manager.connect(websocket, session_id)
    
    try:
        while True:
            # Keep connection alive and listen for messages
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message.get("type") == "ping":
                await websocket.send_text(json.dumps({"type": "pong"}))
            elif message.get("type") == "join_session":
                # Already joined when connected
                await websocket.send_text(json.dumps({
                    "type": "joined_session",
                    "session_id": session_id
                }))
                
    except WebSocketDisconnect:
        await websocket_manager.disconnect(connection_id)
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket_manager.disconnect(connection_id)

async def monitor_session(session_id: str):
    """Monitor session progress and broadcast updates"""
    try:
        genesis = await get_genesis_agent()
        
        # Monitor for up to 5 minutes
        for _ in range(60):  # 60 * 5 seconds = 5 minutes
            if session_id in cancel_events and cancel_events[session_id].is_set():
                break
                
            # Get thinking process updates
            thinking_steps = await genesis.get_thinking_process(session_id)
            
            # Broadcast thinking updates
            if thinking_steps:
                await websocket_manager.broadcast_to_session(session_id, {
                    "type": "thinking_update",
                    "session_id": session_id,
                    "thinking_steps": thinking_steps
                })
            
            # Check if session is complete
            session_status = await genesis.get_session_status(session_id)
            if session_status.get("session", {}).get("status") == "completed":
                await websocket_manager.broadcast_to_session(session_id, {
                    "type": "session_complete",
                    "session_id": session_id,
                    "response": session_status.get("session", {}).get("ai_response", "")
                })
                break
            
            await asyncio.sleep(5)  # Check every 5 seconds
            
    except Exception as e:
        print(f"Error monitoring session {session_id}: {e}")

@app.on_event("startup")
async def startup_event():
    """Startup event handler"""
    global last_opened
    
    print(f"🚀 Infinity X One - GENESIS™ Web Interface Starting...")
    print(f"🔗 Connected to Genesis Backend: {GENESIS_BACKEND_URL}")
    
    # Test backend connection
    try:
        genesis = await get_genesis_agent()
        health = await genesis.health_check()
        if health.get("status") == "healthy":
            print("✅ Genesis backend connection successful")
        else:
            print("⚠️ Genesis backend connection issues")
    except Exception as e:
        print(f"❌ Genesis backend connection failed: {e}")
    
    # Auto-open browser
    if AUTO_OPEN_BROWSER and not last_opened:
        def open_browser():
            time.sleep(2)  # Wait for server to start
            webbrowser.open("http://localhost:8000")
        
        threading.Thread(target=open_browser, daemon=True).start()
        last_opened = True

@app.on_event("shutdown")
async def shutdown_event():
    """Shutdown event handler"""
    print("🛑 Shutting down Genesis Web Interface...")
    
    # Close Genesis agent session
    global genesis_agent
    if genesis_agent:
        await genesis_agent.__aexit__(None, None, None)

