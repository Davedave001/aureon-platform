import { AppShell } from "@/components/layout/app-shell";
import { DiscoverCategories } from "@/components/events/discover-categories";
import { LiveEvents } from "@/components/events/live-events";

export default function EventsPage() {
  return (
    <AppShell title="Events" subtitle="Connect. Learn. Grow.">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <DiscoverCategories />
        <LiveEvents />
      </div>
    </AppShell>
  );
}
