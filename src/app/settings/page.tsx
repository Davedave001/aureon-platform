import { AppShell } from "@/components/layout/app-shell";
import { SettingsView } from "@/components/settings/settings-view";

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage your account, security, and preferences."
    >
      <div className="mx-auto max-w-[1200px]">
        <SettingsView />
      </div>
    </AppShell>
  );
}
