export const settingsTabs = [
  { key: "Account", icon: "mdi:account-outline" },
  { key: "Notifications", icon: "mdi:bell-cog-outline" },
  { key: "Security", icon: "mdi:shield-lock-outline" },
  { key: "Privacy", icon: "mdi:eye-outline" },
  { key: "Appearance", icon: "mdi:palette-outline" },
] as const;

export const notificationSettings = [
  { key: "email-news", label: "News & Articles", desc: "Weekly market insights and new articles", on: true },
  { key: "email-community", label: "Community Replies", desc: "When someone replies to your posts", on: true },
  { key: "email-mentions", label: "Mentions", desc: "When you're @mentioned in a discussion", on: true },
  { key: "email-investment", label: "Investment Updates", desc: "Status changes on your inquiries", on: true },
  { key: "email-events", label: "Events & Webinars", desc: "Reminders for events you registered for", on: false },
  { key: "email-product", label: "Product Updates", desc: "New features and platform changes", on: false },
  { key: "email-promo", label: "Promotions", desc: "Offers and discounts", on: false },
];

export const connectedAccounts = [
  { name: "Google", icon: "mdi:google", connected: true, detail: "omondidavid271@gmail.com" },
  { name: "TradingView", icon: "mdi:chart-line", connected: true, detail: "@davidO" },
  { name: "Skool", icon: "mdi:school-outline", connected: false, detail: "Not connected" },
];

export const activeSessions = [
  { device: "Chrome · Windows", icon: "mdi:laptop", location: "London, UK", current: true, time: "Active now" },
  { device: "Safari · iPhone", icon: "mdi:cellphone", location: "London, UK", current: false, time: "2 hours ago" },
  { device: "Chrome · macOS", icon: "mdi:monitor", location: "Manchester, UK", current: false, time: "Yesterday" },
];

export const themeOptions = [
  { key: "dark", label: "Dark", icon: "mdi:weather-night" },
  { key: "light", label: "Light", icon: "mdi:white-balance-sunny" },
  { key: "system", label: "System", icon: "mdi:laptop" },
];

export const privacyToggles = [
  { key: "public-profile", label: "Public profile", desc: "Allow anyone to view your profile and posts", on: true },
  { key: "show-activity", label: "Show activity status", desc: "Let others see when you're online", on: true },
  { key: "show-track-record", label: "Show verified track record", desc: "Display your verified stats on your profile", on: true },
  { key: "searchable", label: "Appear in search", desc: "Let members find you via universal search", on: true },
  { key: "data-analytics", label: "Usage analytics", desc: "Help improve the platform with anonymous usage data", on: false },
];
