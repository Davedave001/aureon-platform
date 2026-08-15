import { AppShell } from "@/components/layout/app-shell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CommunityBrowser } from "@/components/community/community-browser";
import { LiveFeed } from "@/components/community/live-feed";
import { LiveMentorDirectory } from "@/components/community/live-mentor-directory";
import { LiveVerificationCenter } from "@/components/community/live-verification";
import { BadgeLevel } from "@/components/community/badge-level";

const TABS = ["explorer", "feed", "mentors", "verification"];

export default async function CommunityHubPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initialTab = tab && TABS.includes(tab) ? tab : "explorer";
  return (
    <AppShell
      title="Community Hub"
      subtitle="Connect. Learn. Share. Grow together."
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <Tabs defaultValue={initialTab}>
          <TabsList variant="line">
            <TabsTrigger value="explorer">Communities</TabsTrigger>
            <TabsTrigger value="feed">All Posts</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="explorer" className="mt-4">
            <CommunityBrowser />
            <div className="mt-5">
              <LiveMentorDirectory />
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
