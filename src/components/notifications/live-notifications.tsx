"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  createdAt: string;
};

const iconFor: Record<string, { icon: string; tone: string }> = {
  comment: { icon: "mdi:comment-outline", tone: "bg-primary/15 text-primary" },
  vote: { icon: "mdi:arrow-up-bold-circle-outline", tone: "bg-bull/15 text-bull" },
  system: { icon: "mdi:bell-outline", tone: "bg-gold/15 text-gold" },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(iso).toLocaleDateString();
}

export function LiveNotifications() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/notifications");
      if (res.ok) {
        const data = (await res.json()) as { notifications: Notification[] };
        setItems(data.notifications);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    await apiFetch("/api/notifications", { method: "POST" });
  }

  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          All Notifications{unread ? ` (${unread} unread)` : ""}
        </h2>
        <button
          type="button"
          onClick={() => void markAllRead()}
          disabled={unread === 0}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline disabled:opacity-40"
        >
          <Icon icon="mdi:check-all" className="size-4" />
          Mark all as read
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="h-14 animate-pulse rounded-lg bg-secondary/40" />
          <div className="h-14 animate-pulse rounded-lg bg-secondary/40" />
        </div>
      ) : items.length === 0 ? (
        <div className="py-14 text-center">
          <Icon
            icon="mdi:bell-outline"
            className="mx-auto size-8 text-muted-foreground"
          />
          <p className="mt-3 text-sm text-foreground">You&apos;re all caught up</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Notifications appear when people engage with your posts.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((n) => {
            const meta = iconFor[n.type] ?? iconFor.system;
            return (
              <li key={n.id} className="flex items-start gap-3 py-3.5">
                <span
                  className={cn(
                    "mt-1.5 size-1.5 shrink-0 rounded-full",
                    n.read ? "bg-transparent" : "bg-primary"
                  )}
                />
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full",
                    meta.tone
                  )}
                >
                  <Icon icon={meta.icon} className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {n.title}
                  </p>
                  {n.body ? (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {n.body}
                    </p>
                  ) : null}
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {timeAgo(n.createdAt)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
