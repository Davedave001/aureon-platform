import { AppShell } from "@/components/layout/app-shell";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Here's your platform overview.">
      <DashboardView />
    </AppShell>
  );
}
