import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { platformOverview } from "@/lib/admin-data";

const toneClasses = {
  primary: "bg-primary/12 text-primary",
  bull: "bg-bull/12 text-bull",
  gold: "bg-gold/15 text-gold",
};

export function PlatformOverview() {
  return (
    <SectionCard title="Platform Overview">
      <div className="mb-4 -mt-1 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {platformOverview.period}
        </span>
        <Icon icon="mdi:chevron-right" className="size-4 text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {platformOverview.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-border p-3.5"
          >
            <div className={`flex size-8 items-center justify-center rounded-full ${toneClasses[m.tone]}`}>
              <Icon icon="mdi:trending-up" className="size-4" />
            </div>
            <p className="mt-2 text-lg font-bold text-foreground">
              {m.value}
            </p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="mt-0.5 text-[11px] font-medium text-bull">
              {m.trend} vs. last period
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Detailed trend charts are available in the full Reports &amp;
        Analytics module.
      </p>
    </SectionCard>
  );
}
