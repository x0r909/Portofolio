import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 border border-border bg-transparent px-2.5 py-1.5 font-mono text-sm text-foreground transition-colors outline-none",
        "placeholder:text-muted-foreground/60",
        "hover:border-[var(--accent)]/50",
        "focus-visible:border-[var(--accent)] focus-visible:shadow-[0_0_12px_var(--accent-glow-soft)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }