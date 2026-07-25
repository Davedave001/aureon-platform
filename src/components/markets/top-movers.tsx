import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { topMovers } from "@/lib/markets-data";

function MoverList({
  title,
  icon,
  rows,
  up,
}: {
  title: string;
  icon: string;
  rows: { symbol: string; change: string }[];
  up: boolean;
}) {
  return (
    <div>
      <p
        className={
          "mb-2 flex items-center gap-1.5 text-xs font-semibold " +
          (up ? "text-bull" : "text-bear")
        }
      >
        <Icon icon={icon} className="size-4" />
        {title}
      </p>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.symbol} className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {r.symbol}
            </span>
            <span
              className={
                "text-xs font-medium " + (up ? "text-bull" : "text-bear")
              }
            >
              {r.change}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TopMovers() {
  return (
    <SectionCard title="Top Movers">
      <div className="grid grid-cols-2 gap-5">
        <MoverList
          title="Gainers"
          icon="mdi:trending-up"
          rows={topMovers.gainers}
          up
        />
        <MoverList
          title="Losers"
          icon="mdi:trending-down"
          rows={topMovers.losers}
          up={false}
        />
      </div>
    </SectionCard>
  );
}
