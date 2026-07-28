"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Submission = {
  id: string;
  type: string;
  detail: string | null;
  createdAt: string;
  userName: string;
  userEmail: string;
};

export function LiveVerificationQueue() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/admin/verifications");
      if (res.ok) {
        const data = (await res.json()) as { submissions: Submission[] };
        setItems(data.submissions);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function review(id: string, status: "approved" | "rejected") {
    setBusyId(id);
    const res = await apiFetch(`/api/admin/verifications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setBusyId(null);
    if (res.ok) {
      setItems((prev) => prev.filter((s) => s.id !== id));
    }
  }

  return (
    <SectionCard title="Verification Queue">
      {loading ? (
        <p className="py-6 text-center text-xs text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <p className="py-6 text-center text-xs text-muted-foreground">
          No pending submissions.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((s) => (
            <li key={s.id} className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {s.userName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {s.type}
                  {s.detail ? ` · ${s.detail}` : ""}
                </p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 border-bull/30 px-2 text-xs text-bull hover:bg-bull/10"
                  disabled={busyId === s.id}
                  onClick={() => void review(s.id, "approved")}
                >
                  <Icon icon="mdi:check" className="size-3.5" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 border-bear/30 px-2 text-xs text-bear hover:bg-bear/10"
                  disabled={busyId === s.id}
                  onClick={() => void review(s.id, "rejected")}
                >
                  <Icon icon="mdi:close" className="size-3.5" />
                  Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
