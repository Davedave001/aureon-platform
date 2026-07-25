"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { watchlistGroups } from "@/lib/watchlists-data";
import { cn } from "@/lib/utils";

export function WatchlistsView() {
  const [activeId, setActiveId] = useState(watchlistGroups[0].id);
  const active = watchlistGroups.find((w) => w.id === activeId) ?? watchlistGroups[0];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
      {/* Watchlist selector */}
      <div className="lg:col-span-1">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              My Watchlists
            </h2>
            <button
              type="button"
              aria-label="Create watchlist"
              className="flex size-6 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/10"
            >
              <Icon icon="mdi:plus" className="size-4" />
            </button>
          </div>
          <ul className="space-y-1.5">
            {watchlistGroups.map((w) => (
              <li key={w.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(w.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                    activeId === w.id
                      ? "bg-primary/10 ring-1 ring-primary/30"
                      : "hover:bg-accent"
                  )}
                >
                  <Icon
                    icon="mdi:heart-outline"
                    className="size-4 shrink-0 text-muted-foreground"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {w.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {w.count} assets
                    </span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-xs font-medium",
                      w.up ? "text-bull" : "text-bear"
                    )}
                  >
                    {w.change}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="mt-3 w-full gap-1.5">
            <Icon icon="mdi:plus" className="size-4" />
            Create New Watchlist
          </Button>
        </div>
      </div>

      {/* Asset table */}
      <div className="lg:col-span-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                {active.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {active.count} assets ·{" "}
                <span className={active.up ? "text-bull" : "text-bear"}>
                  {active.change} today
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Icon
                  icon="mdi:magnify"
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Add symbol..."
                  className="h-8 w-40 bg-secondary/60 pl-8 text-xs"
                />
              </div>
              <Button size="sm" className="h-8 gap-1.5">
                <Icon icon="mdi:plus" className="size-4" />
                Add
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Asset</th>
                  <th className="py-2 pr-3 text-right font-medium">Price</th>
                  <th className="py-2 pr-3 text-right font-medium">Change</th>
                  <th className="py-2 pr-3 text-right font-medium">Change %</th>
                  <th className="py-2 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {active.assets.map((a) => (
                  <tr key={a.symbol} className="border-t border-border">
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2.5">
                        <Icon icon={a.icon} className="size-5" />
                        <div>
                          <p className="font-medium text-foreground">
                            {a.symbol}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {a.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-right font-medium text-foreground">
                      {a.price}
                    </td>
                    <td
                      className={cn(
                        "py-2.5 pr-3 text-right",
                        a.up ? "text-bull" : "text-bear"
                      )}
                    >
                      {a.abs}
                    </td>
                    <td
                      className={cn(
                        "py-2.5 pr-3 text-right font-medium",
                        a.up ? "text-bull" : "text-bear"
                      )}
                    >
                      {a.change}
                    </td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          aria-label="Set price alert"
                          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <Icon icon="mdi:bell-plus-outline" className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Remove from watchlist"
                          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-bear"
                        >
                          <Icon icon="mdi:delete-outline" className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
