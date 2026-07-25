import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { verificationSubmissions } from "@/lib/community-data";

const statusStyle: Record<string, string> = {
  Approved: "border-bull/30 bg-bull/10 text-bull",
  "Pending Review": "border-gold/30 bg-gold/10 text-gold",
  Rejected: "border-destructive/30 bg-destructive/10 text-destructive",
};

export function VerificationCenter() {
  return (
    <SectionCard
      title="Verification Center"
      className="lg:col-span-2"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Submit your trading credentials for review
        </p>
        <Button size="sm" className="gap-1.5">
          <Icon icon="mdi:upload-outline" className="size-4" />
          Submit for Verification
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-1.5 font-medium">Submission Type</th>
              <th className="py-1.5 font-medium">Status</th>
              <th className="py-1.5 font-medium">Submitted On</th>
              <th className="py-1.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {verificationSubmissions.map((s) => (
              <tr key={s.type} className="border-t border-border">
                <td className="py-2 pr-3 text-foreground">{s.type}</td>
                <td className="py-2 pr-3">
                  <Badge variant="outline" className={statusStyle[s.status]}>
                    {s.status}
                  </Badge>
                </td>
                <td className="py-2 pr-3 text-muted-foreground">
                  {s.submitted}
                </td>
                <td className="py-2 text-right">
                  <Icon
                    icon="mdi:eye-outline"
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
