import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { projectCards, statusTone } from "@/lib/ai-solutions-data";
import { dicebearAvatar } from "@/lib/images";

export function ProjectCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {projectCards.map((p) => (
        <div key={p.name} className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
              <Icon icon={p.icon} className="size-[18px]" />
            </div>
            <Badge variant="outline" className={statusTone[p.status]}>
              {p.status}
            </Badge>
          </div>
          <p className="mt-3 text-sm font-semibold text-foreground">
            {p.name}
          </p>

          <div className="mt-2.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>{p.progress}% Complete</span>
          </div>
          <Progress value={p.progress} className="mt-1 [&_[data-slot=progress-track]]:h-1.5" />

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Avatar className="size-5">
                <AvatarImage src={dicebearAvatar(p.seed)} alt={p.engineer} />
                <AvatarFallback className="text-[10px]">
                  {p.engineer.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {p.engineer}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              Due {p.due}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
