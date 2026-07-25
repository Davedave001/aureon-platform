export const projectCards = [
  {
    name: "Algo Backtesting Tool",
    icon: "mdi:cog-sync-outline",
    status: "Development" as const,
    progress: 75,
    engineer: "Sarah K.",
    seed: "sarah-k-aureon",
    due: "May 30, 2024",
  },
  {
    name: "Customer Support Bot",
    icon: "mdi:robot-outline",
    status: "Testing" as const,
    progress: 45,
    engineer: "James L.",
    seed: "james-l-aureon",
    due: "Jun 10, 2024",
  },
  {
    name: "AI Trading Signal Engine",
    icon: "mdi:radar",
    status: "Discovery" as const,
    progress: 20,
    engineer: "Michael T.",
    seed: "michael-t-aureon",
    due: "Jun 25, 2024",
  },
  {
    name: "Document Automation",
    icon: "mdi:file-cog-outline",
    status: "Requirements" as const,
    progress: 10,
    engineer: "Priya M.",
    seed: "priya-m-aureon",
    due: "Jun 15, 2024",
  },
];

export const statusTone: Record<string, string> = {
  Development: "border-primary/30 bg-primary/10 text-primary",
  Testing: "border-gold/30 bg-gold/10 text-gold",
  Discovery: "border-sky-400/30 bg-sky-400/10 text-sky-400",
  Requirements: "border-violet-400/30 bg-violet-400/10 text-violet-400",
};

export const workspaceStats = [
  { icon: "mdi:briefcase-outline", value: "4", label: "Active Projects" },
  { icon: "mdi:check-circle-outline", value: "2", label: "Completed" },
  { icon: "mdi:file-document-outline", value: "6", label: "Documents" },
  { icon: "mdi:calendar-month", value: "5", label: "Meetings This Month" },
  { icon: "mdi:message-outline", value: "128", label: "Messages" },
];

export const kanbanColumns = [
  {
    key: "discovery",
    label: "Discovery",
    cards: [
      { title: "AI Trading Signal Engine", meta: "Created May 6, 2024", avatars: ["michael-t-aureon"] },
      { title: "Market Sentiment Analyzer", meta: "Created May 8, 2024", avatars: ["priya-m-aureon"] },
    ],
  },
  {
    key: "requirements",
    label: "Requirements",
    cards: [
      { title: "Document Automation", meta: "Due Jun 15, 2024", avatars: ["priya-m-aureon"] },
      { title: "Risk Assessment AI", meta: "Due Jun 18, 2024", avatars: ["sarah-k-aureon"] },
    ],
  },
  {
    key: "development",
    label: "Development",
    cards: [
      { title: "Algo Backtesting Tool", meta: "Due May 30, 2024", avatars: ["sarah-k-aureon", "james-l-aureon"], extra: 2 },
      { title: "Portfolio Optimizer", meta: "Due Jun 12, 2024", avatars: ["michael-t-aureon"] },
      { title: "News Summarization AI", meta: "Due Jun 20, 2024", avatars: ["james-l-aureon"] },
    ],
  },
  {
    key: "testing",
    label: "Testing",
    cards: [
      { title: "Customer Support Bot", meta: "Due Jun 10, 2024", avatars: ["james-l-aureon", "priya-m-aureon"] },
      { title: "Trading Journal AI", meta: "Due Jun 14, 2024", avatars: ["sarah-k-aureon"] },
    ],
  },
  {
    key: "delivery",
    label: "Delivery",
    cards: [
      { title: "Automated Report Generator", meta: "Due May 28, 2024", avatars: ["michael-t-aureon"] },
    ],
  },
  {
    key: "maintenance",
    label: "Maintenance",
    cards: [
      { title: "AI Chat Assistant (Internal)", meta: "Ongoing", avatars: ["sarah-k-aureon"] },
    ],
  },
];

export const meetings = [
  {
    title: "Project Kickoff: Algo Backtesting Tool",
    date: "MAY 20",
    time: "10:00 - 11:00 AM (GMT+1)",
    attendees: ["sarah-k-aureon", "james-l-aureon", "michael-t-aureon"],
    extra: 2,
  },
  {
    title: "Requirements Review: Document Automation",
    date: "MAY 22",
    time: "2:00 - 3:00 PM (GMT+1)",
    attendees: ["priya-m-aureon"],
  },
  {
    title: "Testing Review: Customer Support Bot",
    date: "MAY 24",
    time: "11:30 AM - 12:30 PM (GMT+1)",
    attendees: ["james-l-aureon"],
  },
];

export const deliverableFilters = ["All", "Source Code", "Documentation", "Reports", "Videos", "Others"] as const;

export const deliverables = [
  { name: "backtesting-engine.zip", project: "Algo Backtesting Tool", type: "Source Code", uploaded: "May 18, 2024", size: "45.2 MB", icon: "mdi:folder-zip-outline" },
  { name: "User_Manual.pdf", project: "Algo Backtesting Tool", type: "Documentation", uploaded: "May 18, 2024", size: "3.1 MB", icon: "mdi:file-document-outline" },
  { name: "Performance_Report_May.pdf", project: "Algo Backtesting Tool", type: "Reports", uploaded: "May 17, 2024", size: "1.8 MB", icon: "mdi:clipboard-text-outline" },
  { name: "Demo_Walkthrough.mp4", project: "Customer Support Bot", type: "Videos", uploaded: "May 17, 2024", size: "24.6 MB", icon: "mdi:video-outline" },
  { name: "Deployment_Guide.pdf", project: "Customer Support Bot", type: "Documentation", uploaded: "May 16, 2024", size: "2.4 MB", icon: "mdi:file-document-outline" },
];

export const businessSizes = ["1-10 employees", "11-50 employees", "51-200 employees", "200+ employees"];

export const quickActions = [
  { icon: "mdi:lightbulb-on-outline", title: "Business Automation Advice", meta: "Get AI ideas to automate your business processes." },
  { icon: "mdi:robot-outline", title: "Trading Automation", meta: "Build or improve trading bots and strategies." },
  { icon: "mdi:creation", title: "Claude AI Assistant", meta: "Chat with Claude for advanced AI insights." },
  { icon: "mdi:file-search-outline", title: "Document Review", meta: "Upload documents for AI analysis and insights." },
  { icon: "mdi:script-text-outline", title: "Proposal Generator", meta: "Create professional proposals and statements." },
];
