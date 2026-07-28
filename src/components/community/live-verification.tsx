"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Submission = {
  id: string;
  type: string;
  detail: string | null;
  status: string;
  createdAt: string;
};

const statusStyle: Record<string, string> = {
  approved: "border-bull/30 bg-bull/10 text-bull",
  pending: "border-gold/30 bg-gold/10 text-gold",
  rejected: "border-bear/30 bg-bear/10 text-bear",
};

const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

export function LiveVerificationCenter() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [verified, setVerified] = useState(false);
  const [badge, setBadge] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState("");
  const [detail, setDetail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/verification");
      if (res.ok) {
        const data = (await res.json()) as {
          submissions: Submission[];
          verified: boolean;
          badge: string | null;
          types: string[];
        };
        setSubmissions(data.submissions);
        setTypes(data.types);
        setVerified(data.verified);
        setBadge(data.badge);
        setType((t) => t || data.types[0] || "");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!type) return;
    setSubmitting(true);
    const res = await apiFetch("/api/verification", {
      method: "POST",
      body: JSON.stringify({ type, detail }),
    });
    setSubmitting(false);
    if (res.ok) {
      const { submission } = (await res.json()) as { submission: Submission };
      setSubmissions((prev) => [submission, ...prev]);
      setDetail("");
    }
  }

  return (
    <SectionCard title="Verification Center" className="lg:col-span-2">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Submit your trading credentials for review.
        </p>
        {verified ? (
          <Badge className="gap-1 bg-primary/15 text-primary hover:bg-primary/15">
            <Icon icon="mdi:check-decagram" className="size-3.5" />
            {badge ?? "Verified"}
          </Badge>
        ) : null}
      </div>

      <form
        onSubmit={submit}
        className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1 block text-[11px] font-medium text-foreground">
            Credential type
          </label>
          <select
            className={selectClass}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-[11px] font-medium text-foreground">
            Link or reference (optional)
          </label>
          <Input
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="e.g. myfxbook.com/…"
          />
        </div>
        <Button type="submit" size="sm" className="gap-1.5" disabled={submitting}>
          <Icon icon="mdi:upload-outline" className="size-4" />
          Submit
        </Button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-1.5 pr-3 font-medium">Submission Type</th>
              <th className="py-1.5 pr-3 font-medium">Status</th>
              <th className="py-1.5 font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-xs text-muted-foreground">
                  Loading…
                </td>
              </tr>
            ) : submissions.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-xs text-muted-foreground">
                  No submissions yet. Submit a credential above.
                </td>
              </tr>
            ) : (
              submissions.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="py-2 pr-3 text-foreground">{s.type}</td>
                  <td className="py-2 pr-3">
                    <Badge
                      variant="outline"
                      className={statusStyle[s.status] ?? statusStyle.pending}
                    >
                      {s.status}
                    </Badge>
                  </td>
                  <td className="py-2 text-muted-foreground">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
