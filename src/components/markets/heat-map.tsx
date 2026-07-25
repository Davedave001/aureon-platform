import { SectionCard } from "@/components/shared/section-card";
import { heatMap } from "@/lib/markets-data";
import { cn } from "@/lib/utils";

// Intensity by magnitude of move — solid tiles, not a chart.
function tone(change: string, up: boolean) {
  const mag = Math.abs(parseFloat(change));
  if (up) {
    if (mag >= 3) return "bg-bull/35 text-foreground";
    if (mag >= 1) return "bg-bull/22 text-foreground";
    return "bg-bull/12 text-foreground";
  }
  if (mag >= 3) return "bg-bear/35 text-foreground";
  if (mag >= 1) return "bg-bear/22 text-foreground";
  return "bg-bear/12 text-foreground";
}

const span: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
};

export function HeatMap() {
  return (
    <SectionCard title="Market Heat Map">
      <div className="grid grid-cols-6 gap-1.5">
        {heatMap.map((h) => (
          <div
            key={h.symbol}
            className={cn(
              "flex flex-col items-center justify-center rounded-md px-1 py-3 text-center",
              span[h.weight] ?? "col-span-1",
              tone(h.change, h.up)
            )}
          >
            <span className="text-xs font-semibold">{h.symbol}</span>
            <span
              className={
                "text-[11px] font-medium " +
                (h.up ? "text-bull" : "text-bear")
              }
            >
              {h.change}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
