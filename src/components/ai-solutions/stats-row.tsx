import { Icon } from "@iconify/react";
import { workspaceStats } from "@/lib/ai-solutions-data";

export function WorkspaceStatsRow() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {workspaceStats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
            <Icon icon={s.icon} className="size-[18px]" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="truncate text-xs text-muted-foreground">
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
