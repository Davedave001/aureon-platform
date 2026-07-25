import { AdminShell } from "@/components/layout/admin-shell";
import { AdminStatsRow } from "@/components/admin/stats-row";
import { PlatformOverview } from "@/components/admin/platform-overview";
import { RecentActivity } from "@/components/admin/recent-activity";
import { VerificationQueue } from "@/components/admin/verification-queue";
import { ManagementCards } from "@/components/admin/management-cards";
import { RecentUsersTable } from "@/components/admin/recent-users-table";
import { RecentAiProjectsTable } from "@/components/admin/recent-ai-projects-table";
import { AnalyticsOverview } from "@/components/admin/analytics-overview";
import { SystemStatus } from "@/components/admin/system-status";
import { QuickActions } from "@/components/admin/quick-actions";

export default function AdminPortalPage() {
  return (
    <AdminShell
      title="Admin Portal"
      subtitle="Manage platform operations, users, content, and analytics."
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <AdminStatsRow />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <div className="flex flex-col gap-5 lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <PlatformOverview />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <RecentActivity />
                <VerificationQueue />
              </div>
            </div>

            <ManagementCards />

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <RecentUsersTable />
              <RecentAiProjectsTable />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <AnalyticsOverview />
            <SystemStatus />
            <QuickActions />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
