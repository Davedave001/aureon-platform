export const investorStats = [
  {
    icon: "mdi:file-document-outline",
    label: "Submitted Requests",
    value: "2",
    meta: "View all requests",
    href: "/investor-centre",
  },
  {
    icon: "mdi:account-tie-outline",
    label: "Assigned Advisor",
    value: "Sarah Johnson",
    meta: "Senior Investment Advisor",
    href: "/investor-centre",
  },
  {
    icon: "mdi:calendar-check-outline",
    label: "Meeting Status",
    value: "Upcoming",
    meta: "May 24, 2024 · 10:00 AM",
    href: "/investor-centre",
  },
  {
    icon: "mdi:shield-alert-outline",
    label: "Risk Profile",
    value: "Moderate",
    meta: "Last updated: May 10, 2024",
    href: "/investor-centre",
  },
  {
    icon: "mdi:folder-outline",
    label: "Documents",
    value: "3 Uploaded",
    meta: "View all documents",
    href: "/investor-centre",
  },
  {
    icon: "mdi:bullseye-arrow",
    label: "Investment Preferences",
    value: "Balanced Growth",
    meta: "View preferences",
    href: "/investor-centre",
  },
];

export const investorInquiries = [
  {
    id: "INV-2024-0002",
    submitted: "May 15, 2024",
    amount: "$250,000",
    goal: "Long-term Growth",
    status: "Meeting Scheduled" as const,
    advisor: "Sarah Johnson",
    nextStep: "May 24, 2024",
  },
  {
    id: "INV-2024-0001",
    submitted: "May 02, 2024",
    amount: "$100,000",
    goal: "Wealth Preservation",
    status: "Under Review" as const,
    advisor: "Sarah Johnson",
    nextStep: "May 18, 2024",
  },
];

export const inquiryTimeline = [
  { label: "Submitted", detail: "Your inquiry has been submitted successfully.", time: "May 2, 2024 · 09:15 AM", done: true },
  { label: "Assigned", detail: "Your inquiry has been assigned to Sarah Johnson.", time: "May 2, 2024 · 11:20 AM", done: true },
  { label: "Reviewed", detail: "Your inquiry is under review by our team.", time: "May 3, 2024 · 02:30 PM", done: true },
  { label: "Meeting Scheduled", detail: "Your meeting has been scheduled.", time: "May 18, 2024 · 10:00 AM", done: true },
  { label: "Advisor Recommendation Ready", detail: "Your advisor is preparing personalized guidance.", time: "Pending", done: false },
  { label: "Completed", detail: "Your investment journey begins.", time: "Pending", done: false },
];

export const meetingTypes = [
  { key: "online", label: "Online Meeting", meta: "Meet via video call", icon: "mdi:video-outline" },
  { key: "office", label: "Office Visit", meta: "Meet at our office", icon: "mdi:office-building-outline" },
  { key: "phone", label: "Phone Consultation", meta: "Speak over the phone", icon: "mdi:phone-outline" },
] as const;

export const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

export const secureDocuments = [
  { name: "ID Document", meta: "Passport, Driver's License, etc.", status: "Uploaded" as const, icon: "mdi:card-account-details-outline" },
  { name: "KYC Document", meta: "Proof of address, Utility bill, etc.", status: "Uploaded" as const, icon: "mdi:file-check-outline" },
  { name: "Bank Documents", meta: "Bank statement, Account letter, etc.", status: "Pending" as const, icon: "mdi:bank-outline" },
];

export const investmentGoals = ["Long-term Growth", "Wealth Preservation", "Passive Income", "Retirement Planning"];
export const riskAppetites = ["Conservative", "Moderate", "Aggressive"];
export const investmentHorizons = ["Short-term (< 1 year)", "Medium-term (1-5 years)", "Long-term (5+ years)"];
export const preferredMarkets = ["Forex", "Crypto", "Stocks", "Commodities", "Diversified"];
