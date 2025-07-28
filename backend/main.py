"""
Infinity X One - Unified GENESIS Launcher
Supports: Web Server + CLI Agent Flow + Setup Checks
"""

import argparse
import asyncio
import os
import sys
from pathlib import Path

import uvicorn

# Add the app directory to Python path
current_dir = Path(__file__).parent
app_dir = current_dir / "app"
sys.path.insert(0, str(app_dir))

# === CLI Agent Mode ===
from app.agent.manus import Manus
from app.flow.base import FlowType
from app.flow.flow_factory import FlowFactory
from app.logger import logger

# === Web Server Mode ===
from web.app_genesis import app as web_app


def ensure_directories():
    Path("app/web/templates").mkdir(parents=True, exist_ok=True)
    Path("app/web/static").mkdir(parents=True, exist_ok=True)


async def cli_mode():
    agents = {"manus": Manus()}

    while True:
        prompt = input("🧠 Enter your prompt (or 'exit' to quit): ")
        if prompt.lower() == "exit":
            logger.info("Goodbye!")
            break

        flow = FlowFactory.create_flow(flow_type=FlowType.PLANNING, agents=agents)
        response = flow.run(prompt)
        print("🧠 Agent Response:", response)


def run_web():
    print("🚀 Starting GENESIS Web Interface...")
    ensure_directories()
    uvicorn.run(web_app, host="127.0.0.1", port=8000)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="GENESIS Unified Launcher")
    parser.add_argument("--cli", action="store_true", help="Run in interactive CLI mode")
    args = parser.parse_args()

    if args.cli:
        asyncio.run(cli_mode())
    else:
        run_web()
