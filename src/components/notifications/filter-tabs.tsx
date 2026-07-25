"use client";

import { useState } from "react";
import { notificationFilters } from "@/lib/notifications-data";
import { cn } from "@/lib/utils";

export function FilterTabs() {
  const [active, setActive] = useState<(typeof notificationFilters)[number]["key"]>("All");

  return (
    <div className="flex gap-1.5 overflow-x-auto">
      {notificationFilters.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => setActive(f.key)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            active === f.key
              ? "bg-primary/12 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          {f.key}
          <span
            className={cn(
              "rounded-full px-1.5 text-[11px]",
              active === f.key
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}
