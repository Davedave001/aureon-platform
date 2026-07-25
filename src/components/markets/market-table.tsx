"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { marketTabs, marketTables } from "@/lib/markets-data";
import { cn } from "@/lib/utils";

export function MarketTable() {
  const [tab, setTab] = useState<(typeof marketTabs)[number]>("Forex");
  const rows = marketTables[tab];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground">
          Market Overview
        </h2>
        <div className="flex gap-1.5 overflow-x-auto">
          {marketTabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-2 pr-3 font-medium">Asset</th>
              <th className="py-2 pr-3 text-right font-medium">Price</th>
              <th className="py-2 pr-3 text-right font-medium">Change</th>
              <th className="py-2 pr-3 text-right font-medium">Change %</th>
              <th className="py-2 text-right font-medium">Day Range</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.symbol} className="border-t border-border">
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-2.5">
                    <Icon icon={a.icon} className="size-5" />
                    <div>
                      <p className="font-medium text-foreground">{a.symbol}</p>
                      <p className="text-xs text-muted-foreground">{a.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 pr-3 text-right font-medium text-foreground">
                  {a.price}
                </td>
                <td
                  className={cn(
                    "py-2.5 pr-3 text-right",
                    a.up ? "text-bull" : "text-bear"
                  )}
                >
                  {a.abs}
                </td>
                <td
                  className={cn(
                    "py-2.5 pr-3 text-right font-medium",
                    a.up ? "text-bull" : "text-bear"
                  )}
                >
                  {a.change}
                </td>
                <td className="py-2.5 text-right text-xs text-muted-foreground">
                  {a.low} – {a.high}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
