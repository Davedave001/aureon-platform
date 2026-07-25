import { AppShell } from "@/components/layout/app-shell";
import { FilterTabs } from "@/components/notifications/filter-tabs";
import { NotificationsList } from "@/components/notifications/notifications-list";
import { FilterPanel } from "@/components/notifications/filter-panel";
import { NotificationSummary } from "@/components/notifications/notification-summary";

export default function NotificationsPage() {
  return (
    <AppShell
      title="Notifications"
      subtitle="Stay updated with what matters to you."
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <FilterTabs />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <NotificationsList />
          </div>
          <div className="flex flex-col gap-5">
            <FilterPanel />
            <NotificationSummary />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
