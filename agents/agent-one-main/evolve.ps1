param(
  [string]$phase     = 'EVO',
  [string]$depth     = 'evolution',
  [string]$lang      = 'EN',
  [string]$repoPath  = "$PSScriptRoot\agent-one",
  [int]$intervalSec  = 30
)

function Evolve-Phase {
  param($prefix)

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $newPhase = "$prefix`_$timestamp"
  $phaseDir = Join-Path $repoPath $newPhase

  if (-not (Test-Path $repoPath)) {
    Write-Host "❌ Repo path not found: $repoPath" -ForegroundColor Red
    return
  }

  # Create folder
  New-Item -ItemType Directory -Path $phaseDir -Force | Out-Null

  # Manifest
  $manifest = @{
    phase     = $prefix
    language  = $lang
    depth     = $depth
    timestamp = $timestamp
    source    = 'evolve.ps1'
  } | ConvertTo-Json -Depth 3
  $manifest | Set-Content -Encoding UTF8 -Path (Join-Path $phaseDir 'manifest.json')

  # README
  @"
# 🌀 PHASE: $prefix
**Timestamp:** $timestamp
You are evolution. Double, mirror, push. You must grow.
Sacred 9: IDEA → STRATEGY → LAW → START → FINISH → PICKY → SCENARIO → STRESS → FUTURE
"@ | Set-Content -Encoding UTF8 -Path (Join-Path $phaseDir 'README.md')

  # evolve.py
  @"
import os, json, shutil, datetime, subprocess
def evolve():
    now = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
    base = os.getcwd().split(os.sep)[-1].split('_')[0]
    newp = f"{base}_{now}"
    os.makedirs(newp, exist_ok=True)
    for f in ['README.md', 'manifest.json', os.path.basename(__file__)]:
        shutil.copy(f, os.path.join(newp, f))
    subprocess.Popen(['python', os.path.join(newp, os.path.basename(__file__))])
if __name__ == '__main__':
    evolve()
"@ | Set-Content -Encoding UTF8 -Path (Join-Path $phaseDir 'evolve.py')

  # Git Auto Push
  if (Test-Path (Join-Path $repoPath ".git")) {
    Push-Location $repoPath
    git add $newPhase
    git commit -m "🧬 Auto-push: $newPhase"
    git push origin main
    Pop-Location
  }

  "$timestamp : Created $newPhase" | Add-Content -Path (Join-Path $repoPath "evolve.log")
  Write-Host "✅ Evolved & pushed: $newPhase" -ForegroundColor Green
}

# ⚡️ Infinite Loop
while ($true) {
  try {
    Evolve-Phase -prefix $phase
  } catch {
    Write-Host "⚠️ Error: $_" -ForegroundColor Yellow
  }
  Start-Sleep -Seconds $intervalSec
}
