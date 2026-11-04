# AGENTS.md

Next.js 16 (App Router) static-export portfolio: React 19, TypeScript strict, Tailwind CSS v4, patched shadcn primitives, next-themes. No backend, no runtime server. Node ≥24. **`DESIGN.md` is the visual system's source of truth** — read it before changing anything with a colour, a size, or a motion.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` — ESLint CLI (flat config `eslint.config.mjs`; `next lint` removed in Next 16)
- `npx tsc --noEmit` — typecheck (no npm script exists)
- `npm run build` — static export to `out/`
- Do NOT use `npm run start`: `next start` is unsupported with `output: "export"` (next.config.ts). Serve `out/` statically (the Docker/nginx path is the deploy flow)
- No test framework — do not invent `npm test`

## Architecture

- `src/app/page.tsx` composes Hero → About → Skills → Projects → **Terminal** → Certifications → Contact (`DESIGN.md` §8). `layout.tsx` owns fonts (VT323 → `--font-display`, JetBrains_Mono → `--font-mono`), the pre-paint boot script, `ThemeProvider`, the overlay stack, `Navbar`, `Footer`, and metadata
- Sections are server components; only `"use client"` for `Navbar`, `Contact`, `terminal`, `ThemeProvider`, `ThemeToggle`, `boot-screen`, `crt-overlay`, `build-live`, `matrix-rain`, and the Radix-backed `ui/` primitives
- `src/components/ui/` — shadcn new-york primitives, currently `badge`, `button`, `card`, `input`, `label`, `textarea`, plus unused `accordion` and `avatar`. **Do not blanket-`--overwrite` these**: `components.json` still points at the neobrutalism registry, which now contradicts this design system — an overwrite reintroduces 2px black borders, `rounded`, offset shadows and `font-head` (a token that no longer exists). Preserve the cva / `data-slot` patterns
- `src/components/` outside `ui/` holds hand-rolled composites (non-registry — edit directly): `section.tsx` (`{ id, banded? }`), `section-header.tsx` (`{ eyebrow, title, description?, accent, command? }`), `offset-frame.tsx` (offset accent outline + the `⌥`-duplicate), `highlight-card.tsx`. Window chrome is `CardChrome` in `ui/card.tsx`
- `src/lib/accents.ts` — the `Accent` union (`phosphor | cyan | warn | danger`) with `ACCENT_TEXT` / `ACCENT_BG` / `ACCENT_BORDER` lookup objects and `SECTION_ACCENT`. Tailwind v4 can't see `bg-${x}` interpolation — add to the lookup objects, never concatenate
- `build-live.tsx` — the live page build. Real elements opt in with `data-build` and are constructed in place as they approach the viewport (a short fade plus an 8px rise from the element's own CSS; nothing is drawn over the page, and `BuildLive` itself renders `null`). Arming is pre-paint and opt-in: an inline `<head>` script sets `html[data-build="on"]` only without reduced motion or a coarse pointer, so no-JS is complete and static. `done` matches no CSS rule and the build animation uses `fill-mode: backwards`, which is what keeps the single `hover-glow` rule owning hover — do not switch it to `both`. Targets already on screen go straight to `start()` instead of waiting for the build observer, whose `-25%` margin never fires for them. In the CSS, the `.build-type` caret must be gated with a *compound* selector (`[data-build-state="building"].build-type::after`) because that element is itself the `data-build` element, and `build-caret` must stay 300 ms with no hold so it finishes before the gate closes
- `boot-screen.tsx` holds **no component state** — visibility is the `html[data-boot]` attribute, which also keeps it out of the accessibility tree when not booting. Adding a `useState` flag back forces a synchronous `setState` in an effect, which `react-hooks/set-state-in-effect` rejects. `.boot-line`'s stagger is therefore gated on `html[data-boot="on"]`
- Path alias `@/*` → `src/*`
- **The project list is generated.** `Projects.tsx` maps `REPOS` from `src/lib/projects.generated.ts`, written by `npm run sync:projects` (`scripts/sync-projects.mjs`) from `GET /users/x0r909/repos`. Static export ⇒ the snapshot is committed and the build reads it; never hand-edit that file, re-run the sync. `status` (ARCHIVED / DORMANT >6mo / ONLINE), `stack` (topics, falling back to `language`) and the date (`pushedAt`) are all derived from GitHub, never invented; a repo without a description renders without one. `EXCLUDE` in the script drops non-portfolio repos
- **Skills carries no metrics**: tool names only, no percentages and no bars

## Styling

- Tailwind v4 is CSS-first: all tokens live in `src/app/globals.css` (`@theme inline` + `:root`) — there is NO `tailwind.config.*`; add tokens there, not in a JS config
- **Retro-cyber terminal**, not light/dark: `--bg #0a0e0a`, `--fg #c8f7c8`, `--accent #39ff14`, `--accent-2 #00e5ff`, `--radius: 0` (2px only for the three title-bar marks), 1px `--border`. **Shadow is glow, never a drop shadow**
- `--shadow-*` resolve to `--glow-2xs` … `--glow-2xl`, deliberately NOT redefined in `:root`: `@theme inline` binds `--shadow-*` to them and a custom property cannot reference itself. Keep the raw names `--glow-*`
- Themes are **phosphor variants**: `next-themes` with `attribute="data-theme"`, `themes={["green","amber","blue"]}`, `enableSystem={false}`, `storageKey="phosphor"`. `:root` with no attribute is green. `--accent-2` stays cyan in all three. Key colour off `--accent`, never a hardcoded hex
- One interaction rule: `hover-glow` (border → `--accent`, glow appears). Project cards add `glitch-hover`. Do not introduce a competing hover (lift, press-down, shadow-shrink)
- Section rhythm: Hero plain → About band → Skills plain → Projects band → Terminal plain → Certs plain → Contact band (`<Section banded>` raises the ground to `--bg-elev`)
- **All motion uses `steps()`**, never cubic-bezier. Motion CSS is deliberately **unlayered** — Tailwind v4's `utilities` layer would otherwise beat it without `!important`
- Headings get `font-display` (VT323) from the base layer, but the `.font-display` utility must also exist in `@layer utilities` for bare class use
- Overlay order: navbar (30) < CRT (40) < matrix rain (55) < build (60) < boot (80). All are `pointer-events: none` and `aria-hidden`
- **The page draws no cursors of its own** (`DESIGN.md` §6). The only pointer is the visitor's; the only caret is the browser's, tinted to `--accent` by one base-layer rule in `globals.css`. Do not add a canvas/SVG pointer effect back
- `matrix-rain.tsx` — the `sudo` / Konami easter egg, 3s of falling glyphs. Returns `null` unless active, so the canvas mounts only for the run (no idle rAF). Triggers: `terminal.tsx`'s `sudo` dispatches `MATRIX_EVENT` from `src/lib/matrix.ts`; the Konami sequence is listened for inside the component
- Copy is Indonesian (`<html lang="id">`) — match that tone

## The terminal

`terminal.tsx` is the one genuinely stateful piece and every command has a real effect (scroll, theme swap, mail link) — nothing printed fake. A11y: `role="application"`, a real `<input>` with a label, and an `sr-only` `aria-live="polite"` mirror of the last line. Adding a command means adding it to `COMPLETIONS` and `HELP` too.

## Duplicated contact details

Email / GitHub / LinkedIn appear in four places: `Contact.tsx` (`contactLinks`), `Footer.tsx` (`socialLinks`), `terminal.tsx` (`CONTACT`), and `layout.tsx` (JSON-LD `email`/`sameAs`). There is no shared constant — keep all four in sync.

## Build / Deploy

- CI (`.github/workflows/ci.yml`): `quality` job (`npm ci --ignore-scripts` → prod-dependency audit → lint → `tsc --noEmit` → `next build` → uploads `out/` artifact) runs on every branch push, PRs, and `v*` tags; `docker` job (CD) pushes `ghcr.io/x0r909/portofolio` on `main` (→ `latest`) and `staging` (→ `staging`), then scans the pushed digest with Trivy, writes an SPDX SBOM, signs with keyless cosign, and attests provenance. All actions are SHA-pinned — keep the version comment when bumping; `.github/dependabot.yml` handles the bumps
- Security: `codeql.yml` (CodeQL `security-extended`, `main`/`staging` + PRs + weekly); `security.yml` (Dependency Review on PRs, gitleaks full-history secret scan, Trivy fs scan → SARIF, weekly)
- Dockerfile: node:24-alpine builds → nginx:1.31-alpine serves `out/` on :3000 with `nginx.conf` (gzip, security headers, 30d asset cache, SPA fallback). Both base images are pinned tag + digest; the nginx stage runs `apk upgrade --no-cache` (the published tag lags Alpine advisories) and as the unprivileged `nginx` user — preserve both on edit
- `docker-compose.yml`: pulls `ghcr.io/x0r909/portfolio-augie:latest`, maps `${APP_PORT:-3000}:3000`. That image name does not exist — CI publishes `ghcr.io/x0r909/portofolio`
- `setup-prod.sh` is broken: it references `ecosystem.config.js` (PM2), which does not exist in the repo — prefer the Docker path

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
