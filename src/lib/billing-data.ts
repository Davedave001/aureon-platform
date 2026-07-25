export const currentSubscription = {
  plan: "News Terminal Pro",
  status: "Active" as const,
  price: "$49.00",
  cycle: "Monthly",
  nextBilling: "Jun 15, 2024",
  paymentMethod: "Visa •••• 4242",
  description:
    "Full access to market data, AI insights, charts, watchlists, and more.",
};

export const billingStats = [
  {
    icon: "mdi:crown-outline",
    label: "Current Plan",
    value: "News Terminal Pro",
    meta: "Active",
    detail: "Next billing on Jun 15, 2024 · $49.00/month",
    href: "Manage Subscription",
  },
  {
    icon: "mdi:credit-card-outline",
    label: "Last Payment",
    value: "$49.00",
    meta: "May 15, 2024",
    detail: "Visa •••• 4242",
    href: "View Receipt",
  },
  {
    icon: "mdi:receipt-text-outline",
    label: "Invoices",
    value: "12",
    meta: "Total Invoices",
    detail: "$588.00 paid",
    href: "View All Invoices",
  },
  {
    icon: "mdi:cash-multiple",
    label: "Total Spent",
    value: "$588.00",
    meta: "This Year",
    detail: "vs. $472.00 last year",
    href: "Spending Overview",
  },
];

export const invoices = [
  { id: "INV-2024-00125", date: "May 15, 2024", amount: "$49.00", status: "Paid" as const },
  { id: "INV-2024-00098", date: "Apr 15, 2024", amount: "$49.00", status: "Paid" as const },
  { id: "INV-2024-00071", date: "Mar 15, 2024", amount: "$49.00", status: "Paid" as const },
  { id: "INV-2024-00044", date: "Feb 15, 2024", amount: "$49.00", status: "Paid" as const },
  { id: "INV-2024-00017", date: "Jan 15, 2024", amount: "$49.00", status: "Paid" as const },
];

export const paymentHistory = [
  { date: "May 15, 2024", description: "News Terminal Pro – Monthly", method: "Visa •••• 4242", amount: "$49.00", status: "Successful" as const },
  { date: "Apr 15, 2024", description: "News Terminal Pro – Monthly", method: "Visa •••• 4242", amount: "$49.00", status: "Successful" as const },
  { date: "Mar 15, 2024", description: "News Terminal Pro – Monthly", method: "Mastercard •••• 8888", amount: "$49.00", status: "Successful" as const },
  { date: "Feb 15, 2024", description: "News Terminal Pro – Monthly", method: "Visa •••• 4242", amount: "$49.00", status: "Successful" as const },
  { date: "Jan 15, 2024", description: "News Terminal Pro – Monthly", method: "Visa •••• 4242", amount: "$49.00", status: "Successful" as const },
];

export const receipts = [
  { id: "RCPT-2024-00125", date: "May 15, 2024", amount: "$49.00" },
  { id: "RCPT-2024-00098", date: "Apr 15, 2024", amount: "$49.00" },
  { id: "RCPT-2024-00071", date: "Mar 15, 2024", amount: "$49.00" },
  { id: "RCPT-2024-00044", date: "Feb 15, 2024", amount: "$49.00" },
  { id: "RCPT-2024-00017", date: "Jan 15, 2024", amount: "$49.00" },
];

export const plans = [
  {
    name: "News Terminal Basic",
    price: "$19",
    features: ["Real-time market news", "Basic watchlists", "Daily newsletter"],
    current: false,
    popular: false,
  },
  {
    name: "News Terminal Pro",
    price: "$49",
    features: ["Everything in Basic", "Advanced charts & indicators", "AI market insights", "Custom watchlists", "Economic calendar"],
    current: true,
    popular: true,
  },
  {
    name: "News Terminal Elite",
    price: "$99",
    features: ["Everything in Pro", "AI trade ideas & signals", "Portfolio analytics", "Priority support", "Exclusive events"],
    current: false,
    popular: false,
  },
];

export const coupons = [
  { code: "SAVE20", meta: "20% off on annual plans", valid: "Valid until Jun 30, 2024" },
  { code: "WELCOME10", meta: "10% off on first payment", valid: "Valid for new users only" },
];

export const paymentMethods = [
  { brand: "Visa", last4: "4242", expiry: "08/26", primary: true },
  { brand: "Mastercard", last4: "8888", expiry: "11/25", primary: false },
];

export const billingTabs = [
  "Overview",
  "Subscriptions",
  "Invoices",
  "Receipts",
  "Payment History",
  "Payment Methods",
  "Coupons",
] as const;
