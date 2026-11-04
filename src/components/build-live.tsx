"use client";

import { useEffect } from "react";

/**
 * The live page build.
 *
 * The page constructs itself as it is scrolled: real elements carry
 * `data-build`, and this component marks them `building` in place so their own
 * CSS reveal runs. There is no stand-in overlay, and nothing is drawn on top of
 * the page — no cursor, no crosshair, no measurement chip.
 *
 * ARMING. `layout.tsx` ships an inline <head> script that sets
 * `<html data-build="on">` before first paint, and only when the visitor has
 * not asked for reduced motion and is not on a coarse pointer. No attribute
 * means no hiding anywhere: without JS the page is complete and static, which
 * is the only safe default.
 *
 * TWO OBSERVERS. Hiding the whole document until it is scrolled to would pull
 * it out of the accessibility tree and out of find-in-page, so the hidden
 * state is deliberately narrow:
 *
 *   pre    — rootMargin extended one viewport below. When a target gets within
 *            a screen of the viewport it is marked `queued` and hidden while
 *            still off-screen, so nothing visibly pops out.
 *   build  — normal margin. When the target actually arrives it is marked
 *            `building` and animates in.
 *
 * Anything further away keeps no state at all — visible, selectable, findable
 * and screen-readable.
 *
 * `done` matches no CSS rule, so a finished element returns to its own
 * classes. That is what keeps the single `hover-glow` rule intact: the build
 * animation uses `animation-fill-mode: backwards`, so once it ends it holds
 * nothing and the element's own hover transforms work normally.
 */

declare global {
  interface Window {
    __buildWatchdog?: number;
  }
}

const STATE = "data-build-state";
const PRE_MARGIN = "0px 0px 100% 0px";
/**
 * The build fires once the target is a quarter of a screen into the viewport,
 * not the instant its top edge clears the fold, so a target straddling the
 * bottom edge is not revealed half-visible.
 */
const BUILD_MARGIN = "0px 0px -25% 0px";
const MAX_STAGGER = 7;
const STAGGER_MS = 70;
/** The reveal is 300ms; this is the backstop when `animationend` never fires. */
const WATCHDOG_MS = 1200;

export function BuildLive() {
  useEffect(() => {
    const root = document.documentElement;

    // The inline script arms a watchdog in case this bundle never loads. If it
    // already fired, every target was released and re-arming here would hide
    // the page with nothing left to reveal it, so stand down before any work.
    window.clearTimeout(window.__buildWatchdog);
    if (root.getAttribute("data-build") !== "on") return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-build]")
    );
    if (targets.length === 0) {
      root.removeAttribute("data-build");
      return;
    }

    // Anything already on screen is hidden the instant this runs, then built a
    // moment later. Without this the above-fold targets paint, vanish, and
    // fade back in — a visible flash. The build observer fires a quarter of a
    // screen in (BUILD_MARGIN), which is below where these already sit, so
    // every above-fold target is handed straight to `start` further down
    // rather than being left queued and invisible until the visitor scrolls.
    const viewport = window.innerHeight;
    const aboveFold = new Set<HTMLElement>();
    for (const el of targets) {
      if (
        el.getAttribute(STATE) === null &&
        el.getBoundingClientRect().top < viewport
      ) {
        el.setAttribute(STATE, "queued");
        aboveFold.add(el);
      }
    }

    // Stagger within the enclosing section so a row of cards cascades rather
    // than arriving as one block.
    for (const el of targets) {
      const scope = el.closest("section") ?? document.body;
      const peers = Array.from(scope.querySelectorAll("[data-build]"));
      const index = Math.max(0, peers.indexOf(el));
      el.style.setProperty(
        "--build-delay",
        `${Math.min(index, MAX_STAGGER) * STAGGER_MS}ms`
      );
    }

    const timers = new Set<number>();

    const start = (el: HTMLElement) => {
      if (el.getAttribute(STATE) === "done") return;

      el.setAttribute(STATE, "building");

      const settle = () => el.setAttribute(STATE, "done");

      // `animationend` bubbles from pseudo-elements too, which is fine: the
      // caret and the element finish together.
      el.addEventListener("animationend", settle, { once: true });

      // A build that never fires animationend — an animation suppressed by a
      // later preference change, a browser quirk — must still settle, or the
      // element stays at opacity 0.
      timers.add(window.setTimeout(settle, WATCHDOG_MS));
    };

    // Hide just ahead of arrival, while the target is still off-screen.
    const pre = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          pre.unobserve(el);
          if (el.getAttribute(STATE) === null) {
            el.setAttribute(STATE, "queued");
          }
        }
      },
      { rootMargin: PRE_MARGIN, threshold: 0 }
    );

    const build = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          build.unobserve(el);
          start(el);
        }
      },
      { rootMargin: BUILD_MARGIN, threshold: 0 }
    );

    for (const el of targets) {
      pre.observe(el);
      build.observe(el);
    }

    // Above-fold targets are already inside the build margin, so their
    // observer entry may never arrive. Build them directly, after the
    // observers are wired so the two paths cannot both fire for one element
    // (`start` is a no-op once an element is `done`).
    for (const el of aboveFold) start(el);

    // Nobody may tab into a queued element.
    const onFocus = (event: FocusEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-build]"
      );
      if (el) el.setAttribute(STATE, "done");
    };

    window.addEventListener("focusin", onFocus, true);

    return () => {
      pre.disconnect();
      build.disconnect();
      window.removeEventListener("focusin", onFocus, true);
      for (const timer of timers) window.clearTimeout(timer);
      // Hand back a complete page on unmount (route change, dev reload).
      for (const el of targets) el.setAttribute(STATE, "done");
    };
  }, []);

  return null;
}
