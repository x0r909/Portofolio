# Augie Aristito Sudiarto — Cyber Security Portfolio

Personal portfolio built with **Next.js + TypeScript + Tailwind CSS v4** and the **[RetroUI](https://retroui.dev)** neobrutalist design system (thick borders, hard offset shadows, bold type).

## Features

- Sticky navbar with RetroUI buttons + dark mode toggle
- Sections: Hero, About, Skills, Projects, Contact
- Official RetroUI components (Button, Card, Badge, Input, Textarea, Accordion, Avatar, Label)
- Static export — ready for Vercel, Docker, or any static host

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build   # static files in /out
npm start       # serve production build
```

### Vercel

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Deploy — Next.js is auto-detected

### Docker / Dokploy

See `Dockerfile` and `docker-compose.yml`. Copy `.env.example` → `.env`.

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 15 (App Router) | React framework, static export |
| Tailwind CSS v4 | Utility styling + RetroUI theme tokens |
| RetroUI (shadcn registry) | Neobrutalist UI components |
| next-themes | Light / dark mode |

## Project Structure

```
src/
  app/                 # App Router layout + page
  components/
    ui/                # RetroUI components (CLI-installed)
    Hero.tsx
    About.tsx
    Skills.tsx
    Projects.tsx
    Contact.tsx
    Navbar.tsx
    Footer.tsx
  lib/utils.ts         # cn() helper
```

## License

© 2026 Augie Aristito Sudiarto. All rights reserved.
