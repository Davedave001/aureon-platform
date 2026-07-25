import { AppShell } from "@/components/layout/app-shell";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { StatCard } from "@/components/dashboard/stat-card";
import { PortfolioProgress } from "@/components/dashboard/portfolio-progress";
import { CommunityMemberships } from "@/components/dashboard/community-memberships";
import { LatestNews } from "@/components/dashboard/latest-news";
import { UpcomingEvents } from "@/components/dashboard/upcoming-events";
import { LatestArticles } from "@/components/dashboard/latest-articles";
import { AiRecommendations } from "@/components/dashboard/ai-recommendations";
import { SubscriptionStatus } from "@/components/dashboard/subscription-status";
import { InvestorStatus } from "@/components/dashboard/investor-status";
import { NotificationsPreview } from "@/components/dashboard/notifications-preview";

const stats = [
  { icon: "mdi:account-group", value: "12", label: "Communities Joined", trend: "2 this month", tone: "primary" as const },
  { icon: "mdi:book-open-variant", value: "28", label: "Articles Read", trend: "5 this month", tone: "blue" as const },
  { icon: "mdi:calendar-month", value: "4", label: "Events Registered", trend: "1 this month", tone: "gold" as const },
  { icon: "mdi:lightbulb-on-outline", value: "15", label: "Saved Trade Ideas", trend: "3 this month", tone: "bull" as const },
  { icon: "mdi:creation", value: "3", label: "AI Projects", trend: "1 active", tone: "violet" as const },
];

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="Welcome back, David. Here's your platform overview."
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <WelcomeBanner />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <PortfolioProgress />
          <CommunityMemberships />
          <LatestNews />
          <UpcomingEvents />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <LatestArticles />
          <AiRecommendations />
          <SubscriptionStatus />
          <InvestorStatus />
          <NotificationsPreview />
        </div>
      </div>
    </AppShell>
  );
}
