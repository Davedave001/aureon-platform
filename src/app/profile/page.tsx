import Link from "next/link";
import { Icon } from "@iconify/react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { SectionCard } from "@/components/shared/section-card";
import { ProfileView } from "@/components/profile/profile-view";
import {
  profile,
  verificationItems,
  membershipSummary,
} from "@/lib/profile-data";

const statusStyle: Record<string, string> = {
  Approved: "border-bull/30 bg-bull/10 text-bull",
  Pending: "border-gold/30 bg-gold/10 text-gold",
};

export default function ProfilePage() {
  return (
    <AppShell title="Profile" subtitle="Your public presence on Aureon.">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
        <ProfileView />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="flex flex-col gap-5 lg:col-span-2">
            <SectionCard title="Trading Interests">
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((i) => (
                  <span
                    key={i}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Skills">
              <ul className="space-y-3.5">
                {profile.skills.map((s) => (
                  <li key={s.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">
                        {s.label}
                      </span>
                      <span className="text-muted-foreground">{s.level}%</span>
                    </div>
                    <Progress
                      value={s.level}
                      className="[&_[data-slot=progress-track]]:h-1.5"
                    />
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <div className="flex flex-col gap-5">
            <SectionCard title="Verification">
              <ul className="space-y-2.5">
                {verificationItems.map((v) => (
                  <li
                    key={v.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-sm text-foreground">{v.label}</span>
                    <Badge variant="outline" className={statusStyle[v.status]}>
                      {v.status}
                    </Badge>
                  </li>
                ))}
              </ul>
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
                <p className="text-sm font-semibold text-foreground">
                  {membershipSummary.plan}
                </p>
                <Badge className="bg-bull/15 text-bull hover:bg-bull/15">
                  {membershipSummary.status}
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {membershipSummary.renews}
              </p>
              <ul className="mt-3 space-y-1.5">
                {membershipSummary.perks.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-xs text-foreground"
                  >
                    <Icon icon="mdi:check-circle" className="size-3.5 text-bull" />
                    {p}
                  </li>
                ))}
              </ul>
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
        </div>
      </div>
    </AppShell>
  );
}
