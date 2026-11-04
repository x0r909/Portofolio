/**
 * Section accents, as literal token names.
 *
 * Tailwind v4 scans source text, so `text-${x}` never emits a class. Keeping
 * the union to bare names and resolving through the lookup objects is the only
 * safe shape — never build these strings by concatenation.
 */
export type Accent = "phosphor" | "cyan" | "warn" | "danger";

/** Foreground accent, for labels and eyebrows. */
export const ACCENT_TEXT = {
  phosphor: "text-phosphor",
  cyan: "text-cyan",
  warn: "text-warn",
  danger: "text-destructive",
} as const satisfies Record<Accent, string>;

/** Fill accent, for strips and marks. */
export const ACCENT_BG = {
  phosphor: "bg-phosphor",
  cyan: "bg-cyan",
  warn: "bg-warn",
  danger: "bg-destructive",
} as const satisfies Record<Accent, string>;

/** Border accent, for window chrome and frames. */
export const ACCENT_BORDER = {
  phosphor: "border-phosphor",
  cyan: "border-cyan",
  warn: "border-warn",
  danger: "border-destructive",
} as const satisfies Record<Accent, string>;

/**
 * One accent per section, fixed. Keeps adjacent sections from colliding and
 * makes the assignment a single reviewable place rather than a per-file
 * choice.
 */
export const SECTION_ACCENT = {
  about: "cyan",
  skills: "phosphor",
  projects: "warn",
  certifications: "cyan",
  contact: "phosphor",
} as const satisfies Record<string, Accent>;