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
            className="flex flex-col items-start gap-1.5 rounded-lg border border-border p-2.5 text-left transition-colors hover:bg-accent"
          >
            <Icon icon={a.icon} className="size-4 text-primary" />
            <span className="text-[11px] font-medium text-foreground">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
