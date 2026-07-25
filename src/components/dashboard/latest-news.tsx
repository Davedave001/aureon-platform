import { SectionCard } from "@/components/shared/section-card";

const news = [
  {
    headline: "Fed Signals Caution as Inflation Remains Sticky",
    time: "2h ago",
  },
  {
    headline: "Bitcoin Breaks $67K as ETF Inflows Surge",
    time: "4h ago",
  },
  {
    headline: "Oil Prices Climb on Geopolitical Tensions in Middle East",
    time: "6h ago",
  },
  {
    headline: "Tech Stocks Rally as Earnings Beat Expectations",
    time: "8h ago",
  },
];

export function LatestNews() {
  return (
    <SectionCard title="Latest Financial News" viewAllHref="/news-terminal">
      <ul className="space-y-3.5">
        {news.map((n) => (
          <li key={n.headline} className="flex items-start gap-3">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <div className="min-w-0">
              <p className="text-sm leading-snug font-medium text-foreground">
                {n.headline}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
