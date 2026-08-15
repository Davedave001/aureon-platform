"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Profile = { verified: boolean; badge: string | null };

export function BadgeLevel() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const res = await apiFetch("/api/profile");
      if (res.ok) {
        const { profile: p } = (await res.json()) as { profile: Profile };
        setProfile(p);
      }
      setLoading(false);
    })();
  }, []);

  const verified = profile?.verified ?? false;
  const badge = profile?.badge ?? null;

  return (
    <SectionCard title="Your Badge Level">
      {loading ? (
        <div className="h-40 animate-pulse rounded-lg bg-secondary/40" />
      ) : (
        <>
          <div className="flex flex-col items-center py-2 text-center">
            <div
              className={
                "flex size-16 items-center justify-center rounded-full " +
                (verified ? "bg-gold/12" : "bg-secondary")
              }
            >
              <Icon
                icon={verified ? "mdi:shield-check" : "mdi:shield-outline"}
                className={"size-8 " + (verified ? "text-gold" : "text-muted-foreground")}
              />
            </div>
            <p className="mt-2.5 text-sm font-semibold text-foreground">
              {verified ? badge ?? "Verified" : "Not verified yet"}
            </p>
            <p className="text-xs text-muted-foreground">
              {verified
                ? "You've earned a verified badge."
                : "Submit your track record to get verified."}
            </p>
          </div>

          <ul className="mt-2 space-y-2 border-t border-border pt-3">
            <li className="flex items-center gap-2.5">
              <Icon
                icon={verified ? "mdi:check-circle" : "mdi:circle-outline"}
                className={"size-4 " + (verified ? "text-bull" : "text-muted-foreground")}
              />
              <span className="text-xs text-foreground">Verified member</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon
                icon={badge ? "mdi:check-circle" : "mdi:circle-outline"}
                className={"size-4 " + (badge ? "text-gold" : "text-muted-foreground")}
              />
              <span className="text-xs text-foreground">
                {badge ?? "Earn a mentor badge"}
              </span>
            </li>
          </ul>

          {!verified ? (
            <Link
              href="/community?tab=verification"
              className="mt-3 block text-center text-xs font-medium text-primary hover:underline"
            >
              Start verification →
            </Link>
          ) : null}
        </>
      )}
    </SectionCard>
  );
}
