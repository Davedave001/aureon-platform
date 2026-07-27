"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";
import { businessSizes } from "@/lib/ai-solutions-data";

const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function NewRequestForm() {
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [problem, setProblem] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!businessName.trim() || !email.trim()) {
      setError("Business name and email are required.");
      return;
    }
    setSubmitting(true);
    const res = await apiFetch("/api/ai-requests", {
      method: "POST",
      body: JSON.stringify({
        businessName,
        website,
        email,
        businessSize,
        problem,
      }),
    });
    setSubmitting(false);
    if (res.ok) {
      setDone(true);
    } else {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Could not submit your request.");
    }
  }

  if (done) {
    return (
      <SectionCard title="New AI Request">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-bull/12">
            <Icon icon="mdi:check-circle" className="size-6 text-bull" />
          </div>
          <p className="mt-3 text-sm font-semibold text-foreground">
            Request submitted
          </p>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
            Thanks! Our AI engineering team will review your project and reach
            out. You&apos;ll track its progress from your dashboard.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setDone(false);
              setBusinessName("");
              setWebsite("");
              setEmail("");
              setBusinessSize("");
              setProblem("");
            }}
          >
            Submit another
          </Button>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="New AI Request">
      <div className="mb-4 -mt-1 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Tell us about your project. We&apos;ll handle the rest.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-3.5">
        {error ? (
          <p className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            <Icon icon="mdi:alert-circle-outline" className="size-4 shrink-0" />
            {error}
          </p>
        ) : null}

        <Field label="Business or Company Name">
          <Input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter your business name"
          />
        </Field>

        <Field label="Website (Optional)">
          <Input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourcompany.com"
          />
        </Field>

        <Field label="Business Email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@company.com"
            type="email"
          />
        </Field>

        <Field label="Business Size">
          <select
            className={selectClass}
            value={businessSize}
            onChange={(e) => setBusinessSize(e.target.value)}
          >
            <option value="" disabled>
              Select business size
            </option>
            {businessSizes.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>

        <Field label="What do you want to build? (Optional)">
          <textarea
            rows={3}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe the problem or tool you have in mind…"
            className={selectClass}
          />
        </Field>

        <Button type="submit" className="w-full gap-1.5" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit Request"}
          {!submitting ? <Icon icon="mdi:arrow-right" className="size-4" /> : null}
        </Button>
      </form>
    </SectionCard>
  );
}
