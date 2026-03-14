import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-sm",
  {
    variants: {
      variant: {
        default: "border-[#00ff41]/22 bg-[#00ff41]/[0.06] text-[#00ff41]/80",
        glow: "border-[#00ff41]/55 bg-[#00ff41]/12 text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.35)]",
        outline: "border-[#00ff41]/22 text-[#00ff41]/65 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
