import { AppShell } from "@/components/layout/app-shell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

export default function NewsTerminalPage() {
  return (
    <AppShell
      title="News Terminal"
      subtitle="AI-powered market intelligence & analysis"
    >
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5">
        <TickerStrip />

        <Tabs defaultValue="dashboard">
          <TabsList variant="line">
            <TabsTrigger value="dashboard">Market Dashboard</TabsTrigger>
            <TabsTrigger value="news">AI News Feed</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="analysis">AI Market Analysis</TabsTrigger>
            <TabsTrigger value="journal">Trade Journal</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-4">
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

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <BullishSignals />
              <BearishSignals />
              <TechnicalSummary />
              <RiskLevelCard />
              <WatchlistsPanel />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <TradeJournal />
              </div>
              <MarketOverview />
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AiNewsFeed />
              </div>
              <EconomicCalendar />
            </div>
          </TabsContent>

          <TabsContent value="charts" className="mt-4">
            <ChartPanel />
          </TabsContent>

          <TabsContent value="analysis" className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <BullishSignals />
              <BearishSignals />
              <TechnicalSummary />
              <RiskLevelCard />
            </div>
          </TabsContent>

          <TabsContent value="journal" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <TradeJournal />
              </div>
              <WatchlistsPanel />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
