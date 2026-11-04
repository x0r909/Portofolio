"use client";

import { useEffect } from "react";

/**
 * The BIOS-style boot sequence.
 *
 * OPT-IN, TWICE OVER. The overlay is only *displayed* through
 * `html[data-boot="on"]` (see globals.css), and this component only sets that
 * attribute after reading the session marker — so a mount that decides not to
 * boot leaves no trace to flash. Under reduced motion or a coarse pointer it
 * returns before setting anything.
 *
 * NO COMPONENT STATE. Visibility lives entirely in the `data-boot` attribute,
 * which also means the markup is `display: none` — and therefore out of the
 * accessibility tree — for every visitor who is not booting. A `useState` flag
 * would duplicate that attribute for no gain and would have to be set
 * synchronously inside the effect.
 *
 * ONCE PER SESSION. `sessionStorage` holds the marker, so a reload mid-visit
 * goes straight to the hero. The marker is written before the animation runs,
 * not after: a visitor who closes the tab 400ms in has still seen it.
 *
 * SKIPPABLE. Click or any key ends it immediately. A boot sequence you cannot
 * escape is an accessibility problem, not a joke — and `prefers-reduced-motion`
 * skips it entirely (see the CSS block).
 */

const LINES = [
  { text: "x0r909 BIOS v2.6 — Retro Terminal", tone: "dim" },
  { text: "Memory test .................. 640K OK", tone: "dim" },
  { text: "Detecting phosphor ........... GREEN", tone: "dim" },
  { text: "Mounting /dev/portfolio ...... OK", tone: "ok" },
  { text: "Loading identity ............. OK", tone: "ok" },
  { text: "Starting x0r909@portfolio:~$ ", tone: "ok" },
] as const;

const LINE_MS = 220;
const TOTAL_MS = LINES.length * LINE_MS + 420;

const MARKER = "booted";

declare global {
  interface Window {
    __bootTimeout?: number;
  }
}

export function BootScreen() {
  useEffect(() => {
    const root = document.documentElement;

    // Never boot for someone who asked for less motion, or who has no pointer
    // to skip with.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let already = false;
    try {
      already = window.sessionStorage.getItem(MARKER) === "1";
    } catch {
      // Private mode or blocked storage: treat as a repeat visit rather than
      // showing the same intro on every navigation.
      already = true;
    }
    if (already) return;

    try {
      window.sessionStorage.setItem(MARKER, "1");
    } catch {
      /* nothing to do — the marker is a convenience, not a requirement */
    }

    root.setAttribute("data-boot", "on");

    const leave = () => {
      root.setAttribute("data-boot", "leaving");
      window.clearTimeout(window.__bootTimeout);
      window.__bootTimeout = window.setTimeout(() => {
        root.removeAttribute("data-boot");
      }, 340);
    };

    window.__bootTimeout = window.setTimeout(leave, TOTAL_MS);

    // Any input skips the rest of the sequence.
    const onKey = () => leave();
    window.addEventListener("keydown", onKey, { once: true });
    window.addEventListener("pointerdown", onKey, { once: true });

    return () => {
      window.clearTimeout(window.__bootTimeout);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onKey);
      root.removeAttribute("data-boot");
    };
  }, []);

  /* `aria-hidden` per DESIGN.md §8: the overlay is decoration, and its lines
     are pure atmosphere — nothing in them is needed to use the page. It is
     also `display: none` whenever `data-boot` is unset, so most visits never
     have it in the accessibility tree at all. */
  return (
    <div className="boot-screen" aria-hidden="true">
      <div className="mx-auto max-w-3xl">
        {LINES.map((line, i) => (
          <div
            key={line.text}
            className={line.tone === "ok" ? "boot-line boot-line--ok" : "boot-line"}
            style={{ animationDelay: `${i * LINE_MS}ms` }}
          >
            {line.text}
          </div>
        ))}
        <div className="boot-line mt-4 text-xs opacity-60" style={{ animationDelay: `${LINES.length * LINE_MS}ms` }}>
          [ tekan tombol apa saja untuk melewati ]
        </div>
      </div>
    </div>
  );
}