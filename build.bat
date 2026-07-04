@echo off
setlocal
chcp 65001 > nul
title GrindAtlas - Build

cd /d "%~dp0"

if not exist "node_modules" (
  echo [build] Installing dependencies first...
  call npm install || (echo [build] npm install failed & pause & exit /b 1)
)

echo [build] Building static site to ./dist ...
call npm run build
if errorlevel 1 (
  echo [build] BUILD FAILED. Scroll up for errors.
  pause
  exit /b 1
)

echo.
echo [build] SUCCESS. Output: %CD%\dist
echo [build] Open dist\index.html to preview, or upload dist\ to Cloudflare Pages.
explorer "%CD%\dist"
pause
