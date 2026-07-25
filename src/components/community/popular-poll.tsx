import { SectionCard } from "@/components/shared/section-card";
import { popularPoll } from "@/lib/community-data";

export function PopularPoll() {
  return (
    <SectionCard title="Popular Poll">
      <p className="text-sm font-medium text-foreground">
        {popularPoll.question}
      </p>
      <div className="mt-3 space-y-2">
        {popularPoll.options.map((o) => (
          <div
            key={o.label}
            className="relative overflow-hidden rounded-lg border border-border"
          >
            <div
              className="absolute inset-y-0 left-0 bg-primary/15"
              style={{ width: `${o.pct}%` }}
            />
            <div className="relative z-10 flex items-center justify-between px-3 py-1.5 text-xs">
              <span className="text-foreground">{o.label}</span>
              <span className="font-medium text-foreground">{o.pct}%</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {popularPoll.votes} · {popularPoll.daysLeft}
      </p>
    </SectionCard>
  );
}
