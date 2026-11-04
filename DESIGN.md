# DESIGN.md — x0r909 Portfolio

The reference for this site's visual system. Everything in `src/app/globals.css`
and `src/components/` derives from this document; when they disagree, this file
and the CSS are the sources of truth and the components are wrong.

## 1. Concept

`x0r909@portfolio:~$ whoami`

A retro-cyber terminal: the page is a shell session on a CRT, and the visitor
scrolls through the output of a handful of commands. The signature animation is
a **live page build** — each element constructs itself in place as it reaches
the viewport, and nothing is ever drawn over it.

**No fake cursors.** The page does not draw its own pointer anywhere: the only
cursor on screen is the visitor's real one, plus the browser's own caret in text
fields. An earlier swarm-of-cursors effect and the build layer's per-collaborator
arrows were both removed for this reason.

This is an aesthetic commitment, not a light/dark scheme. There is no light
mode. The theme switcher swaps the **phosphor colour** (green → amber → blue);
it never inverts the page.

## 2. Tokens

All of these live in `:root` in `src/app/globals.css`, with the shadcn bridge
right beneath them. There is no `tailwind.config.*` — Tailwind v4 is CSS-first.

| Token | Value | Job |
| --- | --- | --- |
| `--bg` | `#0a0e0a` | page ground |
| `--bg-elev` | `#101710` | raised ground (bands, card bodies, title bars) |
| `--border` | `#1f3a1f` | every 1px rule |
| `--fg` | `#c8f7c8` | body text |
| `--fg-dim` | `#6b8f6b` | secondary text, meta |
| `--accent` | `#39ff14` | phosphor — the one accent |
| `--accent-2` | `#00e5ff` | cyan — focus ring, highlights |
| `--warn` | `#ffb000` | warning / in-progress |
| `--danger` | `#ff3b5c` | error / destructive |
| `--selection` | `#39ff1433` | text selection |

`--accent-glow` (`#39ff1440`) and `--accent-glow-soft` (`#39ff141f`) are derived
from the accent, so a theme swap drags the glow along with it.

### Phosphor variants

Set on `<html data-theme>`; only the accent family moves.

```css
:root[data-theme="amber"] { --accent: #ffb000; --accent-glow: #ffb00040; /* ... */ }
:root[data-theme="blue"]  { --accent: #00e5ff; --accent-glow: #00e5ff40; /* ... */ }
```

`:root` with **no** `data-theme` is green. `--accent-2` stays cyan in every
variant: it is the focus/highlight colour, and letting it drift would leave two
accents competing for the same job.

### Shadow scale is a glow scale

There are no drop shadows. `--glow-2xs` … `--glow-2xl` are `0 0 0 1px <border>`
plus an increasing accent bloom, bound into Tailwind as `--shadow-2xs` …
`--shadow-2xl`. The raw values are named `--glow-*` because `@theme inline`
binds `--shadow-*` to them and a CSS custom property cannot reference itself.

## 3. Type

- Display: **VT323** (`--font-display`) — headings only, never body copy; it
  falls apart below ~24px.
- Body and code: **JetBrains Mono** (`--font-mono`) — everything else. All
  monospace, by design.
- Both are single-subset (`latin`) with `font-display: swap`.
- Scale: 12 / 14 / 16 / 20 / 28 / 40 / 64. Body `line-height: 1.6`; headings
  `1.1`.

## 4. Shape

- 4px grid: 4, 8, 12, 16, 24, 32, 48, 64.
- **`--radius: 0`.** `2px` is reserved for the three title-bar status marks.
- 1px `--border` rules, never 2px.
- A panel that is active or focused takes `--accent`.
- Elevation is glow: `box-shadow: 0 0 0 1px var(--accent), 0 0 12px <glow>`.

## 5. The build

One motion system carries the site. It is opt-in and respects
`prefers-reduced-motion`.

### 5a. The live page build (`build-live.tsx`)

The page constructs itself as it scrolls. Real elements carry `data-build`, and
`BuildLive` animates them in place — a short fade plus an 8px rise. Nothing is
drawn over them: no overlay, no trace, no measurement chip, no cursor.

The invariants (documented in full in `CLAUDE.md`):

- Arming is pre-paint and opt-in via an inline `<head>` script, so no-JS is a
  complete static page.
- Hiding is narrow: only queued/building elements are hidden, and only one
  viewport ahead.
- Above-fold targets go straight to `start()`; the `-25%` build margin never
  fires for them.
- `done` matches no CSS rule and the reveal uses `fill-mode: backwards`, so the
  settled element holds nothing and hover still works.

### 5b. Section reveals

Fade plus `translateY(8px)`, 300ms, `steps(6)`. Pixel steps, not curves — the
reveal should land in visible increments like a terminal painting a line.

## 6. Cursors

There is exactly one pointer on the page: the visitor's own. Nothing in the
design draws a second one.

- The OS cursor is never hidden or replaced.
- The browser's text caret is the only insert-point indicator. It is tinted to
  `--accent` on every text-entry surface by one base-layer rule in
  `globals.css`, so the terminal input and the contact form agree.
- Anything that looks interactive must *be* interactive — `hover-glow` is on
  cards because cards are a hover target by design, but no non-interactive
  element may fake a control's hover or cursor state.

## 7. Motion vocabulary

**Everything uses `steps()`** — no cubic-bezier anywhere on the site.

| Effect | Spec |
| --- | --- |
| Boot screen | BIOS log, ~1.8s, skippable; once per session (`sessionStorage["booted"]`) |
| Hero typewriter | 6 chars × 40ms, block caret `caret-blink` |
| Section reveal | fade + `translateY(8px)`, 300ms, `steps(6)` |
| Nav prefix | `>` grows from 0 width, 120ms, `steps(2)` |
| Card hover | accent border + glow (`hover-glow`), 200ms |
| Card glitch | one 150ms `steps(2)` translate on hover |
| CRT flicker | 0.97 → 1, 7s, `steps(1)` |
| Matrix rain | `sudo` command or the Konami sequence, 3s, own canvas, off under reduced motion |

## 8. Page flow

`[BOOT] → [HERO] → [ABOUT] → [SKILLS] → [PROJECTS] → [TERMINAL] → [CERTS] → [CONTACT]`

- **Hero** — `$ whoami` typed, `Augie Aristito / Sudiarto` in VT323 with the
  surname in accent, three bracketed badges, CTAs `[ view_projects ]`,
  `[ download_cv ]`, `[ contact_me ]`, and an avatar window card.
- **About** — `cat about.txt`: identity window, Teknostudio window,
  `philosophy.log` callout.
- **Skills** — `ls -la /skills`: four category windows (Security, Backend,
  Infra/Linux, AI/ML), each a plain list of tool names. **No proficiency
  numbers and no bars**: a percentage of a skill is not a fact, and a bar makes
  an arbitrary claim look measured.
- **Projects** — `gh repo list x0r909`: one featured window plus a two-column
  grid, built from `src/lib/projects.generated.ts` (a `npm run sync:projects`
  snapshot of the GitHub account); `● ● ●` title bar, stack badges, status
  badge, `[repo]`.
- **Terminal** — a real interactive shell: `help`, `about`, `projects`,
  `skills`, `contact`, `theme <x>`, `cv`, `clear`, with history and Tab
  completion.
- **Certifications** — `ls ~/certs`: a single window listing eleven certificates
  with `[download]` links, plus the CV callout.
- **Contact** — `ssh augie@x0r909.dev`: an `ssh`-style link list and a form that
  composes a `mailto:`.

## 9. Components

- **Window card** — `Card` + `CardChrome`. Title bar of three 2px marks plus a
  path label, 1px border, `--bg-elev` body. Hover: accent border + glow.
- **Button** — bracket text, transparent fill with accent border; hover fills
  solid accent with `--bg` text; `focus-visible` is a 2px `--accent-2` outline
  at 2px offset.
- **Badge** — `[ONLINE]` / `[WIP]` / `[ARCHIVED]` / `[PLANNING]`. The word is
  always present; colour is redundant, never the only signal.
- **Link** — dotted underline that turns solid and glows on hover.

## 10. Responsive

- ≥1024px: full layout, 3-column grids where the content has three.
- 640–1023px: two columns.
- <640px: one column, `[ ≡ ]` menu, reduced CRT.
- No horizontal scroll at any width; 16px side gutters.

## 11. Accessibility

- Contrast ≥7:1 for body text against its ground.
- Reduced motion kills the build layer, the flicker, the glitch, the typewriter
  and the boot screen — via the blanket block at the end of `globals.css`.
- Visible focus ring, never removed: 2px `--accent-2`, 2px offset.
- Every CRT/boot/build overlay is `aria-hidden` and `pointer-events: none`.
- The terminal is `role="application"` with a real `<input>`, a label, and an
  `aria-live="polite"` mirror of the last output line.
- Never colour-only meaning: status is a word, the "active" state is a border.
  Skill rows carry no score at all, so there is nothing to encode by colour.

## 12. Performance

- `font-display: swap`, latin subset only.
- One canvas, one rAF loop; no animation library.
- Targets: LCP < 2.0s, CLS < 0.05, JS < 150KB gzip.
- The static export ships no server runtime, so nothing may depend on one.

## 13. Stack

Next.js 16 App Router with `output: "export"`, React 19, TypeScript 6 strict,
Tailwind CSS v4, shadcn primitives (patched, not vendored wholesale),
next-themes, `lucide-react` for the few glyphs that survive.
