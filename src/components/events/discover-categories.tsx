import { Icon } from "@iconify/react";
import { discoverCategories } from "@/lib/events-data";

export function DiscoverCategories() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="mb-3 text-sm font-semibold text-foreground">
        Discover Events
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {discoverCategories.map((c) => (
          <button
            key={c.label}
            type="button"
            className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-3 text-center transition-colors hover:bg-accent"
          >
            <Icon icon={c.icon} className="size-5 text-primary" />
            <span className="text-xs font-medium text-foreground">
              {c.label}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {c.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
