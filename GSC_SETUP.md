# Google Search Console 设置指南

## 🎯 目的

让 Google 知道你这个网站存在 → 开始收录 → 给搜索流量

## 📋 步骤（5 分钟）

### 1. 注册 Search Console

打开：https://search.google.com/search-console/

用你的 Google 账号登录。

### 2. 添加资源

选 **"网址前缀"** (URL prefix) 类型，输入：

```
https://grindatlas1.pages.dev
```

（先验证 Cloudflare Pages 提供的域名，暂时不用 grindatlas.com 那个）

点 **"继续"**。

### 3. 验证所有权

Google 给你一个**验证码**，形如：

```
google-site-verification: abc123def456ghi789
```

**最简单的方式：HTML meta 标签**

把这段告诉我，我帮你加到 BaseLayout 的 `<head>` 里。

或者你也可以自己加：
1. 把这行加到 `src/components/SEOMeta.astro` 的 `<head>` 段：
   ```html
   <meta name="google-site-verification" content="abc123def456" />
   ```
2. `git push`，1 分钟后点 Search Console 的 **"验证"** 按钮

**其他验证方式**（如不能用 meta 标签）：
- HTML 文件上传（下载 `google[xxx].html` 放到 `public/` 然后 push）
- DNS TXT 记录（去域名注册商加）

### 4. 提交 Sitemap

验证通过后：

1. 左侧菜单 → **"Sitemaps"**
2. 输入框填：`https://grindatlas1.pages.dev/sitemap-index.xml`
3. 点 **"提交"**

Google 会开始抓取你网站的所有页面。**通常 3-7 天开始有展示，2-4 周开始有 Google 搜索流量**。

### 5. 请求索引（可选，加速收录）

左侧 → **"网址检查"** → 输入首页 URL `https://grindatlas1.pages.dev/` → 点 **"请求编入索引"**

对 3-5 个最重要的页面也这样做：
- `/idle-games/best-idle-games-2026/`
- `/idle-games/cookie-clicker-strategy-guide/`
- `/idle-games/cookie-clicker-ascension-strategy/`
- `/roguelikes/balatro-joker-tier-list/`
- `/tools/idle-progression-calculator/`

## 📊 监控

部署后 1 周内可以在 Search Console 看：

| 报告 | 关注点 |
|---|---|
| Performance | 展示次数、点击次数、平均排名 |
| Coverage | 哪些页面被收录 / 哪些有错误 |
| Sitemaps | 已提交的 sitemap 和状态 |
| Enhancements | FAQ、面包屑、Hreflang 等结构化数据 |

## 🔍 关键词追踪

过 2-4 周后，Search Console 会显示你的网站在 Google 搜索结果中出现的关键词。常见关键词：

- "cookie clicker strategy" (CPC ~$0.8)
- "best idle games 2026" (CPC ~$1.2)
- "balatro joker tier list" (CPC ~$0.6)
- "universal paperclips walkthrough" (CPC ~$0.5)
- "slay the spire 2 best starter build" (CPC ~$1.0)

## ⏱️ 时间线

| 时间 | 预期 |
|---|---|
| 第 1 天 | sitemap 提交 |
| 第 3-7 天 | 首页被 Google 索引 |
| 第 2 周 | 大部分页面被索引 |
| 第 1 个月 | 每天 10-50 次 Google 搜索展示 |
| 第 3 个月 | 每天 100-500 次 |
| 第 6 个月 | 每天 500-5000 次（取决于内容质量） |

## 🎯 加速索引的技巧

1. **每周发 2-3 篇新文章**（保持 sitemap 活跃）
2. **内链做厚**（文章之间互相链接 ✅ 已经做了）
3. **发外链**：Reddit r/cookieclicker、r/incremental_games、r/balatro 等社区分享你的文章
4. **在 Steam 创意工坊、Discord 分享**（游戏社区的高质量外链）
5. **注册 Bing Webmaster Tools**（Bing 流量虽然少，但审核通过后 Google 也会加速）