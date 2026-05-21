@echo off
setlocal
cd /d "%~dp0"

echo === Killing node processes ===
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo csv /nh 2^>nul ^| findstr /v "INFO"') do (
    taskkill /f /pid %%~i 2>nul
)
timeout /t 1 /nobreak >nul

echo === Removing node_modules ===
if exist node_modules rmdir /s /q node_modules

echo === Removing .next ===
if exist .next rmdir /s /q .next

echo === Removing package-lock.json (npm), keeping pnpm-lock.yaml ===
if exist package-lock.json del /f /q package-lock.json

echo === Checking pnpm ===
where pnpm >nul 2>&1
if errorlevel 1 (
    echo pnpm non trovato, lo abilito via corepack...
    call corepack enable
    call corepack prepare pnpm@latest --activate
)

echo === pnpm install ===
call pnpm install
if errorlevel 1 (
    echo.
    echo ERRORE: pnpm install fallito. Leggi sopra.
    pause
    exit /b 1
)

echo.
echo ============================================
echo FATTO. Ora lancia:   pnpm dev
echo ============================================
pause
