import { SectionCard } from "@/components/shared/section-card";
import { analyticsOverview } from "@/lib/admin-data";

export function AnalyticsOverview() {
  return (
    <SectionCard title="Analytics Overview" viewAllHref="/admin">
      <ul className="space-y-3">
        {analyticsOverview.map((a) => (
          <li key={a.label} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{a.label}</span>
            <span className="text-right">
              <span className="block text-sm font-semibold text-foreground">
                {a.value}
              </span>
              <span className="block text-[11px] font-medium text-bull">
                {a.trend}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
