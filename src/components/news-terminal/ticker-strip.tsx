import { Icon } from "@iconify/react";
import { tickerStrip } from "@/lib/news-terminal-data";

export function TickerStrip() {
  return (
    <div className="flex gap-4 overflow-x-auto rounded-xl border border-border bg-card px-4 py-3">
      {tickerStrip.map((t) => (
        <div key={t.label} className="flex shrink-0 items-center gap-2">
          <Icon icon={t.icon} className="size-4 text-muted-foreground" />
          <div>
            <p className="text-[11px] leading-none text-muted-foreground">
              {t.label}
            </p>
            <p className="text-sm leading-tight font-semibold text-foreground">
              {t.value}{" "}
              <span className={t.up ? "text-bull" : "text-bear"}>
                {t.change}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
