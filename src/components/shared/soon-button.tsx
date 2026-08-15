import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A button for a feature that isn't wired up yet (needs an external service
 * such as payments, live market data, or is otherwise deferred). It renders
 * disabled with a small "Soon" pill so it reads as "not built yet" instead of
 * a silent, broken click. Prefer wiring a real action whenever one exists.
 */
export function SoonButton({
  children,
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      disabled
      title="Coming soon"
      className={cn("cursor-not-allowed gap-1.5", className)}
    >
      {children}
      <span className="rounded bg-muted px-1 py-px text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
        Soon
      </span>
    </Button>
  );
}
