import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
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
        <Button size="sm" className="gap-1.5">
          <Icon icon="mdi:creation" className="size-4" />
          Summarize Article
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Icon icon="mdi:format-list-bulleted" className="size-4" />
          Generate Key Points
        </Button>
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
