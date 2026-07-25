import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { inquiryTimeline } from "@/lib/investor-data";
import { cn } from "@/lib/utils";

export function InquiryTimeline() {
  return (
    <SectionCard title="Inquiry Timeline">
      <p className="mb-3 -mt-1 text-xs text-muted-foreground">
        Track the progress of your inquiry.
      </p>
      <ol className="space-y-4">
        {inquiryTimeline.map((step, i) => (
          <li key={step.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full",
                  step.done
                    ? "bg-bull/15 text-bull"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                <Icon
                  icon={step.done ? "mdi:check" : "mdi:clock-outline"}
                  className="size-3.5"
                />
              </span>
              {i < inquiryTimeline.length - 1 ? (
                <span
                  className={cn(
                    "mt-1 w-px flex-1",
                    step.done ? "bg-bull/30" : "bg-border"
                  )}
                />
              ) : null}
            </div>
            <div className="min-w-0 pb-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  step.done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground">{step.detail}</p>
              <p className="text-[11px] text-muted-foreground/70">
                {step.time}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
