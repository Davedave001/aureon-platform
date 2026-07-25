import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";

const steps = [
  { label: "Submitted", done: true },
  { label: "Assigned to Advisor", done: true },
  { label: "Review in Progress", done: true },
  { label: "Consultation Pending", done: false },
];

export function InvestorStatus() {
  return (
    <SectionCard title="Investor Inquiry Status" viewAllHref="/investor-centre">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">INV-2024-0892</p>
        <Badge
          variant="outline"
          className="border-gold/30 bg-gold/10 text-gold"
        >
          Under Review
        </Badge>
      </div>
      <ul className="mt-3 space-y-2.5">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5">
            <span
              className={
                "size-2 shrink-0 rounded-full " +
                (s.done ? "bg-bull" : "bg-muted-foreground/40")
              }
            />
            <span
              className={
                "text-xs " +
                (s.done ? "text-foreground" : "text-muted-foreground")
              }
            >
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
