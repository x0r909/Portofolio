"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Navbar — a sticky prompt bar.
 *
 * Links carry `.nav-link`, whose `::before` is a `>` that grows from zero width
 * on hover/focus over 120ms in two steps (see globals.css). That prefix is the
 * site's one nav affordance: no underline, no pill, no active background.
 *
 * Below `md` the links collapse into a `[ ≡ ]` toggle. The menu keeps the same
 * session's shell vocabulary and closes on navigation.
 */

const navLinks = [
  { href: "#home", label: "home" },
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#terminal", label: "terminal" },
  { href: "#certifications", label: "certs" },
  { href: "#contact", label: "contact" },
] as const;

const linkClass =
  "nav-link font-mono text-xs text-muted-foreground no-underline transition-colors duration-150 hover:text-[var(--accent)] focus-visible:text-[var(--accent)] sm:text-sm";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-[var(--bg)]/95 backdrop-blur-[2px]">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5 md:px-8"
        aria-label="Utama"
      >
        <a
          href="#home"
          className="font-mono text-xs text-foreground no-underline sm:text-sm"
        >
          <span className="text-[var(--accent)]">x0r909</span>
          <span className="text-muted-foreground">@portfolio</span>
          <span className="text-muted-foreground">:~$</span>
        </a>

        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            [ ≡ ]
          </Button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-[var(--bg-elev)] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(linkClass, "py-1.5 text-sm")}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}