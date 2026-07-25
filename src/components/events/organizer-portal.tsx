import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionCard } from "@/components/shared/section-card";
import { organizerTabs, eventCategories, eventTypes } from "@/lib/events-data";

const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

const quickLinks = [
  { label: "Pricing", meta: "Set ticket prices and discounts", icon: "mdi:tag-outline" },
  { label: "Capacity", meta: "Set maximum attendee limit", icon: "mdi:account-group" },
  { label: "Payment", meta: "Configure payment methods", icon: "mdi:cash" },
  { label: "Analytics", meta: "Track sales and attendee insights", icon: "mdi:file-document-outline" },
];

export function OrganizerPortal() {
  return (
    <SectionCard title="Organizer Portal" viewAllHref="/events">
      <Tabs defaultValue={organizerTabs[0]}>
        <TabsList className="w-full">
          {organizerTabs.map((t) => (
            <TabsTrigger key={t} value={t} className="text-[11px]">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Create Event" className="mt-4 space-y-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Event Banner
            </label>
            <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-6 text-center">
              <Icon icon="mdi:cloud-upload-outline" className="size-6 text-muted-foreground" />
              <p className="text-[11px] text-muted-foreground">
                Drag &amp; drop image or{" "}
                <span className="font-medium text-primary">Upload Banner</span>
              </p>
              <p className="text-[10px] text-muted-foreground/70">
                Recommended: 1200x600px
              </p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Event Title
            </label>
            <Input placeholder="Enter event title" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Event Category
            </label>
            <select className={selectClass} defaultValue="">
              <option value="" disabled>
                Select category
              </option>
              {eventCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Event Type
            </label>
            <select className={selectClass} defaultValue="">
              <option value="" disabled>
                Select type
              </option>
              {eventTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {quickLinks.map((q) => (
              <button
                key={q.label}
                type="button"
                className="flex flex-col items-start gap-1 rounded-lg border border-border p-2.5 text-left transition-colors hover:bg-accent"
              >
                <Icon icon={q.icon} className="size-4 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  {q.label}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {q.meta}
                </span>
              </button>
            ))}
          </div>

          <Button className="w-full">Create Event</Button>
        </TabsContent>

        <TabsContent value="My Events" className="mt-4">
          <p className="text-xs text-muted-foreground">
            You haven&apos;t published any events yet.
          </p>
        </TabsContent>
        <TabsContent value="Orders" className="mt-4">
          <p className="text-xs text-muted-foreground">No orders yet.</p>
        </TabsContent>
        <TabsContent value="Analytics" className="mt-4">
          <p className="text-xs text-muted-foreground">
            Analytics will appear once your event goes live.
          </p>
        </TabsContent>
      </Tabs>
    </SectionCard>
  );
}
