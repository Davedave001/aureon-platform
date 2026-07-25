export const adminNav = {
  management: [
    { label: "User Management", href: "/admin", icon: "mdi:account-group" },
    { label: "Verification Queue", href: "/admin", icon: "mdi:shield-check-outline" },
    { label: "Investor CRM", href: "/admin", icon: "mdi:bullseye-arrow" },
    { label: "AI Projects", href: "/admin", icon: "mdi:creation" },
  ],
  content: [
    { label: "Content Management", href: "/admin", icon: "mdi:file-document-outline" },
    { label: "Community Management", href: "/admin", icon: "mdi:account-multiple-outline" },
    { label: "Event Management", href: "/admin", icon: "mdi:calendar-month" },
  ],
  finance: [
    { label: "Payments", href: "/admin", icon: "mdi:credit-card-outline" },
    { label: "Refunds", href: "/admin", icon: "mdi:cash-refund" },
    { label: "Reports", href: "/admin", icon: "mdi:clipboard-text-outline" },
  ],
  system: [{ label: "System Settings", href: "/admin", icon: "mdi:cog-outline" }],
};

export const adminStats = [
  { icon: "mdi:cash-multiple", label: "Total Revenue", value: "$1,248,590", trend: "+12.5%" },
  { icon: "mdi:account-group", label: "Active Subscribers", value: "18,732", trend: "+8.2%" },
  { icon: "mdi:account-multiple-outline", label: "Communities", value: "2,845", trend: "+5.7%" },
  { icon: "mdi:calendar-month", label: "Events", value: "128", trend: "+11.3%" },
  { icon: "mdi:file-document-outline", label: "Articles", value: "536", trend: "+7.9%" },
  { icon: "mdi:bullseye-arrow", label: "Investor Inquiries", value: "314", trend: "+9.1%" },
  { icon: "mdi:creation", label: "AI Projects", value: "92", trend: "+14.3%" },
];

export const platformOverview = {
  period: "Last 30 days",
  metrics: [
    { label: "Revenue", value: "$1.25M", trend: "+12.5%", tone: "primary" as const },
    { label: "Subscribers", value: "18,732", trend: "+8.2%", tone: "bull" as const },
    { label: "Users", value: "45,892", trend: "+15.3%", tone: "gold" as const },
  ],
};

export const recentActivity = [
  { icon: "mdi:account-plus-outline", text: "New user registered", meta: "john.doe@example.com", time: "2 mins ago" },
  { icon: "mdi:creation", text: "AI project created", meta: "AI Trading Bot Development", time: "8 mins ago" },
  { icon: "mdi:bullseye-arrow", text: "Investor inquiry submitted", meta: "High-Net-Worth Portfolio", time: "15 mins ago" },
  { icon: "mdi:cash-multiple", text: "Payment received", meta: "$149.00 from Premium Plan", time: "22 mins ago" },
  { icon: "mdi:calendar-month", text: "Event created", meta: "Webinar: AI in Trading", time: "1 hour ago" },
];

export const verificationQueue = [
  { name: "John Smith", type: "Track Record + Broker Statement", time: "2 mins ago" },
  { name: "Sarah Johnson", type: "Broker Statement", time: "10 mins ago" },
  { name: "Michael Brown", type: "Track Record", time: "15 mins ago" },
  { name: "David Wilson", type: "MyFxBook + Statement", time: "30 mins ago" },
  { name: "Emily Davis", type: "Track Record", time: "45 mins ago" },
];

export const analyticsOverview = [
  { label: "User Growth", value: "23,456", trend: "+15.3%" },
  { label: "Revenue", value: "$1.25M", trend: "+12.5%" },
  { label: "MRR", value: "$312,500", trend: "+10.8%" },
  { label: "Engagement Rate", value: "68.4%", trend: "+6.2%" },
  { label: "Community Growth", value: "2,845", trend: "+5.7%" },
  { label: "Conversion Rate", value: "3.24%", trend: "+7.1%" },
];

export const managementCards = [
  {
    title: "User Management",
    icon: "mdi:account-group",
    stats: [
      { label: "Total Users", value: "45,892" },
      { label: "Pending Approval", value: "128" },
      { label: "Suspended", value: "34" },
    ],
    actions: ["Approve Users", "Suspend Users", "Roles & Permissions"],
    href: "Manage Users",
  },
  {
    title: "Investor CRM",
    icon: "mdi:bullseye-arrow",
    stats: [
      { label: "Active Inquiries", value: "314" },
      { label: "Pending Assignment", value: "27" },
      { label: "Meetings Scheduled", value: "89" },
    ],
    actions: ["View Pipeline", "Assignments", "Meeting Notes"],
    href: "Open CRM",
  },
  {
    title: "AI Projects",
    icon: "mdi:creation",
    stats: [
      { label: "Total Projects", value: "92" },
      { label: "In Progress", value: "41" },
      { label: "Completed", value: "23" },
    ],
    actions: ["Assign Engineers", "Update Progress", "Time Tracking"],
    href: "Manage Projects",
  },
  {
    title: "Content Management",
    icon: "mdi:file-document-outline",
    stats: [
      { label: "Articles", value: "536" },
      { label: "News", value: "124" },
      { label: "Newsletters", value: "32" },
    ],
    actions: ["Manage Articles", "Manage News", "Categories"],
    href: "Manage Content",
  },
  {
    title: "Community Management",
    icon: "mdi:account-multiple-outline",
    stats: [
      { label: "Total Communities", value: "2,845" },
      { label: "Active Moderators", value: "156" },
      { label: "Reported Posts", value: "23" },
    ],
    actions: ["Manage Communities", "Moderators", "Reports"],
    href: "Manage Communities",
  },
  {
    title: "Event Management",
    icon: "mdi:calendar-month",
    stats: [
      { label: "Upcoming", value: "128" },
      { label: "Pending Approval", value: "12" },
      { label: "Total Attendees", value: "8,562" },
    ],
    actions: ["Approve Events", "Events Calendar", "Attendance"],
    href: "Manage Events",
  },
  {
    title: "Payments Overview",
    icon: "mdi:credit-card-outline",
    stats: [
      { label: "Total Transactions", value: "12,456" },
      { label: "Refunds", value: "125" },
      { label: "Pending Payouts", value: "$45,230" },
    ],
    actions: ["View Transactions", "Refund Requests", "Payouts"],
    href: "Manage Payments",
  },
  {
    title: "Reports & Analytics",
    icon: "mdi:clipboard-text-outline",
    stats: [
      { label: "Scheduled Reports", value: "18" },
      { label: "Data Exports", value: "42" },
      { label: "Real-time Feeds", value: "6" },
    ],
    actions: ["Generate Reports", "Custom Analytics", "Data Export"],
    href: "View Reports",
  },
];

export const recentUsers = [
  { name: "John Doe", email: "john.doe@example.com", joined: "Jun 6, 2024", status: "Active" as const, verification: "Verified" as const },
  { name: "Sarah Johnson", email: "sarah.j@example.com", joined: "Jun 6, 2024", status: "Active" as const, verification: "Pending" as const },
  { name: "Michael Brown", email: "michael.b@example.com", joined: "Jun 5, 2024", status: "Active" as const, verification: "Verified" as const },
  { name: "Emily Davis", email: "emily.d@example.com", joined: "Jun 5, 2024", status: "Suspended" as const, verification: "Rejected" as const },
  { name: "David Wilson", email: "david.w@example.com", joined: "Jun 4, 2024", status: "Active" as const, verification: "Verified" as const },
];

export const recentAiProjects = [
  { project: "AI Trading Bot", client: "Quantum Capital", status: "In Progress" as const, progress: 75, due: "Jun 15, 2024" },
  { project: "Market Analysis AI", client: "Global Markets Inc.", status: "In Progress" as const, progress: 60, due: "Jun 20, 2024" },
  { project: "Sentiment Analyzer", client: "Investor Pro", status: "Review" as const, progress: 90, due: "Jun 10, 2024" },
  { project: "Portfolio Optimizer", client: "Wealth Partners", status: "Development" as const, progress: 40, due: "Jun 25, 2024" },
  { project: "Risk Assessment AI", client: "Alpha Traders", status: "Planning" as const, progress: 15, due: "Jul 5, 2024" },
];

export const systemStatus = [
  { label: "Website", status: "Operational" as const },
  { label: "API Services", status: "Operational" as const },
  { label: "Database", status: "Operational" as const },
  { label: "AI Services", status: "Operational" as const },
  { label: "Email Services", status: "Operational" as const },
  { label: "Payment Gateway", status: "Operational" as const },
];

export const quickActions = [
  { label: "Create Announcement", icon: "mdi:bullhorn-outline" },
  { label: "Export Data", icon: "mdi:export-variant" },
  { label: "System Backup", icon: "mdi:backup-restore" },
  { label: "Clear Cache", icon: "mdi:broom" },
  { label: "View Logs", icon: "mdi:text-box-search-outline" },
  { label: "Maintenance Mode", icon: "mdi:wrench-outline" },
];
