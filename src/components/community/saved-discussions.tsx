import { SectionCard } from "@/components/shared/section-card";
import { savedDiscussions } from "@/lib/community-data";

export function SavedDiscussions() {
  return (
    <SectionCard title="Saved Discussions" viewAllHref="/community">
      <ul className="space-y-3">
        {savedDiscussions.map((d) => (
          <li key={d.title} className="flex items-center justify-between gap-3">
            <p className="truncate text-sm text-foreground">{d.title}</p>
            <span className="shrink-0 text-xs text-muted-foreground">
              {d.time}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
