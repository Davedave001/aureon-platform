import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SectionCard } from "@/components/shared/section-card";
import { kanbanColumns } from "@/lib/ai-solutions-data";
import { dicebearAvatar } from "@/lib/images";

export function ProjectTracker() {
  return (
    <SectionCard title="Project Tracker">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {kanbanColumns.map((col) => (
          <div key={col.key} className="w-56 shrink-0">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-xs font-semibold text-foreground">
                {col.label}
              </p>
              <span className="text-[11px] text-muted-foreground">
                {col.cards.length}
              </span>
            </div>
            <div className="space-y-2">
              {col.cards.map((c) => (
                <div
                  key={c.title}
                  className="rounded-lg border border-border bg-secondary/40 p-2.5"
                >
                  <p className="text-xs font-medium text-foreground">
                    {c.title}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {c.meta}
                  </p>
                  <div className="mt-2 flex -space-x-1.5">
                    {c.avatars.map((seed) => (
                      <Avatar
                        key={seed}
                        className="size-5 ring-2 ring-card"
                      >
                        <AvatarImage src={dicebearAvatar(seed)} alt="" />
                        <AvatarFallback className="text-[9px]">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {c.extra ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[9px] font-medium text-muted-foreground ring-2 ring-card">
                        +{c.extra}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
              <div className="flex w-full items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-2 text-[11px] text-muted-foreground">
                <Icon icon="mdi:plus" className="size-3.5" />
                New projects start from a request below
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
