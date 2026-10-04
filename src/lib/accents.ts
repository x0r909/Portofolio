/**
 * The pastel accent palette. Literal class strings, not a builder — Tailwind v4
 * scans source text, so an interpolated `bg-${name}` would never be emitted.
 */
export type Accent =
  | "bg-retro-yellow"
  | "bg-retro-orange"
  | "bg-retro-blue"
  | "bg-retro-pink"
  | "bg-retro-green"
  | "bg-retro-lavender";

/**
 * One accent per section, fixed. Keeps adjacent sections from colliding and
 * makes the assignment a single reviewable place rather than a per-file choice.
 */
export const SECTION_ACCENT = {
  about: "bg-retro-lavender",
  skills: "bg-retro-blue",
  projects: "bg-retro-orange",
  certifications: "bg-retro-green",
  contact: "bg-retro-pink",
} as const satisfies Record<string, Accent>;