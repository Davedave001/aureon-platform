"use client";

import { useState } from "react";
import { SectionCard } from "@/components/shared/section-card";
import { marketOverview } from "@/lib/news-terminal-data";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "forex", label: "Forex" },
  { key: "crypto", label: "Crypto" },
  { key: "commodities", label: "Commodities" },
  { key: "stocks", label: "Stocks" },
] as const;

export function MarketOverview() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("forex");
  const rows = marketOverview[tab];

  return (
    <SectionCard title="Market Overview">
      <div className="mb-3 -mt-1 flex gap-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              tab === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-muted-foreground">
            <th className="py-1.5 font-medium">Pair</th>
            <th className="py-1.5 text-right font-medium">Price</th>
            <th className="py-1.5 text-right font-medium">Change %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.pair} className="border-t border-border">
              <td className="py-2 font-medium text-foreground">{r.pair}</td>
              <td className="py-2 text-right text-foreground">{r.price}</td>
              <td
                className={cn(
                  "py-2 text-right font-medium",
                  r.up ? "text-bull" : "text-bear"
                )}
              >
                {r.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}
