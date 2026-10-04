import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type HighlightCardProps = {
  title?: string;
  className?: string;
  children: ReactNode;
};

/** The yellow callout card. `text-primary-foreground` keeps it legible in both themes. */
export function HighlightCard({ title, className, children }: HighlightCardProps) {
  return (
    <Card className={cn("bg-retro-yellow text-primary-foreground", className)}>
      {title ? (
        <CardHeader>
          <CardTitle className="font-head text-xl">{title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent>{children}</CardContent>
    </Card>
  );
}