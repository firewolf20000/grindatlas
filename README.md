<<<<<<< HEAD
﻿# GrindAtlas

Game guides + interactive tools for idle, incremental, and roguelike games. English-language site monetized via Google AdSense.

## Tech stack

- **Astro 5** (SSG + islands) - best-in-class SEO
- **TypeScript** strict mode
- **MDX** for content with embedded components
- **Tailwind CSS** for styling
- **React 19** islands for interactive tools
- **Cloudflare Pages** - free, fast, global edge

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # ./dist
npm run preview      # preview the build
```

## Deploy to Cloudflare Pages

You have three options, in order of recommended:

### Option A: GitHub Actions (recommended, fully automated)

1. Push this repo to GitHub
2. In Cloudflare Dashboard: **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**
3. Select the `grindatlas` repo. Cloudflare will detect Astro automatically.
4. Add two secrets to your GitHub repo (Settings -> Secrets and variables -> Actions):
   - `CLOUDFLARE_API_TOKEN` - https://dash.cloudflare.com/profile/api-tokens (use "Edit Cloudflare Pages" template)
   - `CLOUDFLARE_ACCOUNT_ID` - found in the Cloudflare dashboard right sidebar
5. Push to `main` - the workflow at `.github/workflows/deploy.yml` will build and deploy automatically.

### Option B: One-command local deploy

```bash
# Windows PowerShell
.\scripts\deploy.ps1

# macOS / Linux
./scripts/deploy.sh
```

Requires `wrangler` and the `CLOUDFLARE_API_TOKEN` env var.

### Option C: Manual drag-and-drop

1. `npm install && npm run build`
2. Cloudflare Dashboard -> Pages -> your project -> **Create new deployment**
3. Drag the `dist/` folder onto the upload zone

## Project layout

```
src/
  content/           # MDX articles + game/tool metadata (typed collections)
  components/        # Astro + React (.tsx for islands)
  layouts/           # BaseLayout, ArticleLayout
  pages/             # File-based routing
  utils/             # SEO, schema.org helpers
  styles/            # global.css
public/              # robots.txt, ads.txt, favicon
scripts/             # deploy.ps1, deploy.sh
.github/workflows/   # deploy.yml, update-deps.yml
```

## AdSense

1. Apply at https://www.google.com/adsense/ with the live domain
2. Replace `pub-XXXXXXXXXXXXXXXX` in `public/ads.txt`
3. Replace `ca-pub-XXXXXXXXXXXXXXXX` in `src/components/AdSlot.astro`
4. Turn on **Auto ads** in AdSense dashboard OR rely on manual `AdSlot` placements

## SEO checklist

- [x] sitemap-index.xml (auto)
- [x] robots.txt
- [x] Schema.org: Article, BreadcrumbList, ItemList, FAQPage, SoftwareApplication
- [x] OG + Twitter cards
- [x] Canonical URLs
- [x] Privacy / Contact / About / Disclaimer (AdSense required)
- [x] Cookie consent (GDPR / CCPA)

## Content roadmap

- Best Idle Games 2026
- Best Roguelikes 2026
- Universal Paperclips walkthrough
- Balatro joker tier list
- Cookie Clicker strategy
- (more added weekly)
=======
# grindatlas
grindatlas
>>>>>>> 14940ec79f70844af8c48c847f25b177da5bb333
