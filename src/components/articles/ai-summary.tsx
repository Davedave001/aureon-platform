import { Icon } from "@iconify/react";
import { SoonButton } from "@/components/shared/soon-button";
import { SectionCard } from "@/components/shared/section-card";
import { keyTakeaways } from "@/lib/articles-data";

export function AiSummary() {
  return (
    <SectionCard title="AI Summary">
      <div className="mb-3 -mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon icon="mdi:creation" className="size-4 text-primary" />
        Get key insights from this article instantly.
      </div>
      <div className="flex flex-col gap-2">
        <SoonButton size="sm">
          <Icon icon="mdi:creation" className="size-4" />
          Summarize Article
        </SoonButton>
        <SoonButton size="sm" variant="outline">
          <Icon icon="mdi:format-list-bulleted" className="size-4" />
          Generate Key Points
        </SoonButton>
      </div>

      <p className="mt-4 mb-2 text-xs font-semibold text-foreground">
        Key Takeaways
      </p>
      <ul className="space-y-2">
        {keyTakeaways.map((k) => (
          <li key={k} className="flex items-start gap-2 text-xs text-foreground/90">
            <Icon icon="mdi:check-circle" className="mt-0.5 size-3.5 shrink-0 text-bull" />
            {k}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
