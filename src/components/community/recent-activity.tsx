import { SectionCard } from "@/components/shared/section-card";
import { recentActivity } from "@/lib/community-data";

export function RecentActivity() {
  return (
    <SectionCard title="Recent Activity" viewAllHref="/community">
      <ul className="space-y-3.5">
        {recentActivity.map((a, i) => (
          <li key={i}>
            <p className="text-sm text-foreground">{a.text}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {a.meta}
            </p>
            <p className="text-[11px] text-muted-foreground/70">{a.time}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
