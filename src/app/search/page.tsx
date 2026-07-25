import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { SearchView } from "@/components/search/search-view";

export default function SearchPage() {
  return (
    <AppShell title="Search" subtitle="Find anything across Aureon.">
      <div className="mx-auto max-w-[900px]">
        <Suspense
          fallback={
            <div className="h-12 animate-pulse rounded-md bg-card" />
          }
        >
          <SearchView />
        </Suspense>
      </div>
    </AppShell>
  );
}
