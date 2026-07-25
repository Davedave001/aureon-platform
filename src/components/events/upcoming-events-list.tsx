"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { upcomingEvents } from "@/lib/events-data";
import { stockPhotos } from "@/lib/images";
import { cn } from "@/lib/utils";

export function UpcomingEventsList({
  onSelect,
}: {
  onSelect?: (id: string) => void;
}) {
  const [selected, setSelected] = useState(upcomingEvents[0].id);

  return (
    <SectionCard title="Upcoming Events" viewAllHref="/events">
      <ul className="space-y-3">
        {upcomingEvents.map((e) => (
          <li key={e.id}>
            <button
              type="button"
              onClick={() => {
                setSelected(e.id);
                onSelect?.(e.id);
              }}
              className={cn(
                "flex w-full flex-col overflow-hidden rounded-lg border text-left transition-colors",
                selected === e.id
                  ? "border-primary/40 bg-primary/5"
                  : "border-border hover:bg-accent"
              )}
            >
              <div className="relative h-24 w-full">
                <Image
                  src={stockPhotos[e.image]}
                  alt={e.title}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
                {e.featured ? (
                  <Badge className="absolute top-2 left-2 bg-primary text-[10px] text-primary-foreground hover:bg-primary">
                    FEATURED
                  </Badge>
                ) : null}
              </div>
              <div className="p-3">
                <p className="text-[11px] text-muted-foreground">{e.type}</p>
                <p className="text-sm font-medium text-foreground">
                  {e.title}
                </p>
                <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Icon icon="mdi:calendar-month" className="size-3.5" />
                  {e.date} · {e.time}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    {e.price}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {e.attending}
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <Button variant="outline" size="sm" className="mt-3 w-full">
        View All Events
      </Button>
    </SectionCard>
  );
}
