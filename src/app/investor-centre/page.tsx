import { AppShell } from "@/components/layout/app-shell";
import { LiveInvestor } from "@/components/investor/live-investor";
import { MeetingScheduler } from "@/components/investor/meeting-scheduler";
import { NewInquiryForm } from "@/components/investor/new-inquiry-form";
import { SecureDocuments } from "@/components/investor/secure-documents";

export default function InvestorCentrePage() {
  return (
    <AppShell
      title="Investor Centre"
      subtitle="Wealth planning. Smart decisions. Lasting growth."
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <p className="rounded-lg border border-gold/20 bg-gold/5 px-3.5 py-2 text-xs text-muted-foreground">
          <span className="font-medium text-gold">Note:</span> inquiries
          submitted here are reviewed and actioned by a human Aureon advisor —
          this is not automated investment advice.
        </p>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="flex flex-col gap-5 lg:col-span-2">
            <LiveInvestor />
            <MeetingScheduler />
          </div>

          <div className="flex flex-col gap-5">
            <NewInquiryForm />
            <SecureDocuments />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
