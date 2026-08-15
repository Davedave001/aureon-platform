import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { quickActions } from "@/lib/admin-data";

export function QuickActions() {
  return (
    <SectionCard title="Quick Actions">
      <div className="grid grid-cols-2 gap-2.5">
        {quickActions.map((a) => (
          <button
            key={a.label}
            type="button"
            disabled
            title="Coming soon"
            className="flex cursor-not-allowed flex-col items-start gap-1.5 rounded-lg border border-border p-2.5 text-left opacity-70"
          >
            <Icon icon={a.icon} className="size-4 text-primary" />
            <span className="flex items-center gap-1 text-[11px] font-medium text-foreground">
              {a.label}
              <span className="rounded bg-muted px-1 text-[8px] font-semibold uppercase text-muted-foreground">
                Soon
              </span>
            </span>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
