import { AppShell } from "@/components/layout/app-shell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExplorerList } from "@/components/community/explorer-list";
import { LiveFeed } from "@/components/community/live-feed";
import { TrendingDiscussions } from "@/components/community/trending-discussions";
import { PopularPoll } from "@/components/community/popular-poll";
import { MyCommunitiesPanel } from "@/components/community/my-communities-panel";
import { RecentActivity } from "@/components/community/recent-activity";
import { SavedDiscussions } from "@/components/community/saved-discussions";
import { LiveMentorDirectory } from "@/components/community/live-mentor-directory";
import { LiveVerificationCenter } from "@/components/community/live-verification";
import { BadgeLevel } from "@/components/community/badge-level";

export default function CommunityHubPage() {
  return (
    <AppShell
      title="Community Hub"
      subtitle="Connect. Learn. Share. Grow together."
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <Tabs defaultValue="explorer">
          <TabsList variant="line">
            <TabsTrigger value="explorer">Explorer</TabsTrigger>
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="my-communities">My Communities</TabsTrigger>
            <TabsTrigger value="verification">Verification Center</TabsTrigger>
          </TabsList>

          <TabsContent value="explorer" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <ExplorerList />
              </div>
              <div className="lg:col-span-5">
                <LiveFeed />
              </div>
              <div className="flex flex-col gap-4 lg:col-span-2">
                <TrendingDiscussions />
                <PopularPoll />
              </div>
              <div className="flex flex-col gap-4 lg:col-span-2">
                <MyCommunitiesPanel />
                <RecentActivity />
                <SavedDiscussions />
              </div>
            </div>

            <div className="mt-5">
              <LiveMentorDirectory />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <LiveVerificationCenter />
              <BadgeLevel />
            </div>
          </TabsContent>

          <TabsContent value="feed" className="mt-4">
            <div className="mx-auto max-w-2xl">
              <LiveFeed />
            </div>
          </TabsContent>

          <TabsContent value="mentors" className="mt-4">
            <LiveMentorDirectory />
          </TabsContent>

          <TabsContent value="my-communities" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <MyCommunitiesPanel />
              <ExplorerList />
            </div>
          </TabsContent>

          <TabsContent value="verification" className="mt-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <LiveVerificationCenter />
              <BadgeLevel />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
