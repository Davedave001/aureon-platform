import { SoonButton } from "@/components/shared/soon-button";

export function AnnualBillingBanner() {
  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-4 sm:flex-row">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Unlock More with Annual Billing
        </p>
        <p className="text-xs text-muted-foreground">
          Switch to annual billing and save up to 20% on your subscription.
        </p>
      </div>
      <SoonButton size="sm" className="shrink-0">
        Switch to Annual
        <span className="text-[11px] opacity-80">(20% Savings)</span>
      </SoonButton>
    </div>
  );
}
