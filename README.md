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

### Deploy to Dokploy (Docker Compose + Cloudflare Tunnel)

Setup ini hanya **expose port** (tanpa Traefik / Let's Encrypt). Domain diarahkan lewat Cloudflare Tunnel di homeserver.

1. Copy env template:

```bash
cp .env.example .env
# Set HOST_PORT jika perlu (default 3000)
```

2. In Dokploy → **Create Service** → **Compose**:
   - Provider: GitHub
   - Repository: this repo, branch `main`
   - Compose Path: `./docker-compose.yml`
   - Environment: paste isi `.env.example` (`HOST_PORT`, `NODE_ENV`)

3. Di Cloudflare Tunnel, buat public hostname → service `http://127.0.0.1:3000` (atau port `HOST_PORT` yang kamu set).

4. Enable Deploy Webhook di Dokploy, lalu tambah GitHub secret:
   - Name: `DOKPLOY_WEBHOOK_URL`
   - Value: webhook URL dari Dokploy

5. Push ke `main` → CI → CD trigger Dokploy.

Local Docker test:

```bash
cp .env.example .env
docker network create dokploy-network
docker compose up --build
# App: http://localhost:3000
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
