import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SoonButton } from "@/components/shared/soon-button";
import { SectionCard } from "@/components/shared/section-card";
import { meetings } from "@/lib/ai-solutions-data";
import { dicebearAvatar } from "@/lib/images";

export function MeetingsList() {
  return (
    <SectionCard title="Meetings" viewAllHref="/ai-solutions">
      <ul className="space-y-3.5">
        {meetings.map((m) => (
          <li key={m.title} className="flex items-center gap-3">
            <div className="flex w-12 shrink-0 flex-col items-center rounded-lg border border-border py-1">
              <span className="text-[10px] font-semibold text-primary">
                {m.date.split(" ")[0]}
              </span>
              <span className="text-sm font-bold text-foreground">
                {m.date.split(" ")[1]}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {m.title}
              </p>
              <p className="text-xs text-muted-foreground">{m.time}</p>
              <div className="mt-1 flex -space-x-1.5">
                {m.attendees.map((seed) => (
                  <Avatar key={seed} className="size-5 ring-2 ring-card">
                    <AvatarImage src={dicebearAvatar(seed)} alt="" />
                    <AvatarFallback className="text-[9px]">AI</AvatarFallback>
                  </Avatar>
                ))}
                {m.extra ? (
                  <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[9px] font-medium text-muted-foreground ring-2 ring-card">
                    +{m.extra}
                  </span>
                ) : null}
              </div>
            </div>
            <SoonButton size="sm" className="h-7 shrink-0 px-2 text-xs">
              <Icon icon="mdi:video-outline" className="size-3.5" />
              Join
            </SoonButton>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
