import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";

const recs = [
  {
    icon: "mdi:trending-up",
    title: "Market Outlook: Bullish on Tech",
    meta: "AI analysis based on market trends",
    tone: "bull" as const,
  },
  {
    icon: "cryptocurrency-color:btc",
    title: "Watch: Key Support Level for BTC",
    meta: "AI detected important price level",
    tone: "gold" as const,
  },
  {
    icon: "mdi:alert-circle-outline",
    title: "Earnings Alert: NVDA",
    meta: "AI summary & impact analysis",
    tone: "primary" as const,
  },
];

const toneClasses = {
  bull: "bg-bull/12 text-bull",
  gold: "bg-gold/15 text-gold",
  primary: "bg-primary/12 text-primary",
};

export function AiRecommendations() {
  return (
    <SectionCard title="AI Recommendations" viewAllHref="/ai-solutions?tab=news">
      <ul className="space-y-3.5">
        {recs.map((r) => (
          <li key={r.title} className="flex items-start gap-3">
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${toneClasses[r.tone]}`}
            >
              <Icon icon={r.icon} className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm leading-snug font-medium text-foreground">
                {r.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
