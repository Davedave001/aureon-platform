import { AppShell } from "@/components/layout/app-shell";
import { DiscoverCategories } from "@/components/events/discover-categories";
import { UpcomingEventsList } from "@/components/events/upcoming-events-list";
import { EventDetails } from "@/components/events/event-details";
import { MyTickets } from "@/components/events/my-tickets";
import { OrganizerPortal } from "@/components/events/organizer-portal";

export default function EventsPage() {
  return (
    <AppShell title="Events" subtitle="Connect. Learn. Grow.">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5">
        <DiscoverCategories />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <UpcomingEventsList />
          </div>
          <div className="lg:col-span-6">
            <EventDetails />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-3">
            <MyTickets />
            <OrganizerPortal />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
