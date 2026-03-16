# Goutham Shibulal — Portfolio

Personal portfolio + CMS. Static HTML — no build step needed.

## File Structure

```
gs-portfolio/
├── index.html          ← Public portfolio (the main site)
├── overview.html       ← Overview / about page
├── admin.html          ← Private CMS (password protected)
├── admin-manifest.json ← PWA manifest for Android app install
├── admin-sw.js         ← Service worker for offline admin
├── vercel.json         ← Vercel deployment config
└── .gitignore
```

---

## 🚀 Deploy: First Time

### Step 1 — Create GitHub repo

```bash
# On your machine, in the folder containing these files:
git init
git add .
git commit -m "Initial portfolio deploy"
```

Go to **github.com → New repository**
- Name it: `gs-portfolio` (or anything)
- Set to **Private** (recommended — keeps admin.html less discoverable)
- Don't initialise with README

```bash
git remote add origin https://github.com/YOUR_USERNAME/gs-portfolio.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect to Vercel

1. Go to **vercel.com** → Sign in with GitHub
2. Click **"Add New → Project"**
3. Import your `gs-portfolio` repo
4. Settings:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: *(leave empty)*
   - **Output Directory**: `./`
5. Click **Deploy** — done in ~10 seconds ✓

Your site will be live at:
`https://gs-portfolio.vercel.app`

---

## 🌐 Custom Domain (e.g. gouthamshibulal.com)

1. In Vercel → your project → **Settings → Domains**
2. Add your domain: `gouthamshibulal.com`
3. Vercel shows you DNS records to add — two options:

**Option A — Vercel nameservers (easiest):**
Point your domain's nameservers to Vercel's (shown in dashboard)

**Option B — Add DNS records manually (if domain is elsewhere):**
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```
Add these in your domain registrar (GoDaddy / Namecheap / etc.)

DNS propagates in ~5–30 minutes. HTTPS is automatic.

---

## 🔄 Updating Content (two ways)

### Via Admin CMS (recommended)
1. Go to `yourdomain.com/admin`
2. Log in with your password
3. Edit anything — saves instantly to browser localStorage
4. Changes are **live immediately** in the same browser

> ⚠️ localStorage is per-browser. See "Syncing across devices" below.

### Via Git (for code/design changes)
```bash
# Edit any .html file
git add .
git commit -m "Update project — added Pine Labs case study"
git push
```
Vercel auto-deploys in ~15 seconds after every push.

---

## 📱 Admin as Android PWA

1. On your Android phone, open Chrome
2. Go to `yourdomain.com/admin`
3. Log in once
4. Tap **Chrome menu (⋮) → "Add to Home Screen"**
5. It installs as a fullscreen app — no browser UI

Works offline after first load. All data stored locally on phone.

---

## 🔄 Syncing Admin Data Across Devices

The CMS uses localStorage — data lives in the browser. To use your edits on another device:

**Admin → any page → Export (coming soon)**

For now, the simplest approach:
1. Make all CMS edits on one device (your main laptop or Android)
2. For permanent content (bio, projects), also update `index.html` directly via Git — the HTML has all default data baked in as fallback

---

## 🔒 Security Notes

- Admin is password-protected (default: `admin2025` — **change this first!**)
- Admin page URL is `yourdomain.com/admin` — not linked from the public site
- For extra security: rename `admin.html` to something obscure like `admin-gs7x2.html`
- Never commit real passwords or API keys to Git

---

## 📦 Dependencies

None. Zero npm, zero build tools. Pure HTML/CSS/JS.

Fonts loaded from Google Fonts CDN (requires internet on first load).
Subsequent loads use browser cache.
