import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { billingStats } from "@/lib/billing-data";

export function BillingStatsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {billingStats.map((s) => (
        <div key={s.label} className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Icon icon={s.icon} className="size-[18px]" />
            </div>
            {s.meta === "Active" ? (
              <Badge className="bg-bull/15 text-bull hover:bg-bull/15">
                Active
              </Badge>
            ) : null}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
          <p className="truncate text-lg font-bold text-foreground">
            {s.value}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {s.detail}
          </p>
          <button className="mt-2 text-[11px] font-medium text-primary hover:underline">
            {s.href}
          </button>
        </div>
      ))}
    </div>
  );
}
