import { AppShell } from "@/components/layout/app-shell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BillingStatsRow } from "@/components/billing/stats-row";
import { SubscriptionCard } from "@/components/billing/subscription-card";
import { InvoicesTable } from "@/components/billing/invoices-table";
import { PaymentHistoryTable } from "@/components/billing/payment-history-table";
import { ReceiptsList } from "@/components/billing/receipts-list";
import { PlansSidebar } from "@/components/billing/plans-sidebar";
import { CouponsList } from "@/components/billing/coupons-list";
import { PaymentMethodsList } from "@/components/billing/payment-methods";
import { AnnualBillingBanner } from "@/components/billing/annual-billing-banner";
import { billingTabs } from "@/lib/billing-data";

export default function BillingPage() {
  return (
    <AppShell
      title="Billing Centre"
      subtitle="Manage your subscriptions, payments, and billing preferences."
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <Tabs defaultValue="Overview">
          <TabsList variant="line" className="w-full overflow-x-auto">
            {billingTabs.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="Overview" className="mt-4">
            <div className="flex flex-col gap-5">
              <BillingStatsRow />
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="flex flex-col gap-5 lg:col-span-2">
                  <SubscriptionCard />
                  <InvoicesTable />
                  <PaymentHistoryTable />
                </div>
                <div className="flex flex-col gap-5">
                  <PlansSidebar />
                  <CouponsList />
                </div>
              </div>
              <AnnualBillingBanner />
            </div>
          </TabsContent>

          <TabsContent value="Subscriptions" className="mt-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <SubscriptionCard />
              </div>
              <PlansSidebar />
            </div>
          </TabsContent>

          <TabsContent value="Invoices" className="mt-4">
            <InvoicesTable />
          </TabsContent>

          <TabsContent value="Receipts" className="mt-4">
            <ReceiptsList />
          </TabsContent>

          <TabsContent value="Payment History" className="mt-4">
            <PaymentHistoryTable />
          </TabsContent>

          <TabsContent value="Payment Methods" className="mt-4">
            <div className="max-w-md">
              <PaymentMethodsList />
            </div>
          </TabsContent>

          <TabsContent value="Coupons" className="mt-4">
            <div className="max-w-md">
              <CouponsList />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
