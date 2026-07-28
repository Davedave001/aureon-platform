import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminShell } from "@/components/layout/admin-shell";
import { LiveAdmin } from "@/components/admin/live-admin";
import { PlatformOverview } from "@/components/admin/platform-overview";
import { RecentActivity } from "@/components/admin/recent-activity";
import { LiveVerificationQueue } from "@/components/admin/live-verification-queue";
import { ManagementCards } from "@/components/admin/management-cards";
import { RecentAiProjectsTable } from "@/components/admin/recent-ai-projects-table";
import { AnalyticsOverview } from "@/components/admin/analytics-overview";
import { SystemStatus } from "@/components/admin/system-status";
import { QuickActions } from "@/components/admin/quick-actions";

export default async function AdminPortalPage() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminShell
      title="Admin Portal"
      subtitle="Manage platform operations, users, content, and analytics."
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <LiveAdmin />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <div className="flex flex-col gap-5 lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <PlatformOverview />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <RecentActivity />
                <LiveVerificationQueue />
              </div>
            </div>

            <ManagementCards />

            <RecentAiProjectsTable />
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
