import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Terminal buttons.
 *
 * The default variant is the spec's `[ contact_me ]` form: transparent with an
 * accent border, filling solid accent on hover. The brackets are written into
 * the label by each caller rather than drawn here, so the visible text and the
 * accessible name stay identical.
 *
 * No shadows and no lift: this system's elevation language is glow, and the
 * only motion on a control is the phosphor brightening.
 */
const buttonVariants = cva(
  cn(
    "group/button relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-none whitespace-nowrap font-mono select-none",
    "transition-[color,background-color,border-color,box-shadow] duration-150",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-2)]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ),
  {
    variants: {
      variant: {
        default:
          "border border-[var(--accent)] bg-transparent text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:shadow-[0_0_14px_var(--accent-glow)]",
        secondary:
          "border border-border bg-[var(--bg-elev)] text-foreground hover:border-[var(--accent)] hover:text-[var(--accent)]",
        destructive:
          "border border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-[var(--bg)]",
        outline:
          "border border-border bg-transparent text-muted-foreground hover:border-[var(--accent-2)] hover:text-[var(--accent-2)]",
        ghost:
          "border border-transparent bg-transparent text-muted-foreground hover:border-border hover:text-foreground",
        link: "border-0 bg-transparent text-[var(--accent)] underline decoration-dotted underline-offset-4 hover:decoration-solid",
      },
      size: {
        default: "px-3 py-1.5 text-sm",
        xs: "px-2 py-0.5 text-2xs",
        sm: "px-2.5 py-1 text-xs",
        lg: "px-4 py-2 text-sm md:px-5 md:py-2.5 md:text-base",
        icon: "size-9 p-0",
        "icon-xs": "size-6 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }