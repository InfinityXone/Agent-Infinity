Write-Host "`n[🌌] Initializing GENESIS System by InfinityXOne..."

# === CREATE FOLDERS ===
$folders = @(
  "backend", "backend\core",
  "cli", "diagnostics",
  "frontend", "frontend\pages", "frontend\public",
  "scripts"
)

foreach ($folder in $folders) {
  if (-not (Test-Path $folder)) {
    New-Item -ItemType Directory -Path $folder | Out-Null
    Write-Host "[📁] Created: $folder"
  }
}

# === CREATE FILES ===

# backend/main.py
$backendMain = @'
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Agent 0 Backend Online"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    return jsonify({"reply": f"Echo: {data.get('message')}"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
'@
Set-Content -Path "backend\main.py" -Value $backendMain

# backend/requirements.txt
Set-Content -Path "backend\requirements.txt" -Value "flask`nflask-cors"

# frontend/pages/index.jsx
$frontendIndex = @'
export default function Home() {
  return <div className="text-xl p-4">👋 Welcome to Genesis — Powered by Agent 0</div>;
}
'@
Set-Content -Path "frontend\pages\index.jsx" -Value $frontendIndex

# frontend/package.json
$packageJson = @'
{
  "name": "genesis-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.0.0"
  }
}
'@
Set-Content -Path "frontend\package.json" -Value $packageJson

# frontend/vite.config.js
$viteConfig = @'
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true }
})
'@
Set-Content -Path "frontend\vite.config.js" -Value $viteConfig

# frontend/vercel.json
$vercelJson = @'
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
'@
Set-Content -Path "frontend\vercel.json" -Value $vercelJson

# manifest.json
$manifestJson = @'
{
  "name": "Genesis by InfinityXOne",
  "short_name": "Genesis",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#111111"
}
'@
Set-Content -Path "manifest.json" -Value $manifestJson

# === DONE ===
Write-Host "`n✅ GENESIS Setup Complete. Next Steps:"

Write-Host "`n[💻] Backend:"
Write-Host "  cd backend"
Write-Host "  python -m pip install -r requirements.txt"
Write-Host "  python main.py"

Write-Host "`n[🌐] Frontend (New Terminal):"
Write-Host "  cd frontend"
Write-Host "  npm install"
Write-Host "  npm run dev"

Write-Host "`n🎯 You’re ready to go."


