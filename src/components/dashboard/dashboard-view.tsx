"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Dashboard = {
  user: {
    firstName: string;
    role: string;
    verified: boolean;
    badge: string | null;
    plan: string;
    memberSince: string | null;
  };
  stats: {
    posts: number;
    watchlists: number;
    eventsRegistered: number;
    tradeIdeas: number;
    aiRequests: number;
  };
  upcomingEvents: {
    id: string;
    title: string;
    startsAt: string;
    category: string;
    registered: boolean;
  }[];
  notifications: {
    id: string;
    type: string;
    title: string;
    body: string | null;
    read: boolean;
    link: string | null;
    createdAt: string;
  }[];
  investor: {
    status: string;
    amount: string | null;
    currency: string;
    createdAt: string;
  } | null;
  communities: { key: string; posts: number }[];
};

function timeAgo(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(iso).toLocaleDateString();
}

function eventDate(iso: string) {
  const d = new Date(iso);
  return {
    mon: d.toLocaleDateString(undefined, { month: "short" }).toUpperCase(),
    day: d.getDate(),
    time: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
  };
}

export function DashboardView() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const res = await apiFetch("/api/dashboard");
      if (res.ok) setData((await res.json()) as Dashboard);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <WelcomeBanner />

      {/* Real per-user stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {loading || !data ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-[92px] animate-pulse rounded-xl border border-border bg-secondary/30"
            />
          ))
        ) : (
          <>
            <StatCard
              icon="mdi:account-group"
              value={String(data.stats.posts)}
              label="Community Posts"
              tone="primary"
            />
            <StatCard
              icon="mdi:heart-outline"
              value={String(data.stats.watchlists)}
              label="Watchlists"
              tone="blue"
            />
            <StatCard
              icon="mdi:calendar-check"
              value={String(data.stats.eventsRegistered)}
              label="Events Registered"
              tone="gold"
            />
            <StatCard
              icon="mdi:lightbulb-on-outline"
              value={String(data.stats.tradeIdeas)}
              label="Trade Ideas"
              tone="bull"
            />
            <StatCard
              icon="mdi:creation"
              value={String(data.stats.aiRequests)}
              label="AI Requests"
              tone="violet"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Upcoming events (real) */}
        <SectionCard title="Upcoming Events" viewAllHref="/events">
          {loading ? (
            <Skeleton rows={3} />
          ) : data && data.upcomingEvents.length > 0 ? (
            <ul className="space-y-3">
              {data.upcomingEvents.map((e) => {
                const d = eventDate(e.startsAt);
                return (
                  <li key={e.id} className="flex items-center gap-3">
                    <div className="flex w-11 shrink-0 flex-col items-center rounded-lg border border-border py-1">
                      <span className="text-[10px] font-semibold text-primary">
                        {d.mon}
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {d.day}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {e.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{d.time}</p>
                    </div>
                    {e.registered ? (
                      <Badge className="bg-bull/15 text-[10px] text-bull hover:bg-bull/15">
                        Registered
                      </Badge>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <Empty
              icon="mdi:calendar-blank-outline"
              text="No upcoming events yet."
              cta={{ href: "/events", label: "Browse events" }}
            />
          )}
        </SectionCard>

        {/* Notifications (real) */}
        <SectionCard title="Recent Notifications" viewAllHref="/notifications">
          {loading ? (
            <Skeleton rows={3} />
          ) : data && data.notifications.length > 0 ? (
            <ul className="space-y-3">
              {data.notifications.map((n) => (
                <li key={n.id} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon icon="mdi:bell-outline" className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {n.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(n.createdAt)}
                    </p>
                  </div>
                  {!n.read ? (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <Empty
              icon="mdi:bell-sleep-outline"
              text="You're all caught up."
            />
          )}
        </SectionCard>

        {/* Account / plan (real) */}
        <SectionCard title="Your Account">
          {loading || !data ? (
            <Skeleton rows={3} />
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
                  {data.user.plan}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Verification
                </span>
                {data.user.verified ? (
                  <span className="flex items-center gap-1 text-sm font-medium text-bull">
                    <Icon icon="mdi:check-decagram" className="size-4" />
                    {data.user.badge ?? "Verified"}
                  </span>
                ) : (
                  <Link
                    href="/community?tab=verification"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Get verified
                  </Link>
                )}
              </div>
              {data.user.memberSince ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Member since
                  </span>
                  <span className="text-sm text-foreground">
                    {new Date(data.user.memberSince).toLocaleDateString(
                      undefined,
                      { month: "short", year: "numeric" }
                    )}
                  </span>
                </div>
              ) : null}
              <Link
                href="/billing"
                className="mt-1 block text-xs font-medium text-primary hover:underline"
              >
                Manage plan & billing →
              </Link>
            </div>
          )}
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Community activity (real) */}
        <SectionCard title="Your Communities" viewAllHref="/community">
          {loading ? (
            <Skeleton rows={3} />
          ) : data && data.communities.length > 0 ? (
            <ul className="space-y-2.5">
              {data.communities.map((c) => (
                <li
                  key={c.key}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                >
                  <span className="text-sm font-medium capitalize text-foreground">
                    {c.key}
                  </span>
                  <Badge variant="outline" className="text-[11px]">
                    {c.posts} {c.posts === 1 ? "post" : "posts"}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <Empty
              icon="mdi:account-group-outline"
              text="You haven't posted in any community yet."
              cta={{ href: "/community", label: "Join the conversation" }}
            />
          )}
        </SectionCard>

        {/* Investor status (real) */}
        <SectionCard title="Investor Centre" viewAllHref="/investor-centre">
          {loading ? (
            <Skeleton rows={2} />
          ) : data && data.investor ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Latest inquiry
                </span>
                <Badge className="bg-primary/15 capitalize text-primary hover:bg-primary/15">
                  {data.investor.status}
                </Badge>
              </div>
              {data.investor.amount ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm font-medium text-foreground">
                    {data.investor.currency} {data.investor.amount}
                  </span>
                </div>
              ) : null}
              <p className="text-xs text-muted-foreground">
                Submitted {timeAgo(data.investor.createdAt)}
              </p>
            </div>
          ) : (
            <Empty
              icon="mdi:bank-outline"
              text="No investment inquiries yet."
              cta={{ href: "/investor-centre", label: "Start an inquiry" }}
            />
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function Skeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-10 animate-pulse rounded-lg bg-secondary/40"
        />
      ))}
    </div>
  );
}

function Empty({
  icon,
  text,
  cta,
}: {
  icon: string;
  text: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-center">
      <Icon icon={icon} className="size-7 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
      {cta ? (
        <Link
          href={cta.href}
          className="text-xs font-medium text-primary hover:underline"
        >
          {cta.label}
        </Link>
      ) : null}
    </div>
  );
}
