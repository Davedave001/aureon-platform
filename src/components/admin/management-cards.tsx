import Link from "next/link";
import { Icon } from "@iconify/react";
import { managementCards } from "@/lib/admin-data";

export function ManagementCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {managementCards.map((c) => (
        <div key={c.title} className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Icon icon={c.icon} className="size-4" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              {c.title}
            </p>
          </div>

          <dl className="mt-3 space-y-1.5">
            {c.stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-xs">
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="font-medium text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {c.actions.map((a) => (
              <span
                key={a}
                className="rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground"
              >
                {a}
              </span>
            ))}
          </div>

          <Link
            href={c.href}
            className="mt-3 flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline"
          >
            Open {c.title}
            <Icon icon="mdi:chevron-right" className="size-3" />
          </Link>
        </div>
      ))}
    </div>
  );
}
