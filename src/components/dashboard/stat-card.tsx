import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon,
  value,
  label,
  trend,
  tone = "primary",
}: {
  icon: string;
  value: string;
  label: string;
  trend?: string;
  tone?: "primary" | "bull" | "gold" | "violet" | "blue";
}) {
  const toneClasses: Record<string, string> = {
    primary: "bg-primary/12 text-primary",
    bull: "bg-bull/12 text-bull",
    gold: "bg-gold/15 text-gold",
    violet: "bg-violet-400/15 text-violet-400",
    blue: "bg-sky-400/15 text-sky-400",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full",
            toneClasses[tone]
          )}
        >
          <Icon icon={icon} className="size-[18px]" />
        </div>
        <div className="min-w-0">
          <p className="text-xl font-bold text-foreground">{value}</p>
          <p className="truncate text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
      {trend ? (
        <p className="mt-2 text-[11px] font-medium text-bull">↑ {trend}</p>
      ) : null}
    </div>
  );
}
