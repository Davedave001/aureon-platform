import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionCard } from "@/components/shared/section-card";
import {
  bullishSignals,
  bearishSignals,
  technicalSummary,
  riskLevel,
} from "@/lib/news-terminal-data";

function SignalList({
  title,
  signals,
  tone,
}: {
  title: string;
  signals: { symbol: string; note: string; strength: string }[];
  tone: "bull" | "bear";
}) {
  return (
    <SectionCard title={title}>
      <ul className="space-y-3">
        {signals.map((s) => (
          <li key={s.symbol} className="flex items-start gap-2.5">
            <Icon
              icon={tone === "bull" ? "mdi:trending-up" : "mdi:trending-down"}
              className={tone === "bull" ? "mt-0.5 size-4 text-bull" : "mt-0.5 size-4 text-bear"}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{s.symbol}</p>
              <p className="text-xs text-muted-foreground">
                {s.note} ·{" "}
                <span
                  className={tone === "bull" ? "text-bull" : "text-bear"}
                >
                  {s.strength}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export function BullishSignals() {
  return <SignalList title="Bullish Signals" signals={[...bullishSignals]} tone="bull" />;
}

export function BearishSignals() {
  return <SignalList title="Bearish Signals" signals={[...bearishSignals]} tone="bear" />;
}

export function TechnicalSummary() {
  return (
    <SectionCard title="Technical Summary">
      <ul className="space-y-2.5">
        {technicalSummary.map((t) => (
          <li key={t.label} className="flex items-center justify-between">
            <span className="text-sm text-foreground">{t.label}</span>
            <Badge
              variant="outline"
              className={
                t.value === "Bullish"
                  ? "border-bull/30 bg-bull/10 text-bull"
                  : t.value === "Bearish"
                    ? "border-bear/30 bg-bear/10 text-bear"
                    : "border-border bg-secondary text-muted-foreground"
              }
            >
              {t.value}
            </Badge>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Markets showing mixed signals. Tech and crypto strong, while
        macro uncertainty remains. Watch key support/resistance levels.
      </p>
    </SectionCard>
  );
}

export function RiskLevelCard() {
  return (
    <SectionCard title="Risk Level">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {riskLevel.label}
        </span>
        <span className="text-2xl font-bold text-gold">
          {riskLevel.score}
          <span className="text-sm text-muted-foreground">/100</span>
        </span>
      </div>
      <Progress
        value={riskLevel.score}
        className="mt-2 [&_[data-slot=progress-indicator]]:bg-gold [&_[data-slot=progress-track]]:h-2"
      />
      <ul className="mt-3 space-y-1.5 text-xs">
        <li className="flex justify-between">
          <span className="text-muted-foreground">Volatility</span>
          <span className="text-foreground">{riskLevel.volatility}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-muted-foreground">Market Sentiment</span>
          <span className="text-foreground">{riskLevel.sentiment}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-muted-foreground">Trend Strength</span>
          <span className="text-foreground">{riskLevel.trendStrength}</span>
        </li>
      </ul>
    </SectionCard>
  );
}
