#Requires -Version 5.0
<#
.SYNOPSIS
  Build and deploy GrindAtlas to Cloudflare Pages in one command.
.DESCRIPTION
  Requires: Node 20+, Wrangler (`npm i -g wrangler`), CLOUDFLARE_API_TOKEN env var.
  Get a token at: https://dash.cloudflare.com/profile/api-tokens
  Use the "Edit Cloudflare Pages" template.
#>

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "==> Installing deps" -ForegroundColor Cyan
npm ci

Write-Host "==> Building" -ForegroundColor Cyan
npm run build

if (-not (Get-Command wrangler -ErrorAction SilentlyContinue)) {
  Write-Host "==> Installing wrangler" -ForegroundColor Cyan
  npm i -g wrangler
}

Write-Host "==> Deploying to Cloudflare Pages" -ForegroundColor Cyan
wrangler pages deploy ./dist --project-name=grindatlas --commit-dirty=true

Write-Host "==> Done!" -ForegroundColor Green
