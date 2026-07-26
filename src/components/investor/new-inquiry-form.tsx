"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/section-card";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/lib/api";
import {
  investmentGoals,
  riskAppetites,
  investmentHorizons,
  preferredMarkets,
} from "@/lib/investor-data";

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

export function NewInquiryForm() {
  const [fullName, setFullName] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [goal, setGoal] = useState("");
  const [risk, setRisk] = useState("");
  const [horizon, setHorizon] = useState("");
  const [markets, setMarkets] = useState("");
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    setSubmitting(true);
    const res = await apiFetch("/api/investor-inquiries", {
      method: "POST",
      body: JSON.stringify({
        fullName,
        currency,
        amount,
        goal,
        risk,
        horizon,
        markets,
        comments,
      }),
    });
    setSubmitting(false);
    if (res.ok) {
      setDone(true);
    } else {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Could not submit your inquiry.");
    }
  }

  if (done) {
    return (
      <SectionCard title="New Investment Inquiry">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-bull/12">
            <Icon icon="mdi:check-circle" className="size-6 text-bull" />
          </div>
          <p className="mt-3 text-sm font-semibold text-foreground">
            Inquiry submitted
          </p>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
            Thanks, {fullName.split(" ")[0]}. An Aureon advisor will review your
            inquiry and reach out. You&apos;ll see its status update here.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setDone(false);
              setFullName("");
              setAmount("");
              setGoal("");
              setRisk("");
              setHorizon("");
              setMarkets("");
              setComments("");
            }}
          >
            Submit another
          </Button>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="New Investment Inquiry">
      <div className="mb-4 -mt-1 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Tell us about your investment goals.
        </p>
        <span className="shrink-0 text-xs font-medium text-muted-foreground">
          Reviewed by a human advisor
        </span>
      </div>

      <form onSubmit={submit} className="space-y-3.5">
        {error ? (
          <p className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            <Icon icon="mdi:alert-circle-outline" className="size-4 shrink-0" />
            {error}
          </p>
        ) : null}

        <Field label="Full Name">
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </Field>

        <Field label="Investment Amount">
          <div className="flex gap-2">
            <select
              className={cn(selectClass, "w-20 shrink-0")}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 100,000"
              className="flex-1"
            />
          </div>
        </Field>

        <Field label="Investment Goals">
          <select
            className={selectClass}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="" disabled>
              Select your primary goal
            </option>
            {investmentGoals.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </Field>

        <Field label="Risk Appetite">
          <select
            className={selectClass}
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
          >
            <option value="" disabled>
              Select your risk appetite
            </option>
            {riskAppetites.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>

        <Field label="Investment Horizon">
          <select
            className={selectClass}
            value={horizon}
            onChange={(e) => setHorizon(e.target.value)}
          >
            <option value="" disabled>
              Select your investment horizon
            </option>
            {investmentHorizons.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Markets">
          <select
            className={selectClass}
            value={markets}
            onChange={(e) => setMarkets(e.target.value)}
          >
            <option value="" disabled>
              Select preferred markets
            </option>
            {preferredMarkets.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </Field>

        <Field label="Comments (Optional)">
          <textarea
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Additional information..."
            className={selectClass}
          />
        </Field>

        <Button type="submit" className="w-full gap-1.5" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit Inquiry"}
          {!submitting ? <Icon icon="mdi:arrow-right" className="size-4" /> : null}
        </Button>
      </form>
    </SectionCard>
  );
}
