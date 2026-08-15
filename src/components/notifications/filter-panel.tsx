import Link from "next/link";
import { SectionCard } from "@/components/shared/section-card";
import { filterCategories } from "@/lib/notifications-data";

export function FilterPanel() {
  return (
    <SectionCard title="Notifications by Type">
      <ul className="space-y-1">
        {filterCategories.map((c) => (
          <li
            key={c.label}
            className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm"
          >
            <span className="text-foreground">{c.label}</span>
            <span className="rounded-full bg-secondary px-1.5 text-[11px] text-muted-foreground">
              {c.count}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/settings?tab=Notifications"
        className="mt-3 block w-full text-center text-xs font-medium text-primary hover:underline"
      >
        Manage Preferences
      </Link>
    </SectionCard>
  );
}
