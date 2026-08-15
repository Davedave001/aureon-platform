"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Inquiry = {
  id: string;
  amount: string | null;
  currency: string;
  goal: string | null;
  status: string;
  createdAt: string;
};

function statusStyle(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("complete") || s.includes("approved") || s.includes("done"))
    return "border-bull/30 bg-bull/10 text-bull";
  if (s.includes("review") || s.includes("progress") || s.includes("meeting"))
    return "border-primary/30 bg-primary/10 text-primary";
  return "border-gold/30 bg-gold/10 text-gold";
}

const openStatuses = ["new", "under review", "pending", "in progress"];

export function LiveInvestor() {
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const res = await apiFetch("/api/investor-inquiries");
      if (res.ok) {
        const { inquiries: list } = (await res.json()) as {
          inquiries: Inquiry[];
        };
        setInquiries(list);
      }
      setLoading(false);
    })();
  }, []);

  const total = inquiries?.length ?? 0;
  const open =
    inquiries?.filter((i) => openStatuses.includes(i.status.toLowerCase()))
      .length ?? 0;
  const actioned = total - open;
  const latest = inquiries?.[0];

  const stats = [
    { icon: "mdi:file-document-multiple-outline", label: "Total Inquiries", value: String(total) },
    { icon: "mdi:progress-clock", label: "In Review", value: String(open) },
    { icon: "mdi:check-circle-outline", label: "Actioned", value: String(actioned) },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
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

      {/* Inquiries table */}
      <SectionCard title="My Investment Inquiries">
        <p className="mb-3 -mt-1 text-xs text-muted-foreground">
          Track the status of your investment inquiries.
        </p>
        {loading ? (
          <div className="space-y-2">
            <div className="h-8 animate-pulse rounded bg-secondary/40" />
            <div className="h-8 animate-pulse rounded bg-secondary/40" />
          </div>
        ) : total === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Icon
              icon="mdi:file-document-outline"
              className="size-7 text-muted-foreground"
            />
            <p className="text-sm text-muted-foreground">
              No inquiries yet. Submit one using the form to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="py-1.5 pr-3 font-medium">Reference</th>
                  <th className="py-1.5 pr-3 font-medium">Submitted</th>
                  <th className="py-1.5 pr-3 font-medium">Amount</th>
                  <th className="py-1.5 pr-3 font-medium">Goal</th>
                  <th className="py-1.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries!.map((inq) => (
                  <tr key={inq.id} className="border-t border-border">
                    <td className="py-2 pr-3 font-medium text-foreground">
                      #{inq.id.slice(0, 6).toUpperCase()}
                    </td>
                    <td className="py-2 pr-3 text-muted-foreground">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 pr-3 text-foreground">
                      {inq.amount ? `${inq.currency} ${inq.amount}` : "—"}
                    </td>
                    <td className="py-2 pr-3 text-muted-foreground">
                      {inq.goal ?? "—"}
                    </td>
                    <td className="py-2">
                      <Badge
                        variant="outline"
                        className={`capitalize ${statusStyle(inq.status)}`}
                      >
                        {inq.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* Latest inquiry timeline */}
      {latest ? (
        <SectionCard title="Latest Inquiry">
          <ol className="relative space-y-4 border-l border-border pl-5">
            <li className="relative">
              <span className="absolute -left-[23px] top-0.5 flex size-3 items-center justify-center rounded-full bg-primary" />
              <p className="text-sm font-medium text-foreground">Submitted</p>
              <p className="text-xs text-muted-foreground">
                {new Date(latest.createdAt).toLocaleString()}
              </p>
            </li>
            <li className="relative">
              <span
                className={`absolute -left-[23px] top-0.5 flex size-3 items-center justify-center rounded-full ${
                  openStatuses.includes(latest.status.toLowerCase())
                    ? "bg-gold"
                    : "bg-bull"
                }`}
              />
              <p className="text-sm font-medium capitalize text-foreground">
                {latest.status}
              </p>
              <p className="text-xs text-muted-foreground">
                An Aureon advisor reviews every inquiry personally.
              </p>
            </li>
          </ol>
        </SectionCard>
      ) : null}
    </div>
  );
}
