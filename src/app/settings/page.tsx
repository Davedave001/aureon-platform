import { AppShell } from "@/components/layout/app-shell";
import { SettingsView } from "@/components/settings/settings-view";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  return (
    <AppShell
      title="Settings"
      subtitle="Manage your account, security, and preferences."
    >
      <div className="mx-auto max-w-[1200px]">
        <SettingsView initialTab={tab} />
      </div>
    </AppShell>
  );
}
