"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { categories, toneClasses } from "@/lib/community-data";
import { SectionCard } from "@/components/shared/section-card";
import { cn } from "@/lib/utils";

export function ExplorerList() {
  const [active, setActive] = useState("Forex");

  return (
    <SectionCard title="Community Explorer">
      <p className="mb-3 -mt-1 text-xs text-muted-foreground">
        Explore by market
      </p>
      <ul className="space-y-1.5">
        {categories.map((c) => (
          <li key={c.name}>
            <button
              type="button"
              onClick={() => setActive(c.name)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                active === c.name
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
                <span className="block text-xs text-muted-foreground">
                  {c.members}
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
  );
}
