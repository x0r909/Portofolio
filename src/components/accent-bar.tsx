import type { Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

type AccentBarProps = {
  accent: Accent;
  className?: string;
};

/** The colored strip that marks a card. Purely decorative. */
export function AccentBar({ accent, className }: AccentBarProps) {
  return (
    <div
      aria-hidden
      className={cn("h-2 w-full border-2 border-border", accent, className)}
    />
  );
}