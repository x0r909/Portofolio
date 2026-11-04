import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HighlightCardProps = {
  title?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A callout that reads as a highlighted terminal line.
 *
 * The old version was a solid yellow card. The CRT system has no solid fills
 * for panels, so this keeps the accent border and raises the ground one step.
 * The marker is a prompt glyph rather than a color bar, so the "this is worth
 * reading" signal is carried by the accent outline, not decoration.
 */
export function HighlightCard({ title, className, children }: HighlightCardProps) {
  return (
    <div
      className={cn(
        "border border-[var(--accent)] bg-[var(--bg-elev)] p-4 shadow-[0_0_18px_var(--accent-glow-soft)] sm:p-5",
        className
      )}
      data-build=""
    >
      {title ? (
        <p className="mb-3 flex items-center gap-2 font-mono text-xs text-[var(--accent)]">
          <span aria-hidden="true">▸</span>
          {title}
        </p>
      ) : null}
      <div className="text-sm text-foreground/90">{children}</div>
    </div>
  );
}