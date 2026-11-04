# Augie Aristito Sudiarto — Portfolio

Personal portfolio built with **Next.js + TypeScript + Tailwind CSS v4** as a
**retro-cyber terminal**: a CRT shell session that builds itself as you scroll.
The visual system is specified in [`DESIGN.md`](DESIGN.md).

## Features

- Sticky prompt-style navbar with a phosphor switcher (green / amber / blue)
- Sections: Hero → About → Skills → Projects → Terminal → Certifications → Contact
- Project cards generated from the GitHub API (`npm run sync:projects`)
- A real interactive terminal (`help`, `about`, `projects`, `skills`, `contact`,
  `theme <x>`, `cv`, `clear`, `sudo`) with history and Tab completion
- A live page build, a CRT overlay and a once-per-session boot log
- Downloadable CV and certificate PDFs
- Static export — zero runtime server

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run lint
npx tsc --noEmit
npm run build   # static files in /out
```

`npm run start` is not supported with `output: "export"` — serve `out/` statically.

## CI / CD

Every branch push, pull request, and version tag triggers CI via GitHub Actions (`.github/workflows/ci.yml`):

1. **Lint, Typecheck & Build** — `npm ci --ignore-scripts`, a production-dependency audit gate, then `eslint` + `tsc --noEmit` + `next build`; uploads `out/`
2. **Docker Image** (CD) — builds and pushes the image to GHCR, on `main` (→ `latest`) and `staging` (→ `staging`). The pushed digest is then scanned, signed, and attested before the job can pass

Security scanning runs alongside it:

- **CodeQL** (`.github/workflows/codeql.yml`) — static analysis of the JavaScript/TypeScript source, on `main`/`staging`, PRs, and a weekly schedule
- **Dependency Review** (`.github/workflows/security.yml`) — blocks PRs that introduce high-severity vulnerable dependencies
- **gitleaks** — full-history secret scan; a secret removed in a later commit is still leaked
- **Trivy** — scans dependencies, config, and secrets for HIGH/CRITICAL findings, and separately scans the *built image* by digest. All results upload as SARIF to the Security tab

Every action is pinned to a commit SHA, each job declares only the `permissions:` it needs, and `.github/dependabot.yml` keeps the pins, the base-image digests, and npm current on a weekly cadence.

You can download the static build artifact or pull the image from GHCR for self-hosting.

### Pull the Docker image

```bash
docker pull ghcr.io/x0r909/portofolio:latest
docker run -p 3000:3000 ghcr.io/x0r909/portofolio:latest
```

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 16 (App Router) | React framework, static export |
| Tailwind CSS v4 | Utility styling (CSS-first tokens in `globals.css`) |
| next-themes | Phosphor variants (`data-theme`) |
| Radix UI | Accessible primitives |
| GitHub Container Registry | Docker image distribution |

## Project Structure

```
src/
  app/
    globals.css         # every design token + the unlayered motion CSS
    layout.tsx          # fonts, pre-paint boot script, overlay stack
    page.tsx            # section composition
    icon.svg            # favicon
    opengraph-image.tsx # OG card
  components/
    ui/                 # shadcn primitives (patched)
    Hero.tsx  About.tsx  Skills.tsx  Projects.tsx
    terminal.tsx  Certifications.tsx  Contact.tsx
    Navbar.tsx  Footer.tsx
    boot-screen.tsx  crt-overlay.tsx  build-live.tsx  matrix-rain.tsx
  lib/
    accents.ts          # Accent union + lookup objects
    projects.generated.ts  # GitHub snapshot — written by `npm run sync:projects`
    matrix.ts           # the easter egg's one shared event name
    utils.ts            # cn() helper
scripts/
  sync-projects.mjs     # refreshes the project snapshot from GitHub
public/
  cv/                   # downloadable CV
  certificates/         # downloadable certificate PDFs
  images/               # photos + logo
```

## License

© 2026 Augie Aristito Sudiarto. All rights reserved.
