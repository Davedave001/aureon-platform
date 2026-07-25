import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionCard } from "@/components/shared/section-card";
import { myTickets, ticketTabs } from "@/lib/events-data";
import { stockPhotos } from "@/lib/images";

export function MyTickets() {
  return (
    <SectionCard title="My Tickets" viewAllHref="/events">
      <Tabs defaultValue="Upcoming">
        <TabsList className="w-full">
          {ticketTabs.map((t) => (
            <TabsTrigger key={t} value={t}>
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Upcoming" className="mt-3">
          <ul className="space-y-3">
            {myTickets.map((t) => (
              <li
                key={t.title}
                className="flex items-center gap-3 rounded-lg border border-border p-2.5"
              >
                <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={stockPhotos[t.image]}
                    alt={t.title}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-foreground">
                    {t.title}
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Icon icon="mdi:calendar-month" className="size-3" />
                    {t.date}
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Icon icon="mdi:map-marker-outline" className="size-3" />
                    {t.location}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="h-7 shrink-0 px-2 text-[11px]">
                  View Ticket
                </Button>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="Past" className="mt-3">
          <p className="text-xs text-muted-foreground">No past events yet.</p>
        </TabsContent>

        <TabsContent value="Cancelled" className="mt-3">
          <p className="text-xs text-muted-foreground">
            No cancelled tickets.
          </p>
        </TabsContent>
      </Tabs>
    </SectionCard>
  );
}
