#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "==> Installing deps"
npm ci
echo "==> Building"
npm run build
echo "==> Deploying to Cloudflare Pages"
npx --yes wrangler pages deploy ./dist --project-name=grindatlas --commit-dirty=true
echo "==> Done!"
