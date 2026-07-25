import { Icon } from "@iconify/react";
import { Progress } from "@/components/ui/progress";
import { SectionCard } from "@/components/shared/section-card";

export function PortfolioProgress() {
  return (
    <SectionCard title="Portfolio Progress (Future)">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon icon="mdi:information-outline" className="size-3.5" />
        Preview of a feature coming soon
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-sm text-muted-foreground">Overall Progress</span>
        <span className="text-2xl font-bold text-bull">65%</span>
      </div>
      <Progress
        value={65}
        className="mt-2 [&_[data-slot=progress-indicator]]:bg-bull [&_[data-slot=progress-track]]:h-2"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        You&apos;re on track! Keep building your portfolio.
      </p>
    </SectionCard>
  );
}
