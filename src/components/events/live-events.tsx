"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

type EventItem = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  location: string | null;
  startsAt: string;
  price: string;
  capacity: number | null;
  organizer: string;
  attendees: number;
  registered: boolean;
  mine: boolean;
};

const categories = [
  "Webinar",
  "Meetup",
  "Workshop",
  "Trading Competition",
  "Networking",
];

const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

const tabs = ["All Events", "My Tickets", "My Events"] as const;

export function LiveEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<(typeof tabs)[number]>("All Events");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Webinar");
  const [startsAt, setStartsAt] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("Free");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/events");
      if (res.ok) {
        const data = (await res.json()) as { events: EventItem[] };
        setEvents(data.events);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  const filtered = useMemo(() => {
    if (tab === "My Tickets") return events.filter((e) => e.registered);
    if (tab === "My Events") return events.filter((e) => e.mine);
    return events;
  }, [events, tab]);

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !startsAt) return;
    setCreating(true);
    const res = await apiFetch("/api/events", {
      method: "POST",
      body: JSON.stringify({
        title,
        category,
        startsAt: new Date(startsAt).toISOString(),
        location,
        price,
        description,
      }),
    });
    setCreating(false);
    if (res.ok) {
      const { event } = (await res.json()) as { event: EventItem };
      setEvents((prev) =>
        [...prev, event].sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        )
      );
      setTitle("");
      setStartsAt("");
      setLocation("");
      setPrice("Free");
      setDescription("");
      setShowForm(false);
    }
  }

  async function toggleRegister(ev: EventItem) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === ev.id
          ? {
              ...e,
              registered: !e.registered,
              attendees: e.attendees + (e.registered ? -1 : 1),
            }
          : e
      )
    );
    const res = await apiFetch(`/api/events/${ev.id}/register`, {
      method: "POST",
    });
    if (res.ok) {
      const { attendees, registered } = (await res.json()) as {
        attendees: number;
        registered: boolean;
      };
      setEvents((prev) =>
        prev.map((e) => (e.id === ev.id ? { ...e, attendees, registered } : e))
      );
    }
  }

  async function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    await apiFetch(`/api/events/${id}`, { method: "DELETE" });
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowForm((v) => !v)}>
          <Icon icon={showForm ? "mdi:close" : "mdi:plus"} className="size-4" />
          {showForm ? "Cancel" : "Create Event"}
        </Button>
      </div>

      {showForm ? (
        <form
          onSubmit={createEvent}
          className="mb-4 grid grid-cols-1 gap-2.5 rounded-lg border border-border p-3 sm:grid-cols-2"
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            className="sm:col-span-2"
          />
          <select
            className={selectClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
            className={selectClass}
          />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (or Online)"
          />
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (e.g. Free, $25)"
          />
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className={cn(selectClass, "sm:col-span-2")}
          />
          <div className="flex justify-end sm:col-span-2">
            <Button
              type="submit"
              size="sm"
              disabled={creating || !title.trim() || !startsAt}
            >
              {creating ? "Creating…" : "Create Event"}
            </Button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="h-28 animate-pulse rounded-lg bg-secondary/40" />
          <div className="h-28 animate-pulse rounded-lg bg-secondary/40" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          {tab === "My Tickets"
            ? "You haven't registered for any events yet."
            : tab === "My Events"
              ? "You haven't created any events yet."
              : "No events yet. Create the first one."}
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((ev) => {
            const d = new Date(ev.startsAt);
            return (
              <li
                key={ev.id}
                className="flex flex-col rounded-lg border border-border p-3.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-[11px] text-primary"
                  >
                    {ev.category}
                  </Badge>
                  {ev.mine ? (
                    <button
                      type="button"
                      aria-label="Delete event"
                      onClick={() => void deleteEvent(ev.id)}
                      className="text-muted-foreground hover:text-bear"
                    >
                      <Icon icon="mdi:delete-outline" className="size-4" />
                    </button>
                  ) : null}
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {ev.title}
                </p>
                {ev.description ? (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {ev.description}
                  </p>
                ) : null}
                <div className="mt-2 space-y-1 text-[11px] text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <Icon icon="mdi:calendar-month" className="size-3.5" />
                    {d.toLocaleDateString()} ·{" "}
                    {d.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {ev.location ? (
                    <p className="flex items-center gap-1.5">
                      <Icon icon="mdi:map-marker-outline" className="size-3.5" />
                      {ev.location}
                    </p>
                  ) : null}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    {ev.price}
                    <span className="ml-2 font-normal text-muted-foreground">
                      {ev.attendees} going
                    </span>
                  </span>
                  <Button
                    size="sm"
                    variant={ev.registered ? "outline" : "default"}
                    className="h-7 px-2.5 text-xs"
                    onClick={() => void toggleRegister(ev)}
                  >
                    {ev.registered ? "Registered ✓" : "Register"}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
