import Image from "next/image";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { selectedEvent } from "@/lib/events-data";
import { stockPhotos, dicebearAvatar } from "@/lib/images";

const tierTone: Record<string, string> = {
  Platinum: "border-gold/30 bg-gold/10 text-gold",
  Gold: "border-amber-400/30 bg-amber-400/10 text-amber-400",
  Silver: "border-border bg-secondary text-muted-foreground",
};

export function EventDetails() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        <Image
          src={stockPhotos[selectedEvent.image]}
          alt={selectedEvent.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 700px"
        />
        <div className="absolute top-3 left-3 flex flex-col items-center rounded-lg bg-background/90 px-3 py-1.5 text-center">
          <span className="text-[10px] font-semibold text-primary">
            {selectedEvent.date.split(" ")[0]}
          </span>
          <span className="text-lg font-bold text-foreground">
            {selectedEvent.date.split(" ")[1]}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {selectedEvent.title}
          </h1>
          <Badge className="mt-1.5 bg-primary/15 text-primary hover:bg-primary/15">
            {selectedEvent.type}
          </Badge>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Share event"
            className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-accent"
          >
            <Icon icon="mdi:share-variant-outline" className="size-4" />
          </button>
          <button
            aria-label="Save event"
            className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-accent"
          >
            <Icon icon="mdi:bookmark-outline" className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <p className="text-[11px] text-muted-foreground">Date</p>
          <p className="text-sm font-medium text-foreground">
            {selectedEvent.date}, 2024
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">Time</p>
          <p className="text-sm font-medium text-foreground">
            {selectedEvent.time}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">Location</p>
          <p className="text-sm font-medium text-foreground">
            {selectedEvent.location}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">Attendees</p>
          <p className="text-sm font-medium text-foreground">
            {selectedEvent.attending}
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-5">
        <TabsList variant="line">
          {["Overview", "Agenda", "Speakers", "Sponsors"].map((t) => (
            <TabsTrigger key={t} value={t.toLowerCase()}>
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <p className="text-sm font-semibold text-foreground">
            About the Event
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {selectedEvent.about}
          </p>
        </TabsContent>

        <TabsContent value="agenda" className="mt-4">
          <ul className="space-y-2.5">
            {selectedEvent.agenda.map((a) => (
              <li key={a.item} className="flex items-center gap-3 text-sm">
                <span className="w-20 shrink-0 font-medium text-primary">
                  {a.time}
                </span>
                <span className="text-foreground">{a.item}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="speakers" className="mt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {selectedEvent.speakers.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={dicebearAvatar(s.seed)} alt={s.name} />
                  <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {s.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {s.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sponsors" className="mt-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {selectedEvent.sponsors.map((s) => (
              <div
                key={s.name}
                className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-3 text-center"
              >
                <Icon icon="mdi:domain" className="size-5 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">
                  {s.name}
                </span>
                <Badge variant="outline" className={tierTone[s.tier]}>
                  {s.tier}
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-[11px] text-muted-foreground">Price</p>
          <p className="text-lg font-bold text-foreground">
            {selectedEvent.price}
          </p>
        </div>
        <Button size="lg">Register Now</Button>
      </div>
    </div>
  );
}
