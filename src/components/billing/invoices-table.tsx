import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { invoices } from "@/lib/billing-data";

export function InvoicesTable() {
  return (
    <SectionCard title="Recent Invoices" viewAllHref="/billing">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-1.5 pr-3 font-medium">Invoice</th>
              <th className="py-1.5 pr-3 font-medium">Date</th>
              <th className="py-1.5 pr-3 font-medium">Amount</th>
              <th className="py-1.5 pr-3 font-medium">Status</th>
              <th className="py-1.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-border">
                <td className="py-2 pr-3 font-medium text-foreground">
                  {inv.id}
                </td>
                <td className="py-2 pr-3 text-muted-foreground">
                  {inv.date}
                </td>
                <td className="py-2 pr-3 text-foreground">{inv.amount}</td>
                <td className="py-2 pr-3">
                  <Badge className="bg-bull/15 text-bull hover:bg-bull/15">
                    {inv.status}
                  </Badge>
                </td>
                <td className="py-2 text-right">
                  <Icon
                    icon="mdi:download-outline"
                    className="inline size-4 text-muted-foreground"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
