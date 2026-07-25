import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { mentors } from "@/lib/community-data";
import { dicebearAvatar } from "@/lib/images";

export function MentorDirectory() {
  return (
    <SectionCard title="Mentor Directory" viewAllHref="/community">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {mentors.map((m) => (
          <div
            key={m.name}
            className="flex flex-col rounded-xl border border-border p-3.5"
          >
            <Avatar className="size-12">
              <AvatarImage src={dicebearAvatar(m.seed)} alt={m.name} />
              <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="mt-2.5 flex items-center gap-1">
              <p className="text-sm font-semibold text-foreground">
                {m.name}
              </p>
              {m.verified ? (
                <Icon icon="mdi:check-decagram" className="size-4 text-primary" />
              ) : null}
            </div>
            <Badge
              variant="outline"
              className="mt-1 w-fit border-gold/30 bg-gold/10 text-[11px] text-gold"
            >
              {m.role}
            </Badge>

            <dl className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Expertise</dt>
                <dd className="text-foreground">{m.expertise}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Years Trading</dt>
                <dd className="text-foreground">{m.years}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Reputation</dt>
                <dd className="flex items-center gap-1 text-foreground">
                  <Icon icon="mdi:star" className="size-3.5 text-gold" />
                  {m.reputation}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Track Record</dt>
                <dd className="text-bull">Verified</dd>
              </div>
            </dl>

            <Button variant="outline" size="sm" className="mt-3 w-full">
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
