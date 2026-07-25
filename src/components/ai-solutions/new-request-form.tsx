import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/section-card";
import { businessSizes } from "@/lib/ai-solutions-data";

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

export function NewRequestForm() {
  return (
    <SectionCard title="New AI Request">
      <div className="mb-4 -mt-1 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Tell us about your project. We&apos;ll handle the rest.
        </p>
        <span className="shrink-0 text-xs font-medium text-muted-foreground">
          Step 1 of 6
        </span>
      </div>

      <div className="space-y-3.5">
        <Field label="Business or Company Name">
          <Input placeholder="Enter your business name" />
        </Field>

        <Field label="Website (Optional)">
          <Input placeholder="https://yourcompany.com" />
        </Field>

        <Field label="Business Email">
          <Input placeholder="your.email@company.com" type="email" />
        </Field>

        <Field label="Business Size">
          <select className={selectClass} defaultValue="">
            <option value="" disabled>
              Select business size
            </option>
            {businessSizes.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>

        <Button className="w-full gap-1.5">
          Next Step
          <Icon icon="mdi:arrow-right" className="size-4" />
        </Button>
      </div>
    </SectionCard>
  );
}
