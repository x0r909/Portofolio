import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The terminal "window" — the site's only card shape.
 *
 * Structure per DESIGN.md §9: a title bar with three status marks, then the
 * body. `CardTitle` is rendered inside the title bar by `WindowCard`; the raw
 * primitives below stay available for callers that need a plain panel.
 *
 * Every card is a live-build target: it is constructed in place as it reaches
 * the viewport (see `build-live.tsx`). A caller that needs to opt out can pass
 * `data-build={undefined}`.
 */
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-build=""
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden border border-border bg-card py-(--card-spacing) font-mono text-sm text-card-foreground [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        className
      )}
      {...props}
    />
  )
}

/** The three-dot title bar. */
function CardChrome({
  className,
  label,
  ...props
}: React.ComponentProps<"div"> & { label?: React.ReactNode }) {
  return (
    <div
      data-slot="card-chrome"
      className={cn(
        "flex items-center gap-2 border-b border-border bg-[var(--bg-elev)] px-3 py-1.5",
        className
      )}
      {...props}
    >
      <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
        <span className="size-2 rounded-[2px] bg-destructive" />
        <span className="size-2 rounded-[2px] bg-warn" />
        <span className="size-2 rounded-[2px] bg-phosphor" />
      </div>
      {label ? (
        <span className="min-w-0 truncate text-2xs text-muted-foreground">
          {label}
        </span>
      ) : null}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-snug font-normal text-foreground group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-xs leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t border-border p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardChrome,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}