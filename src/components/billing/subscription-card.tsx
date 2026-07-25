import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { currentSubscription } from "@/lib/billing-data";

export function SubscriptionCard() {
  const s = currentSubscription;
  return (
    <SectionCard title="Your Subscriptions" viewAllHref="/billing">
      <div className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-sm font-bold text-primary">
            NT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {s.plan}
              </p>
              <Badge className="bg-bull/15 text-bull hover:bg-bull/15">
                {s.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{s.cycle} Plan</p>
            <p className="mt-1.5 max-w-md text-xs text-muted-foreground">
              {s.description}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Manage
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="text-[11px] text-muted-foreground">Price</p>
          <p className="text-sm font-medium text-foreground">
            {s.price} / month
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">Billing Cycle</p>
          <p className="text-sm font-medium text-foreground">{s.cycle}</p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">
            Next Billing Date
          </p>
          <p className="text-sm font-medium text-foreground">
            {s.nextBilling}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">Payment Method</p>
          <p className="flex items-center gap-1 text-sm font-medium text-foreground">
            <Icon icon="mdi:credit-card-outline" className="size-3.5" />
            {s.paymentMethod}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
