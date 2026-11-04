import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Status badges, in the spec's bracket form: `[ONLINE]`.
 *
 * Color alone never carries meaning here — the `bracket` prop renders literal
 * `[ ]` around the label and the label itself is a real word, which satisfies
 * DESIGN.md §8 ("jangan sampaikan informasi hanya lewat warna").
 */
const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[2px] border px-1.5 py-0.5 font-mono text-2xs whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        default: "border-[var(--accent)] bg-transparent text-[var(--accent)]",
        cyan: "border-[var(--accent-2)] bg-transparent text-[var(--accent-2)]",
        warn: "border-[var(--warn)] bg-transparent text-[var(--warn)]",
        dim: "border-border bg-transparent text-muted-foreground",
        solid: "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]",
        outline: "border-border bg-transparent text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  bracket = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    /** Wrap the label in literal `[ ]`, as the design spec writes statuses. */
    bracket?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {bracket ? (
        <>
          <span aria-hidden="true">[</span>
          {children}
          <span aria-hidden="true">]</span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Badge, badgeVariants }