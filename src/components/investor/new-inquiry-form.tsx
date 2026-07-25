import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/section-card";
import { cn } from "@/lib/utils";
import {
  investmentGoals,
  riskAppetites,
  investmentHorizons,
  preferredMarkets,
} from "@/lib/investor-data";

const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function NewInquiryForm() {
  return (
    <SectionCard title="New Investment Inquiry">
      <div className="mb-4 -mt-1 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Tell us about your investment goals.
        </p>
        <span className="shrink-0 text-xs font-medium text-muted-foreground">
          Step 1 of 7
        </span>
      </div>

      <div className="space-y-3.5">
        <Field label="Full Name">
          <Input placeholder="Enter your full name" />
        </Field>

        <Field label="Investment Amount">
          <div className="flex gap-2">
            <select className={cn(selectClass, "w-20 shrink-0")} defaultValue="USD">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
            <Input placeholder="e.g. 100,000" className="flex-1" />
          </div>
        </Field>

        <Field label="Investment Goals">
          <select className={selectClass} defaultValue="">
            <option value="" disabled>
              Select your primary goal
            </option>
            {investmentGoals.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </Field>

        <Field label="Risk Appetite">
          <select className={selectClass} defaultValue="">
            <option value="" disabled>
              Select your risk appetite
            </option>
            {riskAppetites.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>

        <Field label="Investment Horizon">
          <select className={selectClass} defaultValue="">
            <option value="" disabled>
              Select your investment horizon
            </option>
            {investmentHorizons.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Markets">
          <select className={selectClass} defaultValue="">
            <option value="" disabled>
              Select preferred markets
            </option>
            {preferredMarkets.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </Field>

        <Field label="Comments (Optional)">
          <textarea
            rows={3}
            placeholder="Additional information..."
            className={selectClass}
          />
        </Field>

        <Button className="w-full gap-1.5">
          Next Step
          <Icon icon="mdi:arrow-right" className="size-4" />
        </Button>
      </div>
    </SectionCard>
  );
}
