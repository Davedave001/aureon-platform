"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { deliverableFilters, deliverables } from "@/lib/ai-solutions-data";
import { cn } from "@/lib/utils";

export function DeliverablesTable() {
  const [filter, setFilter] = useState<(typeof deliverableFilters)[number]>("All");
  const rows = deliverables.filter((d) => filter === "All" || d.type === filter);

  return (
    <SectionCard title="Deliverables" viewAllHref="/ai-solutions">
      <div className="mb-3 -mt-1 flex gap-1.5 overflow-x-auto">
        {deliverableFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="space-y-2.5">
        {rows.map((d) => (
          <li key={d.name} className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <Icon icon={d.icon} className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {d.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {d.project} · {d.uploaded} · {d.size}
              </p>
            </div>
            <Icon
              icon="mdi:download-outline"
              className="size-4 shrink-0 text-muted-foreground"
            />
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
