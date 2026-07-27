"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Stats = {
  users: number;
  posts: number;
  comments: number;
  events: number;
  inquiries: number;
  aiRequests: number;
  subscribers: number;
};

type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
};

const STAT_META: { key: keyof Stats; label: string; icon: string }[] = [
  { key: "users", label: "Users", icon: "mdi:account-group" },
  { key: "posts", label: "Posts", icon: "mdi:forum-outline" },
  { key: "comments", label: "Comments", icon: "mdi:comment-outline" },
  { key: "events", label: "Events", icon: "mdi:calendar-month" },
  { key: "inquiries", label: "Investor Inquiries", icon: "mdi:bullseye-arrow" },
  { key: "aiRequests", label: "AI Requests", icon: "mdi:creation" },
  { key: "subscribers", label: "Subscribers", icon: "mdi:email-outline" },
];

export function LiveAdmin() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/admin/overview");
      if (res.ok) {
        const data = (await res.json()) as {
          stats: Stats;
          recentUsers: AdminUser[];
        };
        setStats(data.stats);
        setUsers(data.recentUsers);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function toggleRole(u: AdminUser) {
    const nextRole = u.role === "admin" ? "member" : "admin";
    setBusyId(u.id);
    const res = await apiFetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      body: JSON.stringify({ role: nextRole }),
    });
    setBusyId(null);
    if (res.ok) {
      const { user } = (await res.json()) as { user: AdminUser };
      setUsers((prev) => prev.map((x) => (x.id === user.id ? user : x)));
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {STAT_META.map((s) => (
          <div key={s.key} className="rounded-xl border border-border bg-card p-3.5">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Icon icon={s.icon} className="size-4" />
            </div>
            <p className="mt-2 text-lg font-bold text-foreground">
              {loading || !stats ? "—" : stats[s.key].toLocaleString()}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <SectionCard title="Recent Users">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground">
                <th className="py-1.5 pr-3 font-medium">User</th>
                <th className="py-1.5 pr-3 font-medium">Joined</th>
                <th className="py-1.5 pr-3 font-medium">Role</th>
                <th className="py-1.5 font-medium" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-xs text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-xs text-muted-foreground">
                    No users yet.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t border-border">
                    <td className="py-2 pr-3">
                      <p className="font-medium text-foreground">
                        {u.name ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </td>
                    <td className="py-2 pr-3 text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 pr-3">
                      <Badge
                        variant="outline"
                        className={
                          u.role === "admin"
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-border bg-secondary text-muted-foreground"
                        }
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-2 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2.5 text-xs"
                        disabled={busyId === u.id}
                        onClick={() => void toggleRole(u)}
                      >
                        {u.role === "admin" ? "Make member" : "Make admin"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
