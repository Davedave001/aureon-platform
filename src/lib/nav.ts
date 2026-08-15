export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export const primaryNav: NavItem[] = [
  { label: "Dashboard", href: "/", icon: "mdi:view-dashboard" },
  { label: "Community Hub", href: "/community", icon: "mdi:account-group" },
  { label: "AI Solutions", href: "/ai-solutions", icon: "mdi:creation" },
  { label: "Investor Centre", href: "/investor-centre", icon: "mdi:bank" },
  { label: "Articles & Knowledge", href: "/articles", icon: "mdi:book-open-variant" },
  { label: "Events", href: "/events", icon: "mdi:calendar-month" },
  { label: "Watchlists", href: "/watchlists", icon: "mdi:heart-outline" },
  { label: "Markets", href: "/markets", icon: "mdi:chart-timeline-variant" },
];

export const secondaryNav: NavItem[] = [
  { label: "Billing & Subscriptions", href: "/billing", icon: "mdi:credit-card-outline" },
];
