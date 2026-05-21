# Fix per Turbopack "Next.js package not found" — node_modules pnpm corrotto.
# 1. Killa qualsiasi processo Node che tiene aperti i file di scaffold/
# 2. Cancella node_modules, .next, package-lock.json (resta solo pnpm-lock.yaml)
# 3. Reinstalla con pnpm
#
# Lanciare da PowerShell nella cartella scaffold:
#   .\fix-deps.ps1

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

Write-Host ">> Killing node processes that hold scaffold files (if any)..." -ForegroundColor Cyan
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object {
    try {
        $cmdline = (Get-CimInstance Win32_Process -Filter "ProcessId = $($_.Id)").CommandLine
        if ($cmdline -and $cmdline -like "*scaffold*") {
            Write-Host "   stopping PID $($_.Id): $cmdline"
            Stop-Process -Id $_.Id -Force
        }
    } catch { }
}
Start-Sleep -Seconds 1

Write-Host ">> Removing node_modules..." -ForegroundColor Cyan
if (Test-Path node_modules) {
    cmd /c "rmdir /s /q node_modules"
}

Write-Host ">> Removing .next..." -ForegroundColor Cyan
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
}

Write-Host ">> Removing package-lock.json (npm) — uso pnpm-lock.yaml..." -ForegroundColor Cyan
if (Test-Path package-lock.json) {
    Remove-Item -Force package-lock.json
}

Write-Host ">> Verifica pnpm..." -ForegroundColor Cyan
$pnpm = Get-Command pnpm -ErrorAction SilentlyContinue
if (-not $pnpm) {
    Write-Host "   pnpm non trovato. Lo installo via corepack..." -ForegroundColor Yellow
    corepack enable
    corepack prepare pnpm@latest --activate
}

Write-Host ">> pnpm install..." -ForegroundColor Cyan
pnpm install

Write-Host ""
Write-Host "FATTO. Ora lancia:  pnpm dev" -ForegroundColor Green
