import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";
import { receipts } from "@/lib/billing-data";

export function ReceiptsList() {
  return (
    <SectionCard title="Recent Receipts" viewAllHref="/billing">
      <ul className="space-y-3">
        {receipts.map((r) => (
          <li key={r.id} className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <Icon icon="mdi:receipt-text-outline" className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                Receipt #{r.id}
              </p>
              <p className="text-xs text-muted-foreground">{r.date}</p>
            </div>
            <span className="text-sm font-medium text-foreground">
              {r.amount}
            </span>
            <Icon
              icon="mdi:download-outline"
              className="size-4 shrink-0 text-muted-foreground"
            />
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
