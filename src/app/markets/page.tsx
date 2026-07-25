import { AppShell } from "@/components/layout/app-shell";
import { IndicesStrip } from "@/components/markets/indices-strip";
import { MarketTable } from "@/components/markets/market-table";
import { TopMovers } from "@/components/markets/top-movers";
import { HeatMap } from "@/components/markets/heat-map";

export default function MarketsPage() {
  return (
    <AppShell
      title="Markets"
      subtitle="Live prices across forex, crypto, stocks, and commodities."
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <IndicesStrip />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MarketTable />
          </div>
          <div className="flex flex-col gap-5">
            <TopMovers />
            <HeatMap />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
