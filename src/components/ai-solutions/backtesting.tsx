import { Icon } from "@iconify/react";
import { SoonButton } from "@/components/shared/soon-button";
import { SectionCard } from "@/components/shared/section-card";

const steps = [
  {
    icon: "mdi:database-import-outline",
    title: "1. Load history",
    desc: "Reuse the trades you imported into the journal, or upload a data set.",
  },
  {
    icon: "mdi:tune-variant",
    title: "2. Define the strategy",
    desc: "Pick pairs, sessions, setups and risk rules to test against.",
  },
  {
    icon: "mdi:chart-line",
    title: "3. Review results",
    desc: "Expectancy, win rate, drawdown and an equity curve for the ruleset.",
  },
];

export function Backtesting() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Icon icon="mdi:flask-outline" className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Strategy Backtesting
            </h2>
            <p className="text-xs text-muted-foreground">
              Test a ruleset against real history before you risk capital.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <SoonButton className="gap-1.5">
            <Icon icon="mdi:play-outline" className="size-4" />
            Run a backtest
          </SoonButton>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Backtesting runs on the same engine as the journal. It activates once
          the coach service is connected to your account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <SectionCard key={s.title} title={s.title}>
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon icon={s.icon} className="size-4" />
              </div>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
