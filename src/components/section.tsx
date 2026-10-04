import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  /** Renders the alternating banded ground. Rhythm is set per section, not per page. */
  banded?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({ id, banded, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(banded && "border-y-2 border-border bg-muted/40")}
    >
      <div className={cn("section-container", className)}>{children}</div>
    </section>
  );
}