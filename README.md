# 🌐 Augie Aristito Sudiarto — Cyber Security Portfolio

A retro-cyber themed portfolio website showcasing projects and skills in cybersecurity engineering. Built with modern web technologies and deployed with continuous integration/deployment.

[![CI](https://github.com/x0r909/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/x0r909/portfolio/actions/workflows/ci.yml)

## ✨ Features

- **Retro-Cyber Aesthetic** — Neon glitch effects, terminal-style UI, cyberpunk design
- **Terminal Loader** — Interactive loading screen with `whoami` command simulation
- **Responsive Design** — Mobile-first, tested from 320px to 1920px
- **Dynamic GitHub Integration** — Automatically fetches your latest public repos
- **Smooth Animations** — Framer Motion for scroll-triggered and interactive elements
- **CI/CD Pipeline** — GitHub Actions workflow for automated lint + build checks

## 🚀 Quick Start

```bash
git clone https://github.com/x0r909/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

```bash
npm run build   # Generates static files in /out
```

### Deploy to Dokploy (Proxmox multi-LXC)

Tanpa Traefik / Dokploy Domains — compose publish port ke host LXC:

```
Browser → Cloudflare Tunnel → NPM LXC → DOKPLOY_LXC_IP:3080 → portfolio:3000
```

| Lapisan | Peran |
|---|---|
| Cloudflare Tunnel | Hostname publik → `http://<IP-NPM>:80` |
| NPM | Proxy Host domain → `http://<IP-Dokploy>:3080` |
| Dokploy | Build/deploy compose saja (jangan set Domains) |
| Docker `ports` | Host `3080` → container `3000` |

1. Paste `.env.example` ke Dokploy Environment (`NODE_ENV`, `APP_PORT`, `HOST_PORT`).
2. Deploy / rebuild di Dokploy. **Skip Domains** (tidak pakai Traefik).
3. Verifikasi di LXC Dokploy: `curl -I http://127.0.0.1:3080` → harus 200.
4. **NPM** Proxy Host: domainmu → Forward `http://<IP-LXC-Dokploy>:3080` (HTTP).
5. **Cloudflare Tunnel**: Public Hostname → Service `http://<IP-NPM>:80` (atau port NPM-mu).
6. Optional: secret `DOKPLOY_WEBHOOK_URL` untuk CD.

```bash
cp .env.example .env
docker compose up --build
# App: http://127.0.0.1:3080
```

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import your repo
3. Vercel auto-detects Next.js — just click **Deploy**

Since this is a static export (`output: "export"`), you can also host the `out/` folder on GitHub Pages, Netlify, or any static host.

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework, static export |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| GitHub Actions | CI/CD |
| Docker + nginx | Production container |
| Dokploy | Deployment |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with terminal loader
│   └── globals.css         # Design tokens + global styles
└── components/
    ├── Navigation.tsx
    ├── TerminalLoader.tsx  # Boot screen
    ├── HeroSection.tsx
    ├── AboutSection.tsx
    ├── SkillsSection.tsx
    ├── ProjectsSection.tsx # Pulls from GitHub API
    ├── ContactSection.tsx
    └── Footer.tsx

.github/workflows/ci.yml   # Lint + build + docker on every push/PR
.github/workflows/cd.yml   # Trigger Dokploy webhook after CI on main
docker-compose.yml         # Dokploy compose (configured via .env)
Dockerfile                 # Multi-stage Next.js static → nginx
```

## 🎨 Customization

**Colors** → `tailwind.config.ts` under `theme.extend.colors.cyber`

**Personal info** → `HeroSection.tsx`, `AboutSection.tsx`, `layout.tsx`

**Social links** → `ContactSection.tsx`

**GitHub username** → `ProjectsSection.tsx` (change `x0r909`)

## ✅ CI/CD

**CI** (`.github/workflows/ci.yml`) on every push/PR to `main`:

1. `npm ci` → lint → build
2. Docker image build (no push) to catch Dockerfile issues

**CD** (`.github/workflows/cd.yml`) after CI succeeds on `main` push:

1. `POST`/`GET` Dokploy deploy webhook (`DOKPLOY_WEBHOOK_URL` secret)
2. Dokploy rebuilds from `docker-compose.yml` + `.env`

## 📧 Contact

- **GitHub**: [x0r909](https://github.com/x0r909)
- **LinkedIn**: [augiearistito](https://www.linkedin.com/in/augiearistito)
- **Instagram**: [@aw.akira_](https://instagram.com/aw.akira_)

---

*Cyber Security Engineering @ Politeknik Negeri Cilacap*
