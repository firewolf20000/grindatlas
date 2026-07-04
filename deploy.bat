@echo off
setlocal
chcp 65001 > nul
title GrindAtlas - Deploy to Cloudflare

cd /d "%~dp0"

echo ============================================
echo   GrindAtlas - One-Click Cloudflare Deploy
echo ============================================
echo.

:: 1. Check Node
where node > nul 2>&1
if errorlevel 1 (
  echo [deploy] Node.js not found. Install Node 20 LTS from:
  echo         https://nodejs.org/
  start "" "https://nodejs.org/"
  pause
  exit /b 1
)

:: 2. Check / install deps
if not exist "node_modules" (
  echo [deploy] Installing dependencies...
  call npm install || (echo [deploy] npm install failed & pause & exit /b 1)
)

:: 3. Check API token
if "%CLOUDFLARE_API_TOKEN%"=="" (
  echo [deploy] CLOUDFLARE_API_TOKEN environment variable not set.
  echo.
  echo   Get a token at: https://dash.cloudflare.com/profile/api-tokens
  echo   Use the "Edit Cloudflare Pages" template.
  echo.
  echo   Then set it for this session with:
  echo     set CLOUDFLARE_API_TOKEN=your-token-here
  echo.
  echo   Or save it permanently:
  echo     setx CLOUDFLARE_API_TOKEN "your-token-here"
  echo.
  set /p TOKEN="Paste your token here (or Enter to cancel): "
  if "%TOKEN%"=="" (
    echo [deploy] Cancelled.
    pause
    exit /b 1
  )
  set "CLOUDFLARE_API_TOKEN=%TOKEN%"
)

:: 4. Check account ID
if "%CLOUDFLARE_ACCOUNT_ID%"=="" (
  echo.
  echo [deploy] CLOUDFLARE_ACCOUNT_ID not set. Get it from:
  echo         https://dash.cloudflare.com/  (right sidebar on any zone)
  set /p AID="Paste your Account ID (or Enter to cancel): "
  if "%AID%"=="" (
    echo [deploy] Cancelled.
    pause
    exit /b 1
  )
  set "CLOUDFLARE_ACCOUNT_ID=%AID%"
)

:: 5. Install wrangler if needed
where wrangler > nul 2>&1
if errorlevel 1 (
  echo [deploy] Installing wrangler...
  call npm install --no-save wrangler
)

:: 6. Build
echo.
echo [deploy] Building site...
call npm run build || (echo [deploy] Build failed & pause & exit /b 1)

:: 7. Deploy
echo.
echo [deploy] Deploying to Cloudflare Pages (project: grindatlas)...
echo [deploy] This may take 1-2 minutes...
echo.
call npx wrangler pages deploy ./dist --project-name=grindatlas --commit-dirty=true
if errorlevel 1 (
  echo.
  echo [deploy] DEPLOY FAILED. Check your token and account ID.
  pause
  exit /b 1
)

echo.
echo ============================================
echo   DEPLOY COMPLETE
echo ============================================
echo.
echo Your site will be live at:
echo   https://grindatlas.pages.dev
echo.
echo (Custom domain grindatlas.com can be added in the Cloudflare dashboard.)
echo.
pause
