import { SectionCard } from "@/components/shared/section-card";
import { notificationSummary } from "@/lib/notifications-data";

export function NotificationSummary() {
  const s = notificationSummary;
  return (
    <SectionCard title="Notification Summary">
      <p className="mb-3 -mt-1 text-xs text-muted-foreground">Today</p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-border py-2.5">
          <p className="text-lg font-bold text-primary">{s.new}</p>
          <p className="text-[11px] text-muted-foreground">New</p>
        </div>
        <div className="rounded-lg border border-border py-2.5">
          <p className="text-lg font-bold text-bull">{s.read}</p>
          <p className="text-[11px] text-muted-foreground">Read</p>
        </div>
        <div className="rounded-lg border border-border py-2.5">
          <p className="text-lg font-bold text-foreground">{s.total}</p>
          <p className="text-[11px] text-muted-foreground">Total</p>
        </div>
      </div>

      <p className="mt-4 mb-2 text-xs font-semibold text-foreground">
        Activity Overview
      </p>
      <ul className="space-y-2">
        {s.breakdown.map((b) => (
          <li key={b.label} className="flex items-center gap-2.5">
            <span className={`size-2.5 shrink-0 rounded-full ${b.tone}`} />
            <span className="flex-1 text-xs text-foreground">{b.label}</span>
            <span className="text-xs font-medium text-muted-foreground">
              {b.pct}%
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
