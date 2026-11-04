import type { Accent } from "@/lib/accents";
import { ACCENT_TEXT, SECTION_ACCENT } from "@/lib/accents";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  /** The word shown after the prompt, kept for callers that want a plain label. */
  eyebrow: string;
  title: string;
  description?: string;
  accent: Accent;
  /**
   * The shell command this section is "the output of", e.g. `cat about.txt`.
   * This is the section's real header treatment — DESIGN.md §5b describes each
   * section as a command and its output, so the prompt line carries the label
   * and no decorative badge sits above the heading.
   */
  command?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  accent,
  command,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", className)} data-build="">
      <p className="mb-3 font-mono text-xs sm:text-sm">
        <span className="text-muted-foreground" aria-hidden="true">
          $
        </span>{" "}
        <span className={cn(ACCENT_TEXT[accent])}>
          {command ?? eyebrow.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </p>
      <h2 className="font-display text-3xl leading-none text-foreground md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { SECTION_ACCENT };