import { AppShell } from "@/components/layout/app-shell";
import { LiveNotifications } from "@/components/notifications/live-notifications";
import { FilterPanel } from "@/components/notifications/filter-panel";

export default function NotificationsPage() {
  return (
    <AppShell
      title="Notifications"
      subtitle="Stay updated with what matters to you."
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LiveNotifications />
          </div>
          <div className="flex flex-col gap-5">
            <FilterPanel />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
