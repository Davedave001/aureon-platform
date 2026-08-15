import { TickerStrip } from "@/components/news-terminal/ticker-strip";
import { MarketMovers } from "@/components/news-terminal/market-movers";
import { ChartPanel } from "@/components/news-terminal/chart-panel";
import { AiNewsFeed } from "@/components/news-terminal/ai-news-feed";
import { EconomicCalendar } from "@/components/news-terminal/economic-calendar";
import {
  BullishSignals,
  BearishSignals,
  TechnicalSummary,
  RiskLevelCard,
} from "@/components/news-terminal/ai-market-analysis";
import { TradeJournal } from "@/components/news-terminal/trade-journal";
import { WatchlistsPanel } from "@/components/news-terminal/watchlists-panel";
import { MarketOverview } from "@/components/news-terminal/market-overview";

/**
 * The News Terminal market dashboard, extracted so it can be reused both at
 * the standalone /news-terminal route and inside the AI Solutions hub.
 */
export function TerminalDashboard() {
  return (
    <div className="flex flex-col gap-5">
      <TickerStrip />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <MarketMovers />
        </div>
        <div className="lg:col-span-6">
          <ChartPanel />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-3">
          <AiNewsFeed />
          <EconomicCalendar />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <BullishSignals />
        <BearishSignals />
        <TechnicalSummary />
        <RiskLevelCard />
        <WatchlistsPanel />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TradeJournal />
        </div>
        <MarketOverview />
      </div>
    </div>
  );
}
