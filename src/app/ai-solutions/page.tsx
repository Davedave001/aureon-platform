import { AppShell } from "@/components/layout/app-shell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProjectCards } from "@/components/ai-solutions/project-cards";
import { WorkspaceStatsRow } from "@/components/ai-solutions/stats-row";
import { ProjectTracker } from "@/components/ai-solutions/project-tracker";
import { MeetingsList } from "@/components/ai-solutions/meetings-list";
import { DeliverablesTable } from "@/components/ai-solutions/deliverables-table";
import { NewRequestForm } from "@/components/ai-solutions/new-request-form";
import { AiChatAssistant } from "@/components/ai-solutions/ai-chat-assistant";
import { TradingJournal } from "@/components/ai-solutions/trading-journal";
import { Backtesting } from "@/components/ai-solutions/backtesting";
import { TerminalDashboard } from "@/components/news-terminal/terminal-dashboard";

const TABS = ["services", "news", "journal", "backtesting"];

export default async function AiSolutionsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initialTab = tab && TABS.includes(tab) ? tab : "services";

  return (
    <AppShell
      title="AI Solutions"
      subtitle="Your AI workspace, market intelligence, and trading tools."
    >
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5">
        <Tabs defaultValue={initialTab}>
          <TabsList variant="line" className="w-full overflow-x-auto">
            <TabsTrigger value="services">AI Services</TabsTrigger>
            <TabsTrigger value="news">News Terminal</TabsTrigger>
            <TabsTrigger value="journal">Trading Journal</TabsTrigger>
            <TabsTrigger value="backtesting">Backtesting</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="flex flex-col gap-5 lg:col-span-2">
                <ProjectCards />
                <WorkspaceStatsRow />
                <ProjectTracker />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <MeetingsList />
                  <DeliverablesTable />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <NewRequestForm />
                <AiChatAssistant />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-4">
            <TerminalDashboard />
          </TabsContent>

          <TabsContent value="journal" className="mt-4">
            <TradingJournal />
          </TabsContent>

          <TabsContent value="backtesting" className="mt-4">
            <Backtesting />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
