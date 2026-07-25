import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { recentActivity } from "@/lib/admin-data";

export function RecentActivity() {
  return (
    <SectionCard title="Recent Activity" viewAllHref="/admin">
      <ul className="space-y-3.5">
        {recentActivity.map((a, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary">
              <Icon icon={a.icon} className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground">{a.text}</p>
              <p className="truncate text-xs text-muted-foreground">
                {a.meta}
              </p>
              <p className="text-[11px] text-muted-foreground/70">
                {a.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
