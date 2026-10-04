import type { ReactNode } from "react";
import type { Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

const OFFSETS = {
  sm: "-bottom-2 -right-2",
  md: "-bottom-3 -right-3",
  lg: "-bottom-4 -right-4",
} as const;

type OffsetFrameProps = {
  accent: Accent;
  offset?: keyof typeof OFFSETS;
  className?: string;
  children: ReactNode;
};

/** A framed block with a solid color plate offset behind it. */
export function OffsetFrame({
  accent,
  offset = "md",
  className,
  children,
}: OffsetFrameProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <div
        aria-hidden
        className={cn(
          "absolute -z-10 h-full w-full border-2 border-border",
          accent,
          OFFSETS[offset]
        )}
      />
    </div>
  );
}