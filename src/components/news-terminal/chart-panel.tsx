"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { SoonButton } from "@/components/shared/soon-button";
import { cn } from "@/lib/utils";

const symbols = ["BTC/USD", "EUR/USD", "AAPL", "XAU/USD"];
const timeframes = ["1D", "1W", "1M", "6M", "1Y"];

export function ChartPanel() {
  const [symbol, setSymbol] = useState("BTC/USD");
  const [timeframe, setTimeframe] = useState("1D");

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {symbols.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSymbol(s)}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                symbol === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                timeframe === tf
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 py-16 text-center">
        <Icon
          icon="mdi:monitor-dashboard"
          className="size-8 text-muted-foreground"
        />
        <p className="mt-3 text-sm font-medium text-foreground">
          Live chart integration
        </p>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          Real-time candlestick data for {symbol} ({timeframe}) will render
          here once a market data provider is connected.
        </p>
        <SoonButton variant="outline" size="sm" className="mt-4">
          Connect Chart Provider
        </SoonButton>
      </div>
    </div>
  );
}
