"use client";

import { useState } from "react";
import { SectionCard } from "@/components/shared/section-card";
import { marketMovers } from "@/lib/news-terminal-data";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "gainers", label: "Top Gainers" },
  { key: "losers", label: "Top Losers" },
  { key: "active", label: "Most Active" },
] as const;

export function MarketMovers() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("gainers");
  const rows = marketMovers[tab];

  return (
    <SectionCard title="Market Movers">
      <div className="mb-3 -mt-1 flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              tab === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.symbol} className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                {r.symbol}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {r.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{r.price}</p>
              <p
                className={cn(
                  "text-xs font-medium",
                  r.change.startsWith("-") ? "text-bear" : "text-bull"
                )}
              >
                {r.change}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
