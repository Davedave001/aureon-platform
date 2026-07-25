import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { aiNewsFeed } from "@/lib/news-terminal-data";

export function AiNewsFeed() {
  return (
    <SectionCard title="AI News Feed" viewAllHref="/news-terminal">
      <ul className="space-y-4">
        {aiNewsFeed.map((n) => (
          <li key={n.headline}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm leading-snug font-semibold text-foreground">
                {n.headline}
              </p>
              <Badge
                variant="outline"
                className={
                  n.sentiment === "Bullish"
                    ? "shrink-0 border-bull/30 bg-bull/10 text-[11px] text-bull"
                    : "shrink-0 border-bear/30 bg-bear/10 text-[11px] text-bear"
                }
              >
                {n.sentiment} {n.confidence}%
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {n.source} · {n.time}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">{n.body}</p>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Affected:{" "}
              <span className="text-foreground">{n.affected.join(", ")}</span>
            </p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
