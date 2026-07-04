@echo off
setlocal
chcp 65001 > nul
title GrindAtlas - GitHub Setup

cd /d "%~dp0"

echo ============================================
echo   GrindAtlas - First-time GitHub Setup
echo ============================================
echo.
echo This will guide you through:
echo   1. Creating an empty GitHub repo (opens browser)
echo   2. Connecting this folder to it
echo   3. Pushing the initial commit
echo.
echo Prerequisites:
echo   - Git installed (https://git-scm.com/)
echo   - A GitHub account
echo   - GitHub Desktop recommended: https://desktop.github.com/
echo.
pause

:: Open GitHub new repo page
start "" "https://github.com/new"

echo.
echo A browser tab opened. Create a new repository named "grindatlas":
echo   - Description: "Game guides and tools for idle and roguelike games"
echo   - Visibility:   Public (recommended) or Private
echo   - DO NOT initialize with README, .gitignore, or license
echo   - Click "Create repository"
echo.
pause

:: Configure git user (local to this repo)
echo.
set /p EMAIL="Your GitHub email: "
set /p NAME="Your GitHub username: "
git config user.email "%EMAIL%"
git config user.name "%NAME%"

:: Add remote
echo.
set /p REPO="GitHub repo (e.g. https://github.com/%NAME%/grindatlas.git): "
git remote remove origin 2>nul
git remote add origin "%REPO%"

:: Show current branch
git branch --show-current > temp_branch.txt
set /p BRANCH=<temp_branch.txt
del temp_branch.txt

:: Push
echo.
echo Pushing to %REPO% (branch: %BRANCH%)...
echo (You may be prompted for credentials. Use a Personal Access Token as the password.)
echo Get a PAT at: https://github.com/settings/tokens
echo.
git push -u origin %BRANCH%
if errorlevel 1 (
  echo.
  echo Push failed. Common fixes:
  echo   - Use a Personal Access Token, not your GitHub password
  echo   - Make sure the repo URL is correct
  pause
  exit /b 1
)

echo.
echo ============================================
echo   GITHUB SETUP COMPLETE
echo ============================================
echo.
echo Next: set up Cloudflare Pages to deploy from this repo.
echo See DEPLOY.md for the full step-by-step guide.
echo.
start "" "https://dash.cloudflare.com/?to=/:account/pages"
pause
