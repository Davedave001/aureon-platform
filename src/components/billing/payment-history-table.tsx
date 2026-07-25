import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { paymentHistory } from "@/lib/billing-data";

export function PaymentHistoryTable() {
  return (
    <SectionCard title="Payment History" viewAllHref="/billing">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-1.5 pr-3 font-medium">Date</th>
              <th className="py-1.5 pr-3 font-medium">Description</th>
              <th className="py-1.5 pr-3 font-medium">Method</th>
              <th className="py-1.5 pr-3 font-medium">Amount</th>
              <th className="py-1.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((p, i) => (
              <tr key={i} className="border-t border-border">
                <td className="py-2 pr-3 text-muted-foreground">{p.date}</td>
                <td className="py-2 pr-3 text-foreground">
                  {p.description}
                </td>
                <td className="py-2 pr-3 text-muted-foreground">
                  {p.method}
                </td>
                <td className="py-2 pr-3 text-foreground">{p.amount}</td>
                <td className="py-2">
                  <Badge className="bg-bull/15 text-bull hover:bg-bull/15">
                    {p.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
