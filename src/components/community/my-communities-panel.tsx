import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { myCommunities, toneClasses } from "@/lib/community-data";
import { cn } from "@/lib/utils";

export function MyCommunitiesPanel() {
  return (
    <SectionCard title="My Communities" viewAllHref="/community">
      <ul className="space-y-3">
        {myCommunities.map((c) => (
          <li key={c.name} className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full",
                toneClasses[c.tone]
              )}
            >
              <Icon icon={c.icon} className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {c.name}
              </p>
              <p className="text-xs text-muted-foreground">{c.members}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
