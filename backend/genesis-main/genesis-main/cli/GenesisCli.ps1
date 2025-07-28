Write-Host "🚀 Launching Genesis CLI: Agent 0 Console"
Write-Host "1. GitHub Sync"
Write-Host "2. Vercel Deploy"
Write-Host "3. Supabase Connect"
Write-Host "4. Google Drive Sync"
Write-Host "5. Start Backend Server"
Write-Host "6. Start Frontend Dev"
Write-Host "0. Exit"

$choice = Read-Host "Select operation"

switch ($choice) {
    "1" { powershell -File ".\\cli\\github_push.ps1" }
    "2" { powershell -File ".\\cli\\vercel_deploy.ps1" }
    "3" { powershell -File ".\\cli\\supabase_connect.ps1" }
    "4" { powershell -File ".\\cli\\gdrive_sync.ps1" }
    "5" { cd backend; python main.py }
    "6" { cd frontend; npm run dev }
    "0" { exit }
    default { Write-Host "Invalid option." }
}
