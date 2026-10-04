# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Next.js 15 (App Router) static-export portfolio for Augie Aristito Sudiarto. React 19, TypeScript strict, Tailwind CSS v4, shadcn/RetroUI primitives, next-themes. No backend, no runtime server. `AGENTS.md` covers the same ground — keep the two in sync when conventions change.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` — ESLint via `next lint` (config: `next/core-web-vitals`)
- `npx tsc --noEmit` — typecheck (no npm script exists)
- `npm run build` — static export to `out/`

Do **not** use `npm run start`: `next start` is unsupported with `output: "export"` (`next.config.ts`). Serve `out/` statically instead. No test framework — do not invent `npm test`.

## Architecture

- `src/app/page.tsx` composes the section components in order; `layout.tsx` owns the Google fonts (Archivo_Black → `--font-head`, Space_Grotesk → `--font-sans`), `ThemeProvider`, `Navbar`, `Footer`, JSON-LD, and all SEO metadata (canonical site `https://augie.my.id`)
- `src/app/` also holds `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `icon.svg` — the metadata routes are code, not static files
- Sections (Hero, About, Skills, Projects, Contact) are server components; only interactive ones carry `"use client"` (Navbar, Contact, Theme*, `ui/accordion`, `ui/label`, `ui/avatar`)
- `src/components/ui/` — shadcn new-york primitives pulled from the RetroUI registry (`components.json` → `registries`). Preserve the cva / `data-slot` patterns when editing; regenerate from the registry rather than hand-rolling
- Path alias `@/*` → `src/*`; `cn()` from `src/lib/utils.ts` merges clashing Tailwind classes

## Styling

- Tailwind v4 is CSS-first: every token lives in `src/app/globals.css` (`@theme inline` + `:root` / `.dark`). There is **no** `tailwind.config.*` — new tokens go in the CSS
- Neobrutalist system: `--radius: 0`, 2px black borders (`--border`), hard offset shadows (`--shadow-*`, no blur). Use theme tokens (`bg-primary`, `border-border`, `shadow-md`) and the `retro-*` accents, never Tailwind's default palette or shadow scale
- Custom utilities worth reusing: `section-container` (page-width section padding), `hover-lift` (translate + shadow on hover), `retro-pattern` (dotted page background)
- Dark mode is next-themes with the class strategy via `@custom-variant dark` — anything new that uses color needs `dark:` variants
- Headings get `font-head` automatically from a base-layer rule; copy on the site is Indonesian (`<html lang="id">`), so match that tone for user-facing text

## Build / Deploy

- CI (`.github/workflows/ci.yml`): the `quality` job (lint → `tsc --noEmit` → `next build` → uploads `out/`) runs on every branch push, PRs, and `v*` tags; the `docker` job (CD) pushes `ghcr.io/x0r909/portfolio-augie` on `main` only
- Security workflows: `codeql.yml` (CodeQL `security-extended`, `main` + PRs + weekly) and `security.yml` (Dependency Review on PRs, Trivy fs scan for vulns/misconfig/secrets → SARIF). Both need GitHub Advanced Security, which is free on this public repo
- Dockerfile: node:20-alpine builds → nginx:1.27-alpine serves `out/` on :3000 using `nginx.conf` (gzip, security headers, 30d asset cache, SPA fallback)
- `docker-compose.yml` pulls the GHCR image and maps `${APP_PORT:-3000}:3000`
- `setup-prod.sh` is broken — it runs `pm2 start ecosystem.config.js`, and no `ecosystem.config.js` exists in the repo. Prefer the Docker path

## Contact form

`Contact.tsx` has no submission endpoint: it builds a `mailto:` URL from the form fields and sets `window.location.href`. Keep it that way unless a real backend is added — the static export cannot run server actions or API routes.

The contact details (email, GitHub, LinkedIn) are duplicated: `Contact.tsx` (`contactLinks`) and `layout.tsx` (JSON-LD `email` / `sameAs`). Changing one requires changing the other; there is no shared constant.
