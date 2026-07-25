import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/section-card";
import { coupons } from "@/lib/billing-data";

export function CouponsList() {
  return (
    <SectionCard title="Available Coupons">
      <div className="mb-3 -mt-1 flex gap-2">
        <Input placeholder="Enter coupon code" className="flex-1" />
        <Button size="sm">Apply</Button>
      </div>
      <ul className="space-y-2.5">
        {coupons.map((c) => (
          <li
            key={c.code}
            className="flex items-center gap-3 rounded-lg border border-border p-2.5"
          >
            <Icon icon="mdi:gift-outline" className="size-4 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                {c.code}
                <Badge className="bg-bull/15 text-[10px] text-bull hover:bg-bull/15">
                  Applicable
                </Badge>
              </p>
              <p className="text-xs text-muted-foreground">{c.meta}</p>
              <p className="text-[11px] text-muted-foreground/70">
                {c.valid}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
