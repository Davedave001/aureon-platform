import { Icon } from "@iconify/react";
import { Progress } from "@/components/ui/progress";
import { SectionCard } from "@/components/shared/section-card";

const levels = [
  { label: "Verified Trader", icon: "mdi:check-decagram", tone: "text-bull" },
  { label: "Professional Trader", icon: "mdi:medal-outline", tone: "text-violet-400" },
  { label: "Aureon Mentor", icon: "mdi:crown-outline", tone: "text-gold" },
];

export function BadgeLevel() {
  return (
    <SectionCard title="Your Badge Level">
      <div className="flex flex-col items-center py-2 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-gold/12">
          <Icon icon="mdi:shield-check" className="size-8 text-gold" />
        </div>
        <p className="mt-2.5 text-sm font-semibold text-foreground">
          Professional Trader
        </p>
        <p className="text-xs text-muted-foreground">Aureon Mentor</p>
      </div>
      <p className="text-xs text-muted-foreground">Next badge: Aureon Mentor</p>
      <Progress
        value={75}
        className="mt-1.5 [&_[data-slot=progress-indicator]]:bg-gold [&_[data-slot=progress-track]]:h-2"
      />
      <p className="mt-1 text-right text-xs font-medium text-gold">75%</p>

      <ul className="mt-2 space-y-2 border-t border-border pt-3">
        {levels.map((l) => (
          <li key={l.label} className="flex items-center gap-2.5">
            <Icon icon={l.icon} className={`size-4 ${l.tone}`} />
            <span className="text-xs text-foreground">{l.label}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
