# 🚀 BOOTSTRAP :: Load ENV, Set Path, Run Evolution

Set-Location -Path "\C:\Users\visio\OneDrive\Documents\GitHub\agent-one"

\C:\Users\visio\OneDrive\Documents\GitHub\agent-one\.env = ".env"
Get-Content \C:\Users\visio\OneDrive\Documents\GitHub\agent-one\.env | ForEach-Object {
    if (\ -match "^\s*([^#][^=]+)=(.+)$") {
        \OPENAI_API_KEY, \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 = \System.Collections.Hashtable[1].Trim(), \System.Collections.Hashtable[2].Trim()
        [System.Environment]::SetEnvironmentVariable(\OPENAI_API_KEY, \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, 'Process')
        \sk-proj-... = if (\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.Length -gt 12) { \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.Substring(0, 8) + "..." } else { \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 }
        Write-Host "🔐 Loaded \OPENAI_API_KEY = \sk-proj-..." -ForegroundColor Cyan
    }
}

if (\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) {
    Write-Host "✅ OPENAI_API_KEY ready!" -ForegroundColor Green
    python evolve.py
} else {
    Write-Host "❌ OPENAI_API_KEY not found. Evolution halted." -ForegroundColor Red
}
