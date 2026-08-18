# Augie Aristito Sudiarto — Portfolio

Personal portfolio built with **Next.js + TypeScript + Tailwind CSS v4** and a **neobrutalist** design system (thick borders, hard offset shadows, bold type).

## Features

- Sticky navbar with dark mode toggle
- Sections: Hero, About, Skills, Projects, Contact
- Light / dark theme via `next-themes`
- Static export — zero runtime server

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build   # static files in /out
```

## CI / CD

Pushes to `main` and pull requests trigger CI via GitHub Actions (`.github/workflows/ci.yml`):

1. **Lint, Typecheck & Build** — runs `next lint` + `tsc --noEmit` + `next build`, uploads the `out/` directory as a build artifact
2. **Docker Image** — builds and pushes a Docker image to `ghcr.io/<repo>` (main branch / version tags only, not on PRs)

You can download the static build artifact or pull the image from GHCR for self-hosting.

### Pull the Docker image

```bash
docker pull ghcr.io/x0r909/portfolio-augie:latest
docker run -p 3000:3000 ghcr.io/x0r909/portfolio-augie:latest
```

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 15 (App Router) | React framework, static export |
| Tailwind CSS v4 | Utility styling |
| next-themes | Light / dark mode |
| Radix UI | Accessible primitives |
| GitHub Container Registry | Docker image distribution |

## Project Structure

```
src/
  app/                 # App Router layout + page
  components/
    ui/                # UI primitives (Button, Card, Badge, …)
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
