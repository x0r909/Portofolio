import { Badge } from "@/components/ui/badge";
import type { Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  accent: Accent;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  accent,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", className)}>
      <Badge className={cn("mb-3", accent, "text-primary-foreground")}>
        {eyebrow}
      </Badge>
      <h2 className="font-head text-3xl md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}