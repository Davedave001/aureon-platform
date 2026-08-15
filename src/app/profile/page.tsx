import { AppShell } from "@/components/layout/app-shell";
import { ProfileView } from "@/components/profile/profile-view";
import { ProfileAccount } from "@/components/profile/profile-account";

export default function ProfilePage() {
  return (
    <AppShell title="Profile" subtitle="Your public presence on Aureon.">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
        <ProfileView />
        <div className="lg:max-w-md">
          <ProfileAccount />
        </div>
      </div>
    </AppShell>
  );
}
