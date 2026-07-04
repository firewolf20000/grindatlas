# 🚀 GrindAtlas 部署指南（图形化，零命令）

适用人群：**不想敲命令、点点鼠标就能上线**。

总耗时：约 15-30 分钟（其中 npm install 占大头，约 5-10 分钟）。

---

## 📋 你需要准备

| 项目 | 用途 | 链接 |
|---|---|---|
| GitHub 账号 | 托管代码 | https://github.com/signup |
| Cloudflare 账号 | 托管网站（免费） | https://dash.cloudflare.com/sign-up |
| Node.js 20 LTS | 装依赖、构建网站 | https://nodejs.org/ |
| Git | 推代码到 GitHub | https://git-scm.com/ |
| GitHub Desktop（推荐） | 不敲命令传代码 | https://desktop.github.com/ |

下载安装全部下一步到底即可。装好 Node 之后**关闭再打开 PowerShell**，让 PATH 生效。

---

## 🎯 推荐流程（最简单）

### 第 1 步：本地预览（5 分钟）

1. 打开文件资源管理器，进入 `E:\grindatlas`
2. **双击 `dev.bat`**
3. 它会：
   - 自动跑 `npm install`（首次约 5-10 分钟）
   - 启动本地服务器
   - 打开浏览器到 http://localhost:4321
4. 你会看到网站，5 篇文章、1 个工具都正常
5. 改 `src\content\articles\best-idle-games-2026.md` 试一下，浏览器会自动刷新
6. 完成后 `Ctrl+C` 停服务

✅ **如果第 1 步能看到网站，继续下一步。否则在 Issues 报给我。**

---

### 第 2 步：建 GitHub 仓库（2 分钟）

1. 浏览器打开 https://github.com/new
2. 填表：
   - **Repository name**: `grindatlas`
   - **Description**: `Game guides and tools for idle and roguelike games`
   - **Public** （建议）或 Private
   - ❌ 不要勾选 "Add a README file"
   - ❌ 不要勾选 "Add .gitignore"
   - ❌ 不要勾选 "Choose a license"
3. 点 **Create repository**
4. 复制仓库 URL（形如 `https://github.com/你的用户名/grindatlas.git`）

---

### 第 3 步：推代码到 GitHub（3 分钟）

**方法 A：用 GitHub Desktop（最简单）**

1. 安装并打开 GitHub Desktop：https://desktop.github.com/
2. 登录你的 GitHub 账号
3. File → Add local repository → 选 `E:\grindatlas` 文件夹
4. 它会检测到已有 commit，点 **Push origin**
5. 完成

**方法 B：用 init-github.bat**

1. 在 `E:\grindatlas` 文件夹，**双击 `init-github.bat`**
2. 它会引导你一步步完成（开浏览器、设用户名、推送）

**方法 C：手动命令行**

```powershell
cd E:\grindatlas
git remote add origin https://github.com/你的用户名/grindatlas.git
git push -u origin main
# 输入 GitHub 用户名 + Personal Access Token（不是密码）
```

> 🔑 **关于密码**：GitHub 不再支持密码推送。你需要 Personal Access Token。
> 创建：https://github.com/settings/tokens → Generate new token (classic) → 勾 `repo` → 生成 → 复制保存，只显示一次。

---

### 第 4 步：建 Cloudflare Pages 项目（5 分钟）

1. 浏览器打开 https://dash.cloudflare.com/
2. 左侧菜单 → **Workers & Pages** → **Create application** → **Pages** 标签 → **Connect to Git**
3. 选 **GitHub** → 授权 Cloudflare 访问你的 GitHub
4. 选 `grindatlas` 仓库 → **Begin setup**
5. 配置：
   - **Project name**: `grindatlas`（决定你的预览域名 `grindatlas.pages.dev`）
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build directory**: `dist`
   - **Environment variables**: 暂时不填
6. 点 **Save and Deploy**
7. 等 1-3 分钟（控制台会显示 build 日志）
8. 完成后显示 🎉 你的网站地址：`https://grindatlas.pages.dev`

✅ **现在访问 https://grindatlas.pages.dev，应该能看到网站。**

---

### 第 5 步：绑定 grindatlas.com 域名（可选，10 分钟）

如果你有 `grindatlas.com` 域名（Namesilo / Cloudflare Registrar / 阿里云 / GoDaddy 都可以）：

1. **在 Cloudflare 添加站点**（如果还没有）：
   - https://dash.cloudflare.com/ → Add site → 输入 `grindatlas.com` → Free plan
   - Cloudflare 会给你两个 nameservers
2. **去你的域名注册商**把 nameservers 改成 Cloudflare 给的那两个
3. 等 5-30 分钟 DNS 生效
4. Cloudflare Dashboard → 你的域名 → DNS → Records：确保有 `grindatlas.com` 的 A 记录或 CNAME 指向 Pages
5. Cloudflare Pages → grindatlas 项目 → **Custom domains** → **Set up a custom domain** → 输入 `grindatlas.com`
6. 等 SSL 证书自动签发（约 5-10 分钟）

完成后 `https://grindatlas.com` 即可访问。

---

### 第 6 步：申请 Google AdSense（审核 1-14 天）

⚠️ **必须有内容、有流量、域名生效一周以上** 才容易通过。

1. 确认网站可访问、至少有 5-10 篇内容
2. 申请：https://www.google.com/adsense/
3. 输入 `grindatlas.com`
4. 验证域名（AdSense 会要求加一条 DNS 记录）
5. 等待审核通过
6. 拿到发布商 ID（`ca-pub-xxxxxxxxxxxxxxxx`）

**审核通过后改两个地方**：

A. `E:\grindatlas\public\ads.txt` 改成：
```
google.com, pub-xxxxxxxxxxxxxxxx, DIRECT, f08c47fec0942fa0
```

B. `E:\grindatlas\src\components\AdSlot.astro` 把 `ca-pub-XXXXXXXXXXXXXXXX` 全部替换成你的真实 ID。

C. 提交修改并推 GitHub：
```powershell
git add -A
git commit -m "Configure AdSense"
git push
```

Cloudflare 会自动重新部署，1-2 分钟后广告生效。

---

## 🔄 以后更新内容

**日常修改流程**：

1. 编辑 `E:\grindatlas\src\content\articles\你的文章.md`
2. 提交并推送：
   ```powershell
   cd E:\grindatlas
   git add -A
   git commit -m "new article"
   git push
   ```
3. 1-2 分钟后线上自动更新

**加新文章**：复制 `src\content\articles\best-idle-games-2026.md` 改文件名 + 改内容 + 改 frontmatter 的 `title` 和 `category`。

**加新工具**：
1. 写 React 组件到 `src\components\tools\你的工具.tsx`
2. 在 `src\content\tools\` 加 JSON 元数据
3. 在 `src\pages\tools\[slug].astro` 的 `componentMap` 加一行

---

## 🆘 常见问题

### Q: `npm install` 报错 EACCES / EPERM
**A**: 以管理员身份运行 PowerShell，或在 `E:\grindatlas` 上右键 → 属性 → 安全 → 给你的用户完全控制权限。

### Q: GitHub Desktop 推送时一直转圈
**A**: 第一次推送需要登录 GitHub。File → Options → Sign in。

### Q: Cloudflare 部署失败 "build failed"
**A**: 复制 build 日志里的错误，99% 是 npm install 网络问题。重试一次，或加 `.npmrc` 文件用国内镜像：
```ini
registry=https://registry.npmmirror.com
```

### Q: 网站打开是 404
**A**: 检查 `dist/index.html` 存在；如果直接访问 `grindatlas.pages.dev` 404，可能是 Cloudflare 还没建好。等 1 分钟再试。

### Q: 怎么开多个工具/文章？
**A**: 见上方「以后更新内容」。

### Q: 怎么换广告位？
**A**: 在文章里加 `<AdSlot slot="middle" />`，可放在任意位置。`<AdSlot slot="top|bottom|middle|sidebar" />`。

### Q: grindatlas.com 域名要多少钱？
**A**: `.com` 首年约 $9-12，续费约 $12-15。Cloudflare Registrar 经常有促销。
- Cloudflare Registrar: https://www.cloudflare.com/products/registrar/
- Namecheap: https://www.namecheap.com/

---

## ✅ 完整流程检查清单

- [ ] Node.js 20+ 已装
- [ ] Git 已装
- [ ] `dev.bat` 跑过，http://localhost:4321 能看到网站
- [ ] GitHub 账号已注册
- [ ] GitHub 仓库 `grindatlas` 已创建
- [ ] 代码已推送（GitHub 仓库页面能看到文件）
- [ ] Cloudflare 账号已注册
- [ ] Cloudflare Pages 项目已连接
- [ ] `grindatlas.pages.dev` 能访问
- [ ] （可选）`grindatlas.com` 域名已绑定
- [ ] （可选）AdSense 已申请

完成后你的网站就在线了 🎉

---

## 💰 接下来

上线后第 1 个月：每 3 天发 1 篇文章，目标 10+ 篇。
第 2-3 个月：申请 AdSense，集成广告。
第 3-6 个月：每 2 天 1 篇，目标 30+ 篇，Google 流量开始起来。
第 6-12 个月：流量 1k-10k daily，AdSense 月入 $200-2000。

详细运营策略见 README.md。
