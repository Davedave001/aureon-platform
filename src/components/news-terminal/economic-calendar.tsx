import { SectionCard } from "@/components/shared/section-card";
import { economicCalendar } from "@/lib/news-terminal-data";
import { cn } from "@/lib/utils";

const impactTone: Record<string, string> = {
  High: "bg-bear",
  Medium: "bg-gold",
  Low: "bg-bull",
};

export function EconomicCalendar() {
  return (
    <SectionCard title="Economic Calendar" viewAllHref="/news-terminal">
      <ul className="space-y-3">
        {economicCalendar.map((e, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-1.5 size-1.5 shrink-0 rounded-full",
                impactTone[e.impact]
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-foreground">
                  {e.event}
                </p>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {e.time}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {e.currency} · Forecast {e.forecast}
                {e.actual !== "-" ? ` · Actual ${e.actual}` : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
