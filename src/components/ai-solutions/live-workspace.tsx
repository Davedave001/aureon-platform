"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type AiRequest = {
  id: string;
  businessName: string;
  website: string | null;
  industry: string | null;
  problem: string | null;
  budget: string | null;
  timeline: string | null;
  status: string;
  createdAt: string;
};

function statusStyle(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("complete") || s.includes("done") || s.includes("delivered"))
    return "border-bull/30 bg-bull/10 text-bull";
  if (s.includes("progress") || s.includes("building") || s.includes("review"))
    return "border-primary/30 bg-primary/10 text-primary";
  return "border-gold/30 bg-gold/10 text-gold";
}

const openStatuses = ["new", "pending", "in progress", "review", "building"];

function timeAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d < 1) return "today";
  if (d === 1) return "yesterday";
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function LiveWorkspace() {
  const [requests, setRequests] = useState<AiRequest[] | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await apiFetch("/api/ai-requests");
    if (res.ok) {
      const { requests: list } = (await res.json()) as { requests: AiRequest[] };
      setRequests(list);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
    const onCreated = () => void load();
    window.addEventListener("ai-request-created", onCreated);
    return () => window.removeEventListener("ai-request-created", onCreated);
  }, [load]);

  const total = requests?.length ?? 0;
  const active =
    requests?.filter((r) => openStatuses.includes(r.status.toLowerCase()))
      .length ?? 0;
  const done = total - active;

  const stats = [
    { icon: "mdi:folder-multiple-outline", label: "Total Requests", value: total, tone: "bg-primary/12 text-primary" },
    { icon: "mdi:progress-clock", label: "In Progress", value: active, tone: "bg-gold/15 text-gold" },
    { icon: "mdi:check-circle-outline", label: "Completed", value: done, tone: "bg-bull/12 text-bull" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
          >
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${s.tone}`}
            >
              <Icon icon={s.icon} className="size-[18px]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold text-foreground">
                {loading ? "—" : s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="My AI Projects">
        {loading ? (
          <div className="space-y-3">
            <div className="h-20 animate-pulse rounded-lg bg-secondary/40" />
            <div className="h-20 animate-pulse rounded-lg bg-secondary/40" />
          </div>
        ) : total === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Icon icon="mdi:creation-outline" className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">
              No AI projects yet
            </p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Submit a request with the form on the right and it will appear
              here so you can track its progress.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {requests!.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-border bg-card p-3.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {r.businessName}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      #{r.id.slice(0, 6).toUpperCase()} · {timeAgo(r.createdAt)}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 capitalize ${statusStyle(r.status)}`}
                  >
                    {r.status}
                  </Badge>
                </div>
                {r.problem ? (
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                    {r.problem}
                  </p>
                ) : null}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {r.industry ? (
                    <span className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {r.industry}
                    </span>
                  ) : null}
                  {r.budget ? (
                    <span className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {r.budget}
                    </span>
                  ) : null}
                  {r.timeline ? (
                    <span className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {r.timeline}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
}
