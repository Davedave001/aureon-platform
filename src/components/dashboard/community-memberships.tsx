import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";

const communities = [
  { name: "Forex Community", members: "12.4K members", color: "bg-sky-400" },
  { name: "Crypto Community", members: "18.7K members", color: "bg-amber-400" },
  { name: "Stocks Community", members: "9.2K members", color: "bg-emerald-400" },
  { name: "AI in Trading", members: "6.1K members", color: "bg-violet-400" },
];

export function CommunityMemberships() {
  return (
    <SectionCard title="Active Community Memberships" viewAllHref="/community">
      <ul className="space-y-3">
        {communities.map((c) => (
          <li key={c.name} className="flex items-center gap-3">
            <span className={`size-2.5 shrink-0 rounded-full ${c.color}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {c.name}
              </p>
              <p className="text-xs text-muted-foreground">{c.members}</p>
            </div>
            <Badge
              variant="outline"
              className="border-bull/30 bg-bull/10 text-bull"
            >
              Active
            </Badge>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
