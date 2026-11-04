"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/**
 * The phosphor switch: green → amber → blue → green.
 *
 * A phosphor variant is a colour of light, not a light/dark mode, so the glyph
 * is the variant's own name rather than a sun or moon — those would describe a
 * brightness change the site does not have.
 *
 * Every variant's label is always rendered and CSS shows the right one for the
 * current `data-theme`, so server HTML and the client's first render are
 * identical. Branching on `resolvedTheme` during render would produce a
 * hydration mismatch — the value is known on the client but not during SSR.
 *
 * The accessible name describes the action, not the current variant, so it
 * needs no theme read either. Only the click handler reads theme, and it runs
 * after hydration.
 */

const ORDER = ["green", "amber", "blue"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const next = () => {
    const current = ORDER.indexOf((theme ?? "green") as (typeof ORDER)[number]);
    setTheme(ORDER[(current + 1) % ORDER.length]);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Ganti fosfor CRT"
      title="Ganti fosfor CRT"
      onClick={next}
    >
      {/* `:root` with no data-theme is the green default, so green is shown by
          default and only hidden once another variant is set. */}
      <span
        className="font-mono text-2xs [[data-theme='amber']_&]:hidden [[data-theme='blue']_&]:hidden"
        aria-hidden="true"
      >
        grn
      </span>
      <span
        className="hidden font-mono text-2xs text-warn [[data-theme='amber']_&]:inline"
        aria-hidden="true"
      >
        amb
      </span>
      <span
        className="hidden font-mono text-2xs text-cyan [[data-theme='blue']_&]:inline"
        aria-hidden="true"
      >
        blu
      </span>
    </Button>
  );
}
