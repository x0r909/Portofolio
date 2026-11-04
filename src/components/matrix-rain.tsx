"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MATRIX_EVENT } from "@/lib/matrix";

/**
 * The `sudo` / Konami easter egg: three seconds of falling glyphs.
 *
 * DECORATION ONLY. It is `aria-hidden`, `pointer-events: none`, and it never
 * appears under reduced motion. It draws on its own canvas and tears the whole
 * thing down when the run ends, so there is no idle rAF loop sitting on the
 * page.
 *
 * Two ways in, one path: the terminal fires `MATRIX_EVENT` (see
 * `src/lib/matrix.ts`) and the Konami listener below lives here, so the
 * component is mounted exactly once and owns the whole trigger surface.
 */

const DURATION_MS = 3000;
const COLUMN_WIDTH = 14;
const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789#$%&*+<>=";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function MatrixRain() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fire = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive(true);
  }, []);

  // Triggers: the terminal's `sudo` event, plus the Konami sequence.
  useEffect(() => {
    const onMatrix = () => fire();
    window.addEventListener(MATRIX_EVENT, onMatrix);

    let position = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === KONAMI[position] ? position + 1 : 0;
      if (position === KONAMI.length) {
        position = 0;
        fire();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener(MATRIX_EVENT, onMatrix);
      window.removeEventListener("keydown", onKey);
    };
  }, [fire]);

  // One run, then tear down. `active` flips false on a timer so the canvas
  // unmounts rather than lingering invisible.
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue("--accent").trim() || "#39ff14";
    // Canvas cannot resolve a var() inside a font shorthand, so the family has
    // to be read out of the computed style first.
    const family = root.getPropertyValue("--font-mono").trim() || "monospace";

    let width = 0;
    let height = 0;
    let dpr = 1;
    let columns: number[] = [];
    let raf = 0;
    let stopped = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Restart the columns on resize; a half-rained field would show a seam.
      columns = Array.from({ length: Math.ceil(width / COLUMN_WIDTH) }, () =>
        Math.floor((Math.random() * height) / COLUMN_WIDTH)
      );
    };
    resize();

    const started = performance.now();

    const frame = (now: number) => {
      if (stopped) return;

      // Trail, not clear: the dimming rectangle is what leaves glyph tails.
      ctx.fillStyle = "rgba(10, 14, 10, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.font = `${COLUMN_WIDTH}px ${family}`;

      for (let i = 0; i < columns.length; i += 1) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillText(glyph, i * COLUMN_WIDTH, columns[i] * COLUMN_WIDTH);

        // Occasional reset keeps the rain from ending in one flat wall.
        if (Math.random() > 0.975) {
          columns[i] = 0;
        } else {
          columns[i] += 1;
        }
      }

      if (now - started >= DURATION_MS) {
        setActive(false);
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => resize();
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(frame);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);

  if (!active) return null;

  return <canvas ref={canvasRef} aria-hidden="true" className="matrix-rain" />;
}