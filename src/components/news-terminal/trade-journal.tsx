import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { tradeJournal } from "@/lib/news-terminal-data";

export function TradeJournal() {
  return (
    <SectionCard title="Trade Journal (Ideas Only — Not Live Trading)">
      <div className="mb-3 flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 border-bull/30 text-bull hover:bg-bull/10"
        >
          <Icon icon="mdi:arrow-up-bold-circle-outline" className="size-4" />
          Save Buy Idea
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 border-bear/30 text-bear hover:bg-bear/10"
        >
          <Icon icon="mdi:arrow-down-bold-circle-outline" className="size-4" />
          Save Sell Idea
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-1.5 pr-3 font-medium">Asset</th>
              <th className="py-1.5 pr-3 font-medium">Idea</th>
              <th className="py-1.5 pr-3 font-medium">Entry</th>
              <th className="py-1.5 pr-3 font-medium">Target</th>
              <th className="py-1.5 pr-3 font-medium">Stop Loss</th>
              <th className="py-1.5 pr-3 font-medium">Confidence</th>
              <th className="py-1.5 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {tradeJournal.map((t) => (
              <tr key={t.symbol} className="border-t border-border">
                <td className="py-2 pr-3">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <Icon icon={t.icon} className="size-4" />
                    {t.symbol}
                  </span>
                </td>
                <td className="py-2 pr-3 text-muted-foreground">{t.idea}</td>
                <td className="py-2 pr-3 text-foreground">{t.entry}</td>
                <td className="py-2 pr-3 text-bull">{t.target}</td>
                <td className="py-2 pr-3 text-bear">{t.stop}</td>
                <td className="py-2 pr-3">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        icon={i < t.confidence ? "mdi:star" : "mdi:star-outline"}
                        className="size-3.5 text-gold"
                      />
                    ))}
                  </span>
                </td>
                <td className="py-2 text-muted-foreground">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
