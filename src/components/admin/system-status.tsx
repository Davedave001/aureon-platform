import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { systemStatus } from "@/lib/admin-data";

export function SystemStatus() {
  return (
    <SectionCard title="System Status" viewAllHref="/admin">
      <ul className="space-y-2.5">
        {systemStatus.map((s) => (
          <li key={s.label} className="flex items-center justify-between">
            <span className="text-xs text-foreground">{s.label}</span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-bull">
              <Icon icon="mdi:check-circle" className="size-3.5" />
              {s.status}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
