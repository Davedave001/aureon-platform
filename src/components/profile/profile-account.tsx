"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

type Profile = {
  role: string;
  verified: boolean;
  badge: string | null;
};

/**
 * Real account cards for the profile page: verification status and plan,
 * pulled from the signed-in user's profile (no hardcoded data).
 */
export function ProfileAccount() {
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

  const plan = profile?.role === "admin" ? "Admin" : "Free";

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Verification">
        {loading ? (
          <div className="h-16 animate-pulse rounded-lg bg-secondary/40" />
        ) : profile?.verified ? (
          <div className="flex items-center gap-2 text-sm font-medium text-bull">
            <Icon icon="mdi:check-decagram" className="size-5" />
            {profile.badge ?? "Verified mentor"}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Your account isn&apos;t verified yet. Submit your track record to earn
            a verified badge.
          </p>
        )}
        <Link
          href="/community?tab=verification"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-3 w-full"
          )}
        >
          Manage Verification
        </Link>
      </SectionCard>

      <SectionCard title="Membership">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">{plan} plan</p>
          <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
            Active
          </Badge>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {plan === "Admin"
            ? "Full administrative access."
            : "Upgrade for premium tools and AI insights."}
        </p>
        <Link
          href="/billing"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-3 w-full"
          )}
        >
          Manage Subscription
        </Link>
      </SectionCard>
    </div>
  );
}
