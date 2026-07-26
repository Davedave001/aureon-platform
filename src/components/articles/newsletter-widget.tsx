"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";
import {
  newsletterTopics,
  newsletterFrequency,
  emailPreferences,
} from "@/lib/articles-data";

export function NewsletterWidget() {
  const [frequency, setFrequency] = useState("Weekly");
  const [topics, setTopics] = useState<string[]>(
    newsletterTopics.filter((t) => t.checked).map((t) => t.label)
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleTopic(label: string) {
    setSaved(false);
    setTopics((prev) =>
      prev.includes(label)
        ? prev.filter((t) => t !== label)
        : [...prev, label]
    );
  }

  async function savePreferences() {
    setSaving(true);
    setSaved(false);
    const res = await apiFetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ topics, frequency }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  }

  return (
    <SectionCard title="Newsletter">
      <p className="mb-3 -mt-1 text-xs text-muted-foreground">
        Stay informed with our expert insights.
      </p>

      <Tabs defaultValue="manage">
        <TabsList className="w-full">
          <TabsTrigger value="manage">Manage Subscription</TabsTrigger>
          <TabsTrigger value="mine">My Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="mt-4">
          <div className="flex flex-col items-center rounded-lg bg-secondary/40 py-5 text-center">
            <Icon icon="mdi:email-outline" className="size-7 text-muted-foreground" />
            <p className="mt-2 max-w-[220px] text-xs text-muted-foreground">
              Get the latest articles and market insights delivered to your
              inbox.
            </p>
          </div>

          <p className="mt-4 mb-1.5 text-xs font-semibold text-foreground">
            Topics
          </p>
          <p className="mb-2 text-[11px] text-muted-foreground">
            Choose topics you&apos;re interested in
          </p>
          <div className="grid grid-cols-2 gap-2">
            {newsletterTopics.map((t) => (
              <label
                key={t.key}
                className="flex items-center gap-2 text-xs text-foreground"
              >
                <input
                  type="checkbox"
                  checked={topics.includes(t.label)}
                  onChange={() => toggleTopic(t.label)}
                  className="size-3.5 accent-primary"
                />
                {t.label}
              </label>
            ))}
          </div>

          <p className="mt-4 mb-1.5 text-xs font-semibold text-foreground">
            Frequency
          </p>
          <p className="mb-2 text-[11px] text-muted-foreground">
            How often do you want updates?
          </p>
          <div className="space-y-1.5">
            {newsletterFrequency.map((f) => (
              <label
                key={f}
                className="flex items-center gap-2 text-xs text-foreground"
              >
                <input
                  type="radio"
                  name="frequency"
                  checked={frequency === f}
                  onChange={() => setFrequency(f)}
                  className="size-3.5 accent-primary"
                />
                {f}
              </label>
            ))}
          </div>

          <p className="mt-4 mb-1.5 text-xs font-semibold text-foreground">
            Email Preferences
          </p>
          <div className="space-y-1.5">
            {emailPreferences.map((p) => (
              <label
                key={p.key}
                className="flex items-center gap-2 text-xs text-foreground"
              >
                <input
                  type="checkbox"
                  defaultChecked={p.checked}
                  className="size-3.5 accent-primary"
                />
                {p.label}
              </label>
            ))}
          </div>

          <Button
            className="mt-4 w-full"
            onClick={() => void savePreferences()}
            disabled={saving}
          >
            {saving ? "Saving…" : saved ? "Preferences Saved ✓" : "Save Preferences"}
          </Button>
        </TabsContent>

        <TabsContent value="mine" className="mt-4">
          <p className="text-xs text-muted-foreground">
            You&apos;re subscribed to the Weekly newsletter across AI, Forex,
            Stocks, Crypto, and Technology.
          </p>
        </TabsContent>
      </Tabs>
    </SectionCard>
  );
}
