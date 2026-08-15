import Link from "next/link";
import { Icon } from "@iconify/react";
import { buttonVariants } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { watchlists } from "@/lib/news-terminal-data";
import { cn } from "@/lib/utils";

export function WatchlistsPanel() {
  return (
    <SectionCard title="Watchlists" viewAllHref="/watchlists">
      <ul className="space-y-3">
        {watchlists.map((w) => (
          <li key={w.name} className="flex items-center gap-3">
            <Icon icon="mdi:heart-outline" className="size-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {w.name}
              </p>
              <p className="text-xs text-muted-foreground">{w.count} assets</p>
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                w.up ? "text-bull" : "text-bear"
              )}
            >
              {w.change}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/watchlists"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "mt-4 w-full gap-1.5"
        )}
      >
        <Icon icon="mdi:plus-circle-outline" className="size-4" />
        Create New Watchlist
      </Link>
    </SectionCard>
  );
}
