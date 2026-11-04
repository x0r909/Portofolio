/**
 * The CRT stack: scanlines, vignette, noise floor and a shallow flicker.
 *
 * One fixed, `pointer-events: none`, `aria-hidden` layer. Everything is
 * declared in `globals.css` so the effect can be switched off wholesale under
 * `prefers-reduced-motion` without touching this markup.
 *
 * There is no light/dark variant: the overlay is part of the identity, not a
 * theme option. It sits at z-40 — above the page, below the build layer (60)
 * and the boot screen (80), so traces and boot text stay clean.
 */
export function CrtOverlay() {
  return (
    <div aria-hidden="true" className="crt-overlay crt-scanlines crt-flicker">
      <div className="crt-noise" />
    </div>
  );
}