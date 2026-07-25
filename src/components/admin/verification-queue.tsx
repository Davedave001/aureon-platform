import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SectionCard } from "@/components/shared/section-card";
import { verificationQueue } from "@/lib/admin-data";
import { dicebearAvatar } from "@/lib/images";

export function VerificationQueue() {
  return (
    <SectionCard title="Verification Queue" viewAllHref="/admin">
      <ul className="space-y-3">
        {verificationQueue.map((v) => (
          <li key={v.name} className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src={dicebearAvatar(v.name)} alt={v.name} />
              <AvatarFallback>{v.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {v.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {v.type}
              </p>
            </div>
            <Button size="sm" variant="outline" className="h-7 shrink-0 px-2.5 text-xs">
              Review
            </Button>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
