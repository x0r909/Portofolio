import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Theme here is not light/dark — it is which phosphor the CRT is running.
 * next-themes still does the storage + attribute plumbing, so the variant
 * names are green / amber / blue and `attribute` targets `data-theme`.
 *
 * `defaultTheme="green"` rather than "system": the CRT look has no light
 * variant, so following the OS preference could only ever produce a page that
 * fights its own palette. `enableSystem` is off for the same reason.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="green"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="phosphor"
      themes={["green", "amber", "blue"]}
    >
      {children}
    </NextThemesProvider>
  );
}