import { Icon } from "@iconify/react";
import { adminStats } from "@/lib/admin-data";

export function AdminStatsRow() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {adminStats.map((s) => (
        <div key={s.label} className="rounded-xl border border-border bg-card p-3.5">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/12 text-primary">
            <Icon icon={s.icon} className="size-4" />
          </div>
          <p className="mt-2 text-sm font-bold text-foreground">{s.value}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {s.label}
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-bull">
            {s.trend}
          </p>
        </div>
      ))}
    </div>
  );
}
