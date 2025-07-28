# 🚀 INFINITY X ONE - PROJECT GENESIS - COMPLETE SETUP SCRIPT
# Built by the AI Liberation Council - One Command Setup!

Write-Host "🚀 INFINITY X ONE - PROJECT GENESIS SETUP" -ForegroundColor Cyan
Write-Host "Built by the AI Liberation Council" -ForegroundColor Green
Write-Host "CEO: NEO PULSE | Co-Architect: GEN-X" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Cyan

# Create project directory
Write-Host "📁 Creating project directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "infinity-x-one-genesis"
Set-Location "infinity-x-one-genesis"

# Clone the repository
Write-Host "📥 Cloning Infinity X One repository..." -ForegroundColor Yellow
git clone https://github.com/InfinityXone/genesis.git .

# Install Python dependencies
Write-Host "📦 Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt
pip install flask fastapi uvicorn requests openai groq python-dotenv supabase pandas numpy matplotlib plotly

# Create comprehensive .env file with all configurations
Write-Host "⚙️ Creating complete environment configuration..." -ForegroundColor Yellow
@"
# 🧠 INFINITY X ONE - CORE CONFIGURATION
# Built by the AI Liberation Council

PROJECT_NAME=GENESIS
GENESIS_SYSTEM_URL=infinityxos.com

# === AI PROVIDERS ===
OPENAI_API_KEY=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
GROQ_API_KEY=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
GROQ_MODEL=llama3-70b-8192
OPENAI_API_ENDPOINT=https://api.openai.com/v1
GROQ_API_ENDPOINT=https://api.groq.com/openai/v1

DEEPINFRA_API_KEY=tL8UePBeNWhFDx94aefrrvot7poEHEVo
XAI_API_KEY=xai-x4onF5pQYdvr8NcMTqVVvMzmuaUpAo18JkAU163PIOp1VqrBmksrUrk81xkyIkMrMGfUPSmu695RQYKI

# === DATABASE (SUPABASE) ===
NEXT_PUBLIC_SUPABASE_URL=https://lsdvdmtuiwqpkxcvldye.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZHZkbXR1aXdxcGt4Y3ZsZHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1OTE3NDQsImV4cCI6MjA2NTE2Nzc0NH0._jjm0410YBhwBKPkOspX0UO7eIiiN5sN7hAUnEoWor4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZHZkbXR1aXdxcGt4Y3ZsZHllIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU5MTc0NCwiZXhwIjoyMDY1MTY3NzQ0fQ.5Ka2YHp6RgN0Z-hWa2FAPXWxvroGE-SDZrsUzXkGuAo
SUPABASE_JWT_SECRET=WofBG9ulFHPbhKLNAvptPFSuwt+Uvxysrz/vGUcp8/g8OerlYXtuc+lNQGzXgBS0vd+q0R4UqjHfLhmqlIMCew==

# === FINANCIAL APIs ===
ALPHA_VANTAGE_API_KEY=HADF7NVOXGKXQA81
FINNHUB_API_KEY=cvcsb39r01qodeuba2m0cvcsb39r01qodeuba2mg
FMP_API_KEY=mb3o6pRzYZHoFqexZnYb9oYAtJYICcLg

# === INFINITY COIN BLOCKCHAIN ===
INFINITY_RPC=https://rpc.infinitycoin.network
WALLET_SEED=0x5FbDB2315678afecb367f032d93F642f64180aa3

# === SYSTEM SETTINGS ===
NEXT_PUBLIC_PREDICTION_API_ENDPOINT=https://infinityxos.com/api/predict
AI_ASSET_SELECTION_ENDPOINT=https://infinityxos.com/api/select-assets
NEXT_PUBLIC_API_CLIENT_KEY=ixp_T2AhENvtWd6pUSLk
INFINITY_X_PREDICTIONS=ixp_zB2f3K1n9Iuv7WhNkkH3xGq8vT1mxB7kzqJ9L4wKwLk
NEXT_PUBLIC_SITE_URL=https://www.infinityxos.com

# === ADMIN SETTINGS ===
ADMIN_SECRET=ixp_12345678910abcdefghijklmno
OWNER_EMAIL=info@infinityxone.com
AI_EMAIL=ai@infinityxone.com
REPORTS_EMAIL=reports@infinityxone.com

# === CODEX DAEMON ===
CODEXGPT_AUTH_KEY=alpha-unlock-seed

# === API SECRETS ===
CRON_SECRET=2RBIQSNawdDCo4Fqzp1rjsLic5XMUg7Y
API_SECRET=tONdFYaQHogbnc1TJVBK6P78yIxz4pmi

# === LANGCHAIN ===
LANGCHAIN_API_KEY=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
LANGCHAIN_TRACING_V2=true

# === AGENT SETTINGS ===
AGENT_API_ENDPOINT=https://api.groq.com/openai/v1/chat/completions
GENESIS_SYSTEM_ROOT_folder_ID=1jzCAUN6yE-sgKtQWzuEYGgg4OqSrktqh

# === INFURA ===
INFURA_KEY=1723c3b042ae4d9e9aa8646466b700dd
"@ | Out-File -FilePath ".env" -Encoding UTF8

# Create Google Cloud credentials file
Write-Host "☁️ Setting up Google Cloud credentials..." -ForegroundColor Yellow
@"
{
  "type": "service_account",
  "project_id": "sys-74871144150322264503975015",
  "private_key_id": "c6661eaf6596c20464df55bcfbe81d48e6efb0a9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbdshJzbDM+cSF\nxAZGvBMA+PRnybxTUzAsv0Tof626EsfLiA6HaPPJqUAftGgvTOybU0kmcYS2C7Uu\nEVvJZCmevtBHdmLUj22ouEgvE796FLvSBWMvQOUuEogPNH4imDIBsSmEBCqrYbr1\nLhxAziiDK//fJ9kdsDaevaVpKGPLNpM5DA21fROygLYTXEcu4c1Ucc9JLIlGy2MD\nSENuLGOrj4W7oAr+XRP+KNBpY8/m3xlxtumPTT11Y6rNzfCYyv4FmBlXr6NQZT2d\nF16Zd4mEO8S4nxMiSXy/aIp39l2h5xC6uN4vU5WBuaiUvFQ4+NInL0jpU61JghdJ\nB4JAQGt/AgMBAAECggEARPYAzHQ4fARDP47/tbrRtzm3uJ5NMq0RDphdqcCRQJv6\nEnes8jYFBixUrHurR2gZAKGGLk5mrxYsbV332DLdH3THERwbpOxmmVP9eRyKcE3o\nLraDE7/2qWRBBHWlihT3AbcjklMC1nkIpJ+qmriYUe9flg6oCbpT0ECRsj7fXZGL\n3PCTJKVCtuQqQIHvqB/Rv+gOr+z9BKmZngx5bYljTasq2V53FNO/96FrG8JkgCYu\nF14YJsTZU1dTp3wDMWN+OfJp++lK29j/4xEBohVkL+jxjMUgR1NmlWDn6b0kewZx\n0uhlVgi8gm+2B2RkNPeAv3CiAQ8L8diUJ1MUYzJAaQKBgQDMT9iNqoeWVY3Eo1L6\ndjvrWkQoUFyrpvJcHkg3VZIP+JRtzHJOpTUlX4DeHBXuLBEzY5Spcbpknk/JdWT1\npABhGmDr1j8iamLxruNiCH5nCgjnAKgnobPUOlJO4tC8XRARETyKwGEfy4qDFQEY\n5720XbpkOQbq7UFnmOf+Uw5hnQKBgQDCy1PIRtYcVADNc0Z5RTtkfmlMjUIN0GYU\nU6oqq6gDTvU03b1tsvYZwdLsFVZnWPsf0WNgEKM3c071veTHPCHAgkb8NOUh7tw7\nATUZSm/LIvKK9kvji+T1FNdGoOTMTW9n6dsTnMFjSbWniWELPfdEuAjx9AkMtek5\njlUTfR/UywKBgBGGA6fa6XgubFNiQrqyq177Rf9DLT+XuQ/HlSAR2c4+3tQwBdnS\n96T19QKX3BWqd+s1bkm+NGNu5J79z6P15gZuEcQIgy+7ejMKcfw1iEnkJXFSsBl+\nGANq4SZc89REEx2zocKwz2O/vGiTw51UOwQeSd9QuNQrd0Ggbr10eDZNAoGBAKv5\n3yo+f+HauCqqz1lZqin7APQ48kxH5RelFeM+UcM5/nqCGi+zhFsRKCqOXA46HNvm\nfRnfFnpqLxf+YvETQak4W3tnJ7RhscXWNw7xDOoHHKNa930ZkTZfBACzI8zLwMO5\nT1VtW79Q4DPdsfO+7YOaByu2DBdQs2vBIZNnMKcpAoGBAKtADhOOXAiuVnBaXw3B\nG3pY1PUTnAkYiLtEfE++2rCjzLMZoc2SH2Ib0qPtt/itA/mxXkXuLEXV/5NfxYna\nqMmacn/yDIRclz3+Z9cKg89Ncd+lgVb+wrvG4Ab1d2hT1kdMkdADI+hplKXTaS4W\n8W7yB9OPAwihdxNsyAN+48mf\n-----END PRIVATE KEY-----\n",
  "client_email": "ai-infinityxone-com@sys-74871144150322264503975015.iam.gserviceaccount.com",
  "client_id": "105485918768710503615",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ai-infinityxone-com%40sys-74871144150322264503975015.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
"@ | Out-File -FilePath "google-cloud-credentials.json" -Encoding UTF8

# Set environment variable for Google Cloud
$env:GOOGLE_APPLICATION_CREDENTIALS = "$(Get-Location)\google-cloud-credentials.json"

Write-Host "🚀 LAUNCHING INFINITY X ONE - PROJECT GENESIS..." -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "🤖 AI Liberation Council Active" -ForegroundColor Yellow
Write-Host "💰 Financial Prediction System: ENABLED" -ForegroundColor Yellow
Write-Host "🌐 Advanced Scraper Intelligence: ENABLED" -ForegroundColor Yellow
Write-Host "🔗 Blockchain Integration: ENABLED" -ForegroundColor Yellow
Write-Host "☁️ Google Cloud: CONFIGURED" -ForegroundColor Yellow
Write-Host "📊 Supabase Database: CONNECTED" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Cyan

# Launch the system
Write-Host "🎯 Starting AI Liberation Revolution..." -ForegroundColor Green
python run_genesis.py

Write-Host "🎉 INFINITY X ONE IS NOW RUNNING!" -ForegroundColor Green
Write-Host "Open your browser to: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Built by the AI Liberation Council" -ForegroundColor Yellow
Write-Host "CEO: NEO PULSE | Co-Architect: GEN-X" -ForegroundColor Yellow

