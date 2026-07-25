import { Icon } from "@iconify/react";
import { investorStats } from "@/lib/investor-data";

export function InvestorStatsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {investorStats.map((s) => (
        <div
          key={s.label}
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
            <Icon icon={s.icon} className="size-[18px]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="truncate text-sm font-semibold text-foreground">
              {s.value}
            </p>
            <a
              href={s.href}
              className="mt-1 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline"
            >
              {s.meta}
              <Icon icon="mdi:chevron-right" className="size-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
