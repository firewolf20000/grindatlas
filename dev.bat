@echo off
setlocal
chcp 65001 > nul
title GrindAtlas - Dev Server

cd /d "%~dp0"

if not exist "node_modules" (
  echo [dev] First run - installing dependencies...
  call npm install
  if errorlevel 1 (
    echo [dev] npm install failed. Check your internet connection.
    pause
    exit /b 1
  )
)

echo [dev] Starting Astro dev server on http://localhost:4321
echo [dev] Press Ctrl+C to stop.
echo.
start "" "http://localhost:4321"
call npm run dev
pause
