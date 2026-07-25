import { SectionCard } from "@/components/shared/section-card";
import { filterCategories } from "@/lib/notifications-data";

export function FilterPanel() {
  return (
    <SectionCard title="Filter Notifications">
      <ul className="space-y-1">
        {filterCategories.map((c) => (
          <li key={c.label}>
            <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent">
              <span className="text-foreground">{c.label}</span>
              <span className="rounded-full bg-secondary px-1.5 text-[11px] text-muted-foreground">
                {c.count}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button className="mt-3 w-full text-center text-xs font-medium text-primary hover:underline">
        Manage Preferences
      </button>
    </SectionCard>
  );
}
