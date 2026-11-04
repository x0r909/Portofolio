import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  /**
   * Raises the section onto `--bg-elev`. Used sparingly to separate the two
   * halves of the page; the CRT ground is otherwise continuous, the way one
   * terminal session scrolls without changing paper.
   */
  banded?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({ id, banded, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-t border-dashed border-border/60",
        banded && "bg-[var(--bg-elev)]/40"
      )}
    >
      <div className={cn("section-container", className)}>{children}</div>
    </section>
  );
}