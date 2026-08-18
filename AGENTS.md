# AGENTS.md

Next.js 15 (App Router) static-export portfolio: React 19, TypeScript strict, Tailwind CSS v4, shadcn/RetroUI primitives, next-themes. No backend, no runtime server.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` — ESLint via `next lint`
- `npx tsc --noEmit` — typecheck (no npm script exists)
- `npm run build` — static export to `out/`
- Do NOT use `npm run start`: `next start` is unsupported with `output: "export"` (next.config.ts). Serve `out/` statically (the Docker/nginx path is the deploy flow)
- No test framework — do not invent `npm test`

## Architecture

- `src/app/page.tsx` composes section components; `layout.tsx` owns fonts (Archivo_Black → `--font-head`, Space_Grotesk → `--font-sans`), ThemeProvider, Navbar, Footer, and metadata
- Section components (Hero, About, Skills, Projects, Contact) are server components; only interactive ones use `"use client"` (Navbar, Contact, Theme*, ui/accordion)
- `src/components/ui/` — shadcn new-york primitives sourced from the RetroUI registry (`components.json`); preserve cva/`data-slot` patterns when editing
- Path alias `@/*` → `src/*`

## Styling

- Tailwind v4 is CSS-first: all tokens live in `src/app/globals.css` (`@theme inline` + `:root`/`.dark`) — there is NO `tailwind.config.*`; add tokens there, not in JS config
- Neobrutalist system: `--radius: 0`, hard offset shadows (`--shadow-*`), 2px black borders (`--border`). Use theme tokens (`bg-primary`, `border-border`, `shadow-md`), not Tailwind default colors/shadows
- Dark mode uses next-themes class strategy with a `@custom-variant dark` — new styles need `dark:` variants

## Build / Deploy

- CI (`.github/workflows/ci.yml`): `quality` job (lint → `tsc --noEmit` → `next build` → uploads `out/` artifact) runs on PRs, `main`, and `v*` tags; `docker` job pushes `ghcr.io/x0r909/portfolio-augie` on `main`/`v*` tags only
- Dockerfile: node:20-alpine builds → nginx:1.27-alpine serves `out/` on :3000 with `nginx.conf` (gzip, security headers, 30d asset cache, SPA fallback)
- `docker-compose.yml`: pulls the GHCR image, maps `${APP_PORT:-3000}:3000`
- `setup-prod.sh` is broken: it references `ecosystem.config.js` (PM2), which does not exist in the repo — prefer the Docker path