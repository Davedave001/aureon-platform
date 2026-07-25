import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { paymentMethods } from "@/lib/billing-data";

export function PaymentMethodsList() {
  return (
    <SectionCard title="Payment Methods">
      <ul className="space-y-2.5">
        {paymentMethods.map((m) => (
          <li
            key={m.last4}
            className="flex items-center gap-3 rounded-lg border border-border p-3"
          >
            <Icon icon="mdi:credit-card-outline" className="size-5 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                {m.brand} •••• {m.last4}
                {m.primary ? (
                  <Badge className="bg-primary/15 text-[10px] text-primary hover:bg-primary/15">
                    Primary
                  </Badge>
                ) : null}
              </p>
              <p className="text-xs text-muted-foreground">
                Expires {m.expiry}
              </p>
            </div>
            <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs">
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <Button variant="outline" size="sm" className="mt-3 w-full gap-1.5">
        <Icon icon="mdi:plus" className="size-4" />
        Add Payment Method
      </Button>
    </SectionCard>
  );
}
