import { SectionCard } from "@/components/shared/section-card";
import { trendingDiscussions } from "@/lib/community-data";

export function TrendingDiscussions() {
  return (
    <SectionCard title="Trending Discussions" viewAllHref="/community">
      <ol className="space-y-3">
        {trendingDiscussions.map((d, i) => (
          <li key={d.title} className="flex items-start gap-2.5">
            <span className="mt-0.5 text-sm font-bold text-muted-foreground/60">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-snug font-medium text-foreground">
                {d.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {d.comments} comments
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
