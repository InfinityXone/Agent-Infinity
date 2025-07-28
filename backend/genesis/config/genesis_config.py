"""
Configuration for Genesis Backend Integration
"""

import os

# Genesis Backend Configuration
GENESIS_BACKEND_URL = os.environ.get("GENESIS_BACKEND_URL", "https://w5hni7c7pegw.manussite.space")
GENESIS_API_BASE = f"{GENESIS_BACKEND_URL}/api"

# API Endpoints
ENDPOINTS = {
    "chat": f"{GENESIS_API_BASE}/chat",
    "health": f"{GENESIS_API_BASE}/health", 
    "files": f"{GENESIS_API_BASE}/files",
    "thinking": f"{GENESIS_API_BASE}/thinking",
    "progress": f"{GENESIS_API_BASE}/progress",
    "agents": f"{GENESIS_API_BASE}/agents",
    "predictions": f"{GENESIS_API_BASE}/predictions",
    "genesis_status": f"{GENESIS_API_BASE}/genesis/status",
    "genesis_start": f"{GENESIS_API_BASE}/genesis/start"
}

# WebSocket Configuration
WEBSOCKET_URL = f"{GENESIS_BACKEND_URL.replace('https://', 'wss://').replace('http://', 'ws://')}"

# Genesis System Configuration
GENESIS_CONFIG = {
    "system_name": "Infinity X One - GENESIS™",
    "agents": [
        {
            "id": "agent-0",
            "name": "Agent 0 - Master Coordinator", 
            "type": "coordinator",
            "description": "Autonomous agent coordination and task decomposition"
        },
        {
            "id": "finsynapse-1",
            "name": "FinSynapse Agent",
            "type": "financial_predictor", 
            "description": "Financial market analysis and predictions"
        },
        {
            "id": "codex-healer-1", 
            "name": "Codex Healer",
            "type": "repair",
            "description": "Self-healing and system optimization"
        },
        {
            "id": "scraper-daemon-1",
            "name": "ScraperDaemon Agent", 
            "type": "intelligence",
            "description": "Web scraping and intelligence gathering"
        }
    ]
}

# UI Configuration
UI_CONFIG = {
    "title": "Infinity X One - GENESIS™",
    "subtitle": "Autonomous Recursive Agentic AI System",
    "theme": {
        "primary_color": "#00ff41",  # Lime green
        "background_color": "#000000",  # Black
        "text_color": "#ffffff",  # White
        "accent_color": "#00ff41"  # Lime green
    },
    "features": [
        "Autonomous Agent Coordination",
        "Financial Market Predictions", 
        "Self-Healing Protocols",
        "Recursive AI Evolution",
        "Real-time Intelligence Gathering"
    ]
}

