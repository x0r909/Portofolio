# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Next.js 16 (App Router) static-export portfolio for Augie Aristito Sudiarto. React 19, TypeScript strict, Tailwind CSS v4, patched shadcn primitives, next-themes. No backend, no runtime server. `AGENTS.md` covers the same ground — keep the two in sync when conventions change. **`DESIGN.md` is the visual system's source of truth**; read it before changing anything that has a colour, a size, or a motion.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` — ESLint CLI, flat config in `eslint.config.mjs` (`next lint` was removed in Next 16; `next build` no longer lints, so this step carries lint alone)
- `npx tsc --noEmit` — typecheck (no npm script exists)
- `npm run build` — static export to `out/`

**Toolchain pins worth knowing:** Node ≥24 (`engines`), TypeScript 6 — not 7. TypeScript 7 exists but the bundled `typescript-eslint` peer-caps at `<6.1.0` and hard-errors, so 7 cannot be used until that lifts. ESLint stays on 9 for the same reason: `eslint-config-next@16`'s plugins are not ESLint 10 compatible yet (`scopeManager.addGlobals` throws).

Do **not** use `npm run start`: `next start` is unsupported with `output: "export"` (`next.config.ts`). Serve `out/` statically instead. No test framework — do not invent `npm test`.

## Architecture

- `src/app/page.tsx` composes Hero → About → Skills → Projects → **Terminal** → Certifications → Contact (DESIGN.md §8). `layout.tsx` owns the Google fonts (VT323 → `--font-display`, JetBrains_Mono → `--font-mono`), the pre-paint boot script, `ThemeProvider`, and the overlay stack — `BootScreen`, `CrtOverlay`, `BuildLive`, `MatrixRain` — then `Navbar`, `main`, `Footer`
- `src/app/` also holds `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `icon.svg` — the metadata routes are code, not static files
- Sections are server components; only these carry `"use client"`: `Navbar`, `Contact`, `terminal`, `ThemeProvider`, `ThemeToggle`, `boot-screen`, `crt-overlay`, `build-live`, `matrix-rain`, and the `ui/` primitives that need Radix
- `src/components/ui/` — shadcn new-york primitives. **Do not blanket-`--overwrite` these.** `components.json` still lists the neobrutalism registry, which now contradicts this design system: an upstream overwrite would reintroduce 2px black borders, `rounded`, hard offset shadows, and `font-head` (a token that no longer exists). Current primitives are `badge`, `button`, `card`, `input`, `label`, `textarea`, plus unused `accordion` and `avatar`. Preserve the cva / `data-slot` patterns
- `src/components/` (outside `ui/`) holds hand-rolled site composites — **not** registry-managed, edit them directly:
  - `section.tsx` — `{ id, banded?, children }`; a 1px dashed top rule, and `banded` raises the ground to `--bg-elev`. Each section declares its own ground
  - `section-header.tsx` — `{ eyebrow, title, description?, accent, command? }`; renders `$ <command>` in the section accent, the `h2` in VT323, and the muted paragraph. `accent` is required and typed
  - `offset-frame.tsx` — an offset accent *outline* plate behind a block (never a fill), and the `⌥`-duplicate build target
  - `highlight-card.tsx` — accent-bordered elevated callout with a `▸` marker
  - `card` chrome lives in `ui/card.tsx` as `CardChrome` (three 2px marks + a path label)
- `src/lib/accents.ts` — the `Accent` union (`phosphor | cyan | warn | danger`) plus `ACCENT_TEXT` / `ACCENT_BG` / `ACCENT_BORDER` lookup objects and `SECTION_ACCENT`. Tailwind v4's scanner cannot see `bg-${x}` interpolation, so **never build these by concatenation** — add to the lookup objects
- Path alias `@/*` → `src/*`; `cn()` from `src/lib/utils.ts` merges clashing Tailwind classes

## The project list is generated

`Projects.tsx` does not hold a project array. It maps `REPOS` from `src/lib/projects.generated.ts`, which `npm run sync:projects` (`scripts/sync-projects.mjs`) writes from `GET /users/x0r909/repos`. The site is a static export, so it cannot call GitHub at runtime — the snapshot is committed and the build reads it.

- **Do not hand-edit `projects.generated.ts`.** Re-run the sync instead; a manual edit is overwritten.
- Adding a repo to the account is enough — exclude it in the script's `EXCLUDE` set if it is not portfolio work (the profile README repo, `test-envirment-setup`, and this site are already excluded).
- Derived, never invented: `status` is `ARCHIVED` / `DORMANT` (>6 months since push) / `ONLINE`; `stack` is GitHub's `topics`, falling back to `language`; the date is `pushedAt`. A repo with no description on GitHub renders without one — do not add placeholder prose.
- The list is sorted newest-pushed-first by the script; index 0 is the featured card.

**Skills carries no metrics.** The section lists tool names only — no percentages, no bars. A proficiency number is unverifiable and a bar makes it look measured; do not reintroduce `skill-bar__fill` or a `level` field.

## The live build (`build-live.tsx`)

The page builds itself as you scroll. **There is no overlay standing in for the site**: real elements carry a `data-build` attribute, and `BuildLive` constructs them in place — a short fade plus an 8px rise, driven by the element's own CSS. Nothing is drawn over the page. Adding `data-build` to an element is all it takes to bring it into the animation.

Four invariants hold it together:

- **Arming is opt-in and pre-paint.** `layout.tsx` ships an inline `<head>` script that sets `<html data-build="on">` only when the visitor has not asked for reduced motion and is not on a coarse pointer. All hiding is scoped to `html[data-build="on"]`, so with no JS (or reduced motion) the page is complete and static. The script also arms a watchdog; `build-live.tsx` clears it before its early return, or a bundle that never loads would leave the page hidden with nothing to reveal it.
- **Hiding is deliberately narrow.** The `pre` observer (`rootMargin` one viewport ahead) queues a target while it is still off-screen; the `build` observer animates it on arrival. Anything further away keeps no state and stays visible, selectable, in find-in-page and in the accessibility tree.
- **Above-fold targets are started directly, not observed.** `BUILD_MARGIN` is `0px 0px -25% 0px`, so the `build` observer only fires a quarter-screen above the bottom edge. A target sitting in that bottom quarter of the first viewport would receive `queued` at boot and then never fire, staying invisible until the visitor scrolled. `build-live.tsx` collects everything already on screen into an `aboveFold` set and hands each one to `start()` explicitly *after* both observers are wired, so the two paths can't race (`start` is a no-op once an element is `done`).
- **`done` matches no CSS rule.** The build animation uses `animation-fill-mode: backwards`, so a settled element holds nothing and the site's single `hover-glow` rule still owns hover. Do not switch that to `both` — a transform end-state would outrank `:hover` forever.

Two traps in the CSS half of the build, both already paid for once:

- **`.build-type`'s caret rule must be compound, not descendant.** The element with `class="build-type"` *is* the `data-build` element (`Hero.tsx`), so `[data-build-state="building"] .build-type::after` looks for a `.build-type` inside itself and never matches. Write `[data-build-state="building"].build-type::after`. By contrast the `⌥`-duplicate rule legitimately uses a descendant selector, because the plate is a child of the animated element.
- **A gated pseudo-element cannot outlive its gate.** `build-in` is 300 ms and settles the element to `done`, which is the instant the caret's gate closes. `build-caret` therefore has to run 300 ms and hold nothing at either end — a longer animation, or any hold at `translateX(-100%)`, parks the caret off-screen for its whole life and it is never seen.

The same rule applies to `.boot-line`: its stagger is gated on `html[data-boot="on"]`, because the attribute lands in an effect and an ungated `animation-delay` would already be part-way through by then.

## Styling

- Tailwind v4 is CSS-first: every token lives in `src/app/globals.css` (`@theme inline` + `:root`). There is **no** `tailwind.config.*` — new tokens go in the CSS
- **Retro-cyber terminal system**, not light/dark: `--bg #0a0e0a`, `--fg #c8f7c8`, `--accent #39ff14`. `--radius: 0` (2px only for the three title-bar marks); 1px `--border`; **shadow is glow, never a drop shadow**
- **`--shadow-*` resolve to `--glow-*`, not to `--border` directly.** The raw glow values are named `--glow-2xs` … `--glow-2xl` because `@theme inline` binds `--shadow-*` to them and a custom property cannot reference itself. Never redefine `--shadow-*` in `:root`
- **Themes are phosphor variants, not modes.** `next-themes` with `attribute="data-theme"`, `themes={["green","amber","blue"]}`, `enableSystem={false}`, `storageKey="phosphor"`. `:root` with no attribute is green. `--accent-2` stays cyan in all three — it is the focus/highlight colour and must not compete with the accent. Anything new that uses colour must survive all three variants, so key off `--accent`, never a hardcoded hex
- **One interaction rule**: `hover-glow` — border traces to `--accent` and a glow appears. Do not introduce a competing hover (lift, press-down, shadow-shrink). Project cards additionally take `glitch-hover`
- **Section rhythm**: Hero plain → About band → Skills plain → Projects band → Terminal plain → Certs plain → Contact band. A band is `<Section banded>`
- **All motion uses `steps()`**, never cubic-bezier. Reveals, bars, carets, flicker and the nav prefix are all stepped
- Custom utilities worth reusing: `section-container`, `hover-glow`, `phosphor`, `chroma-hover`, `rule-dotted`
- Headings get `font-display` (VT323) automatically from a base-layer rule, **except** that the `.font-display` utility must be re-declared in `@layer utilities` — a bare class on an element needs it. Copy on the site is Indonesian (`<html lang="id">`), so match that tone for user-facing text

## The overlay stack

Order matters; all of them are `pointer-events: none` and `aria-hidden`:

| Layer | z-index | Job |
| --- | --- | --- |
| `Navbar` | 30 | sticky, above every overlay but the CRT |
| `CrtOverlay` | 40 | scanlines, vignette, 3.5% noise, 7s flicker — above everything but the build and boot |
| `MatrixRain` | 55 | `sudo` / Konami easter egg, 3s, mounted only while running |
| `BuildLive` | 60 | the live build's driver — renders nothing, only sets `data-build-state` |
| `BootScreen` | 80 | BIOS log, once per session, gated by `html[data-boot]` |

The page draws **no cursors of its own** (DESIGN.md §6): an earlier swarm component and the build layer's per-collaborator arrows were both removed. The only pointer is the visitor's; the only caret is the browser's, tinted to `--accent` by one base-layer rule.

`BootScreen` holds **no component state**: visibility is entirely the `data-boot` attribute, which also keeps it out of the accessibility tree when not booting. Do not add a `useState` flag back — it forces a synchronous `setState` in an effect, which `react-hooks/set-state-in-effect` rejects.

`MatrixRain` returns `null` unless active, so it mounts its canvas only for the 3 s run and unmounts after — no idle rAF loop. Two triggers, one path: the terminal's `sudo` command dispatches `MATRIX_EVENT` (from `src/lib/matrix.ts`) and the Konami sequence is listened for in the component, so the whole trigger surface lives in one place.

## Motion inventory

`DESIGN.md` §7 is the table. The CSS lives at the end of `globals.css`, **unlayered on purpose**: Tailwind v4 emits `@layer theme, base, components, utilities`, and a layered rule loses to utility classes on the same element. Unlayered rules beat every layer without `!important`.

## Build / Deploy

- CI (`.github/workflows/ci.yml`): the `quality` job (`npm ci --ignore-scripts` → prod-dependency audit → lint → `tsc --noEmit` → `next build` → uploads `out/`) runs on every branch push, PRs, and `v*` tags; the `docker` job (CD) pushes `ghcr.io/x0r909/portofolio` on `main` (→ `latest`) and `staging` (→ `staging`), then scans the pushed digest with Trivy, writes an SPDX SBOM, signs it with keyless cosign, and attests provenance. **All actions are SHA-pinned**, and every job declares only the `permissions:` it needs — add a comment with the version when bumping a pin, and let `.github/dependabot.yml` do the bumping
- Security workflows: `codeql.yml` (CodeQL `security-extended`, `main`/`staging` + PRs + weekly) and `security.yml` (Dependency Review on PRs, gitleaks secret scan — pushed range per push, full history on the weekly cron; `fetch-depth: 0` is what makes the latter possible, Trivy fs scan for vulns/misconfig/secrets → SARIF, weekly). Both need GitHub Advanced Security, which is free on this public repo
- Dockerfile: node:24-alpine builds → nginx:1.31-alpine serves `out/` on :3000 using `nginx.conf` (gzip, security headers, 30d asset cache, SPA fallback). Both base images are pinned **tag + digest**; the nginx stage runs `apk upgrade --no-cache` because the published tag lags Alpine's advisories by weeks, and it runs as the unprivileged `nginx` user (`USER nginx`) — preserve both when editing
- `docker-compose.yml` pulls `ghcr.io/x0r909/portfolio-augie:latest` and maps `${APP_PORT:-3000}:3000`. **That image name is wrong** — CI publishes `ghcr.io/x0r909/portofolio` (the repo name, lowercased), so pulling compose as written fails. Renaming a published package is a deployment decision, so the name was left alone when the pipeline was hardened; either fix compose or republish under `portfolio-augie`
- `setup-prod.sh` is broken — it runs `pm2 start ecosystem.config.js`, and no `ecosystem.config.js` exists in the repo. Prefer the Docker path

## Contact form and the duplicated address

`Contact.tsx` has no submission endpoint: it builds a `mailto:` URL from the form fields and sets `window.location.href`. Keep it that way unless a real backend is added — the static export cannot run server actions or API routes.

The contact details (email, GitHub, LinkedIn) are duplicated: `Contact.tsx` (`contactLinks`), `Footer.tsx` (`socialLinks`), `terminal.tsx` (`CONTACT`), and `layout.tsx` (JSON-LD `email` / `sameAs`). Changing one requires changing all four; there is no shared constant.

## The terminal (`terminal.tsx`)

The one genuinely stateful piece. It is a real input — Enter runs, arrows walk history, Tab completes from `COMPLETIONS`, Ctrl/Cmd+L clears — and every command has a real effect (scroll, theme swap, mail link). Nothing is printed fake. A11y: `role="application"`, a real `<input>` with a label, and an `sr-only` `aria-live="polite"` mirror of the last line. The command *set* is the contract: adding one means adding it to `COMPLETIONS` and to `HELP`.