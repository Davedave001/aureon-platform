import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";

const perks = [
  "News Terminal Access",
  "AI Research Assistant",
  "Premium Analytics",
  "Priority Support",
];

export function SubscriptionStatus() {
  return (
    <SectionCard title="Subscription Status">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Premium Plan</p>
        <Badge className="bg-bull/15 text-bull hover:bg-bull/15">
          Active
        </Badge>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Renews on Jun 15, 2024
      </p>
      <ul className="mt-3 space-y-1.5">
        {perks.map((p) => (
          <li key={p} className="flex items-center gap-2 text-xs text-foreground">
            <Icon icon="mdi:check-circle" className="size-3.5 text-bull" />
            {p}
          </li>
        ))}
      </ul>
      <Button variant="outline" size="sm" className="mt-3 w-full">
        Manage Subscription
      </Button>
    </SectionCard>
  );
}
