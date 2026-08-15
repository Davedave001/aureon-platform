import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SoonButton } from "@/components/shared/soon-button";
import { SectionCard } from "@/components/shared/section-card";
import { plans } from "@/lib/billing-data";
import { cn } from "@/lib/utils";

export function PlansSidebar() {
  return (
    <SectionCard title="Upgrade Your Plan">
      <div className="mb-3 -mt-1 flex items-center gap-1.5 text-xs text-bull">
        <Icon icon="mdi:percent-outline" className="size-3.5" />
        Save up to 20% with annual billing
      </div>
      <div className="space-y-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "rounded-lg border p-3.5",
              p.popular ? "border-primary/40 bg-primary/5" : "border-border"
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                {p.name}
              </p>
              {p.popular ? (
                <Badge className="bg-primary/15 text-[10px] text-primary hover:bg-primary/15">
                  Most Popular
                </Badge>
              ) : null}
            </div>
            <p className="mt-0.5 text-lg font-bold text-foreground">
              {p.price}
              <span className="text-xs font-normal text-muted-foreground">
                /month
              </span>
            </p>
            <ul className="mt-2 space-y-1">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Icon icon="mdi:check" className="size-3.5 text-bull" />
                  {f}
                </li>
              ))}
            </ul>
            {p.current ? (
              <Button
                size="sm"
                variant="outline"
                disabled
                className="mt-3 w-full"
              >
                Current Plan
              </Button>
            ) : (
              <SoonButton
                size="sm"
                variant={p.popular ? "default" : "outline"}
                className="mt-3 w-full"
              >
                Upgrade
              </SoonButton>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
