/**
 * The matrix-rain easter egg's only shared surface.
 *
 * Kept out of the component so the terminal can fire it without importing a
 * client component, and so the event name exists exactly once. The event
 * carries no payload: the rain is decoration, and nothing depends on who
 * asked for it.
 */
export const MATRIX_EVENT = "matrix:rain";

export function triggerMatrix() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(MATRIX_EVENT));
}
