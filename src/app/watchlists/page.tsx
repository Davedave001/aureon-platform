import { AppShell } from "@/components/layout/app-shell";
import { WatchlistsView } from "@/components/watchlists/watchlists-view";

export default function WatchlistsPage() {
  return (
    <AppShell
      title="Watchlists"
      subtitle="Track the assets that matter most to you."
    >
      <div className="mx-auto max-w-[1400px]">
        <WatchlistsView />
      </div>
    </AppShell>
  );
}
