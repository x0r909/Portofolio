import type { ReactNode } from "react";
import type { Accent } from "@/lib/accents";
import { ACCENT_BORDER } from "@/lib/accents";
import { cn } from "@/lib/utils";

const OFFSETS = {
  sm: "-bottom-1 -right-1",
  md: "-bottom-1.5 -right-1.5",
  lg: "-bottom-2 -right-2",
} as const;

type OffsetFrameProps = {
  accent: Accent;
  offset?: keyof typeof OFFSETS;
  className?: string;
  children: ReactNode;
};

/**
 * A framed block with an offset accent border behind it.
 *
 * In the CRT system the plate is a bare 1px accent outline rather than a solid
 * fill: a filled plate reads as a card and competes with the window chrome,
 * while an offset outline reads as a marquee guide on the drawing surface —
 * which is exactly what it is during the build.
 */
export function OffsetFrame({
  accent,
  offset = "md",
  className,
  children,
}: OffsetFrameProps) {
  return (
    <div className={cn("relative", className)} data-build="">
      {children}
      <div
        aria-hidden
        /* The ⌥-drag duplicate: while the frame is being built, the plate
           slides out from under it and settles into its resting offset. */
        data-build-duplicate=""
        className={cn(
          "absolute -z-10 h-full w-full border",
          ACCENT_BORDER[accent],
          OFFSETS[offset]
        )}
      />
    </div>
  );
}