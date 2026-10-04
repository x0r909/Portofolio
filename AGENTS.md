# AGENTS.md

Next.js 16 (App Router) static-export portfolio: React 19, TypeScript strict, Tailwind CSS v4, shadcn/neobrutalism primitives, next-themes. No backend, no runtime server. Node ≥24.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` — ESLint CLI (flat config `eslint.config.mjs`; `next lint` removed in Next 16)
- `npx tsc --noEmit` — typecheck (no npm script exists)
- `npm run build` — static export to `out/`
- Do NOT use `npm run start`: `next start` is unsupported with `output: "export"` (next.config.ts). Serve `out/` statically (the Docker/nginx path is the deploy flow)
- No test framework — do not invent `npm test`

## Architecture

- `src/app/page.tsx` composes section components; `layout.tsx` owns fonts (Archivo_Black → `--font-head`, Space_Grotesk → `--font-sans`), ThemeProvider, Navbar, Footer, and metadata
- Section components (Hero, About, Skills, Projects, Certifications, Contact) are server components; only interactive ones use `"use client"` (Navbar, Contact, Theme*, ui/accordion, ui/label, ui/avatar)
- Contact details (email, GitHub, LinkedIn) are duplicated in `Contact.tsx` (`contactLinks`) and `layout.tsx` (JSON-LD `email`/`sameAs`) — no shared constant, so keep both in sync
- `src/components/ui/` — shadcn new-york primitives sourced from the neobrutalism registry (`components.json` → `https://neobrutalism.com/r/radix/{name}.json`); preserve cva/`data-slot` patterns when editing. Do NOT blanket-`--overwrite` these: upstream `button.tsx` still hardcodes `border-black` and `accordion.tsx` ships a hover shadow-shrink that contradicts the site's one hover rule — patch surgically
- `src/components/` outside `ui/` holds hand-rolled, non-registry composites: `section.tsx` (`{ id, banded? }` — ground is declared per section), `section-header.tsx` (`{ eyebrow, title, description?, accent }`), plus `accent-bar.tsx`, `offset-frame.tsx`, `highlight-card.tsx`
- `src/lib/accents.ts` — the `Accent` union of literal `bg-retro-*` strings (Tailwind v4 can't see `bg-${x}` interpolation — never concatenate) and `SECTION_ACCENT`, one accent per section
- Contact details (email, GitHub, LinkedIn) are duplicated in `Contact.tsx` (`contactLinks`) and `layout.tsx` (JSON-LD `email`/`sameAs`) — no shared constant, so keep both in sync
- Path alias `@/*` → `src/*`

## Styling

- Tailwind v4 is CSS-first: all tokens live in `src/app/globals.css` (`@theme inline` + `:root`/`.dark`) — there is NO `tailwind.config.*`; add tokens there, not in JS config
- Neobrutalist system: `--radius: 0`, hard offset shadows (`--shadow-*`), 2px black borders (`--border`). Use theme tokens (`bg-primary`, `border-border`, `shadow-md`), not Tailwind default colors/shadows
- `--shadow-*` reference `--shadow-color` (#000 light / #4a443c dark), deliberately NOT `--border` (which is `#000` in both themes, making dark shadows invisible). Keep them separate
- One hover rule: `shadow-md` at rest → `hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg` → `active:translate-x-0.5 active:translate-y-0.5 active:shadow-sm` (see `hover-lift`)
- Section ground alternates strictly: Hero plain → About band → Skills plain → Projects band → Certifications plain → Contact band (`<Section banded>` adds `border-y-2 border-border bg-muted/40`)
- Dark mode uses next-themes class strategy with a `@custom-variant dark` — new styles need `dark:` variants
- Accent text uses `text-primary-foreground` (cream-on-yellow ~1.8:1, so never `text-black` on the `retro-*` fills)

## Build / Deploy

- CI (`.github/workflows/ci.yml`): `quality` job (lint → `tsc --noEmit` → `next build` → uploads `out/` artifact) runs on every branch push, PRs, and `v*` tags; `docker` job (CD) pushes `ghcr.io/x0r909/portfolio-augie` on `main` only
- Security: `codeql.yml` (CodeQL `security-extended`) and `security.yml` (Dependency Review on PRs + Trivy fs scan → SARIF)
- Dockerfile: node:24-alpine builds → nginx:1.27-alpine serves `out/` on :3000 with `nginx.conf` (gzip, security headers, 30d asset cache, SPA fallback). The nginx stage runs as the unprivileged `nginx` user — preserve that on edit
- `docker-compose.yml`: pulls the GHCR image, maps `${APP_PORT:-3000}:3000`
- `setup-prod.sh` is broken: it references `ecosystem.config.js` (PM2), which does not exist in the repo — prefer the Docker path

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
