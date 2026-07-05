# Webmaster Tools Setup (5 minutes)

Complete the verification for Google Search Console, Bing Webmaster, and Baidu Webmaster Tools.

## Step 1: Get verification codes

For each platform, log in, add `https://www.15115656.xyz` as a property, and choose the **HTML meta tag** verification method. Each platform will give you a code like `abc123def456`. Copy each code.

| Platform | URL | Notes |
|---|---|---|
| **Google Search Console** | https://search.google.com/search-console/ | Use a Google account. Add "URL prefix" type. |
| **Bing Webmaster** | https://www.bing.com/webmasters/ | Microsoft account. Also covers Copilot/Edge indexing. |
| **Baidu Webmaster** | https://ziyuan.baidu.com/ | Baidu account. **Required for Chinese search traffic.** |
| **Yandex Webmaster** | https://webmaster.yandex.com/ | Yandex account. For Russian search traffic (optional). |

## Step 2: Paste the codes

Open `E:\grindatlas\src\config\verification.ts` and fill in the codes:

```ts
export const VERIFICATION = {
  google: 'paste_your_google_code_here',   // from Google Search Console
  bing:   'paste_your_bing_code_here',     // from Bing Webmaster
  baidu:  'paste_your_baidu_code_here',    // from Baidu Webmaster
  yandex: 'paste_your_yandex_code_here',   // from Yandex Webmaster (optional)
} as const;
```

## Step 3: Push to deploy

```powershell
cd E:\grindatlas
git add -A
git commit -m "Add webmaster verification codes"
git push origin main
```

Wait 1-2 minutes for the deploy to complete.

## Step 4: Click Verify in each dashboard

Go back to each platform dashboard and click the **Verify** button. The meta tag should now be detected.

## Step 5: Submit sitemap

In each dashboard, submit the sitemap URL:

```
https://www.15115656.xyz/sitemap-index.xml
```

**Google Search Console:**
1. Left menu -> **Sitemaps**
2. Paste `https://www.15115656.xyz/sitemap-index.xml` in the "Add a new sitemap" box
3. Click **Submit**

**Bing Webmaster:**
1. Left menu -> **Sitemaps**
2. Click **Submit a Sitemap**
3. Paste `https://www.15115656.xyz/sitemap-index.xml`
4. Click **Submit**

**Baidu Webmaster:**
1. Left menu -> **链接提交** -> **sitemap**
2. Paste `https://www.15115656.xyz/sitemap-index.xml`
3. Click **提交**

## Step 6: Request indexing (optional but recommended)

For each platform, manually request indexing of your 3 most important pages:

1. https://www.15115656.xyz/
2. https://www.15115656.xyz/idle-games/best-idle-games-2026/
3. https://www.15115656.xyz/roguelikes/balatro-joker-tier-list/

**Google**: Use the URL Inspection tool at the top of GSC, paste each URL, click **Request Indexing**.

**Bing**: Same process, URL Inspection -> Request Indexing.

## Alternative: HTML file verification (instead of meta tag)

If you prefer, each platform also supports verifying by uploading an HTML file. The files are already created in the project as placeholders:

- `public/google[your_code].html` (you rename to your actual code)
- `public/BingSiteAuth.xml` (Bing's specific format)
- `public/baidu_verify_xxx.html` (Baidu)

The actual files will need to be created with the exact filename the platform specifies. If you go this route, ask me to add the file and I'll create it for you.

## Time expectations

After verification and sitemap submission:
- **Google**: 3-7 days for first indexing, 2-4 weeks for full indexing
- **Bing**: 1-3 days for first indexing
- **Baidu**: 1-2 weeks (slower than Google, but reaches Chinese users)