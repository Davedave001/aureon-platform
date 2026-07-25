import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { investorInquiries } from "@/lib/investor-data";

const statusStyle: Record<string, string> = {
  "Meeting Scheduled": "border-primary/30 bg-primary/10 text-primary",
  "Under Review": "border-gold/30 bg-gold/10 text-gold",
  Completed: "border-bull/30 bg-bull/10 text-bull",
};

export function InquiriesTable() {
  return (
    <SectionCard title="My Investment Inquiries" viewAllHref="/investor-centre">
      <p className="mb-3 -mt-1 text-xs text-muted-foreground">
        Track the status of your investment inquiries.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-1.5 pr-3 font-medium">ID</th>
              <th className="py-1.5 pr-3 font-medium">Submitted On</th>
              <th className="py-1.5 pr-3 font-medium">Amount</th>
              <th className="py-1.5 pr-3 font-medium">Goal</th>
              <th className="py-1.5 pr-3 font-medium">Status</th>
              <th className="py-1.5 pr-3 font-medium">Advisor</th>
              <th className="py-1.5 font-medium">Next Step</th>
            </tr>
          </thead>
          <tbody>
            {investorInquiries.map((inq) => (
              <tr key={inq.id} className="border-t border-border">
                <td className="py-2 pr-3 font-medium text-foreground">
                  {inq.id}
                </td>
                <td className="py-2 pr-3 text-muted-foreground">
                  {inq.submitted}
                </td>
                <td className="py-2 pr-3 text-foreground">{inq.amount}</td>
                <td className="py-2 pr-3 text-muted-foreground">{inq.goal}</td>
                <td className="py-2 pr-3">
                  <Badge variant="outline" className={statusStyle[inq.status]}>
                    {inq.status}
                  </Badge>
                </td>
                <td className="py-2 pr-3 text-muted-foreground">
                  {inq.advisor}
                </td>
                <td className="py-2 text-muted-foreground">{inq.nextStep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
