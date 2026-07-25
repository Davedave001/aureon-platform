import { Icon } from "@iconify/react";
import { marketIndices } from "@/lib/markets-data";

export function IndicesStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {marketIndices.map((m) => (
        <div
          key={m.label}
          className="rounded-xl border border-border bg-card px-3.5 py-3"
        >
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <Icon icon={m.icon} className="size-3.5" />
            {m.label}
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {m.value}
          </p>
          <p
            className={
              "text-[11px] font-medium " + (m.up ? "text-bull" : "text-bear")
            }
          >
            {m.change}
          </p>
        </div>
      ))}
    </div>
  );
}
