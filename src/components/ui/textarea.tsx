import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full border border-border bg-transparent px-2.5 py-2 font-mono text-sm text-foreground transition-colors outline-none",
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

export { Textarea }