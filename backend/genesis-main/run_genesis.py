#!/usr/bin/env python3
"""
Infinity X One - GENESIS™ Web Interface
OpenManusWeb integration with Genesis backend
"""

import os
import sys
import uvicorn
from pathlib import Path

# Add the app directory to Python path
current_dir = Path(__file__).parent
app_dir = current_dir / "app"
sys.path.insert(0, str(app_dir))

# Import the Genesis-integrated app
from web.app_genesis import app

def main():
    """Run the Genesis Web Interface"""
    print("🚀 Starting Infinity X One - GENESIS™ Web Interface...")
    print("🔗 Integrated with OpenManusWeb frontend")
    print("🤖 Connected to Genesis autonomous AI backend")
    print()
    
    # Configuration
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    
    print(f"🌐 Server starting on http://{host}:{port}")
    print("📱 Mobile-optimized PWA interface")
    print("🎨 Glassmorphic design with Genesis branding")
    print()
    print("✨ Features:")
    print("   • Real-time AI thinking process")
    print("   • WebSocket communication")
    print("   • Agent coordination display")
    print("   • Financial predictions integration")
    print("   • File generation and viewing")
    print("   • System logs monitoring")
    print()
    
    try:
        # Run the FastAPI app with uvicorn
        uvicorn.run(
            app,
            host=host,
            port=port,
            log_level="info",
            access_log=True
        )
    except KeyboardInterrupt:
        print("\n🛑 Genesis Web Interface stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

