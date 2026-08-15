import { Icon } from "@iconify/react";
import { SoonButton } from "@/components/shared/soon-button";
import { SectionCard } from "@/components/shared/section-card";

const analytics = [
  {
    icon: "mdi:chart-bell-curve-cumulative",
    title: "Performance",
    desc: "Expectancy, risk-reward, drawdown and your equity curve.",
  },
  {
    icon: "mdi:brain",
    title: "Behaviour",
    desc: "Automatic revenge-trading and overtrading detection.",
  },
  {
    icon: "mdi:compass-outline",
    title: "Edge discovery",
    desc: "Which pairs, sessions, setups and emotions actually make you money.",
  },
  {
    icon: "mdi:robot-happy-outline",
    title: "AI Coach report",
    desc: "A written review of your trading with concrete, personalised actions.",
  },
];

export function TradingJournal() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Icon icon="mdi:notebook-edit-outline" className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              MCP Trading Journal
            </h2>
            <p className="text-xs text-muted-foreground">
              Import your MetaTrader history and let the AI coach analyse it.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <SoonButton className="gap-1.5">
            <Icon icon="mdi:file-upload-outline" className="size-4" />
            Import MT5 trades
          </SoonButton>
          <SoonButton variant="outline" className="gap-1.5">
            <Icon icon="mdi:file-document-outline" className="size-4" />
            Generate coach report
          </SoonButton>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          The analytics engine is ready. Live import connects once the coach
          service is deployed with your account — that step is coming next.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {analytics.map((a) => (
          <SectionCard key={a.title} title={a.title}>
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon icon={a.icon} className="size-4" />
              </div>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
