"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { categories, toneClasses } from "@/lib/community-data";
import { LiveFeed } from "./live-feed";
import { cn } from "@/lib/utils";

export function CommunityBrowser() {
  const [selected, setSelected] = useState<string>("All");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-4 xl:col-span-3">
        <SectionCard title="Communities">
          <p className="mb-3 -mt-1 text-xs text-muted-foreground">
            Pick a community to see and post in its feed.
          </p>
          <ul className="space-y-1.5">
            <li>
              <button
                type="button"
                onClick={() => setSelected("All")}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                  selected === "All"
                    ? "bg-primary/10 ring-1 ring-primary/30"
                    : "hover:bg-accent"
                )}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Icon icon="mdi:earth" className="size-4" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  All Communities
                </span>
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.name}>
                <button
                  type="button"
                  onClick={() => setSelected(c.name)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                    selected === c.name
                      ? "bg-primary/10 ring-1 ring-primary/30"
                      : "hover:bg-accent"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full",
                      toneClasses[c.tone]
                    )}
                  >
                    <Icon icon={c.icon} className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {c.name}
                    </span>
                  </span>
                  <Icon
                    icon="mdi:chevron-right"
                    className="size-4 shrink-0 text-muted-foreground"
                  />
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="lg:col-span-8 xl:col-span-9">
        <LiveFeed filterCommunity={selected === "All" ? undefined : selected} />
      </div>
    </div>
  );
}
