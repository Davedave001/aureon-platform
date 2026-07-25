export const categories = [
  { name: "Forex", members: "25.6K members", icon: "mdi:currency-usd", tone: "sky" },
  { name: "Crypto", members: "42.3K members", icon: "mdi:bitcoin", tone: "gold" },
  { name: "Stocks", members: "38.7K members", icon: "mdi:domain", tone: "bull" },
  { name: "Commodities", members: "12.8K members", icon: "mdi:gold", tone: "amber" },
  { name: "Indices", members: "8.4K members", icon: "mdi:layers-outline", tone: "violet" },
  { name: "ETFs", members: "6.3K members", icon: "mdi:basket-outline", tone: "sky" },
  { name: "Options", members: "5.1K members", icon: "mdi:swap-vertical-bold", tone: "rose" },
  { name: "Futures", members: "4.7K members", icon: "mdi:fast-forward-outline", tone: "primary" },
] as const;

export const toneClasses: Record<string, string> = {
  primary: "bg-primary/12 text-primary",
  bull: "bg-bull/12 text-bull",
  gold: "bg-gold/15 text-gold",
  violet: "bg-violet-400/15 text-violet-400",
  sky: "bg-sky-400/15 text-sky-400",
  amber: "bg-amber-400/15 text-amber-400",
  rose: "bg-rose-400/15 text-rose-400",
};

export const mentors = [
  {
    name: "Alex M.",
    seed: "alex-morgan-aureon",
    role: "Aureon Mentor",
    expertise: "Forex, Macro",
    years: "10+ years",
    reputation: "4.9 (2.1K)",
    verified: true,
  },
  {
    name: "Luna Trader",
    seed: "luna-trader-aureon",
    role: "Professional Trader",
    expertise: "Crypto, DeFi",
    years: "6+ years",
    reputation: "4.8 (1.6K)",
    verified: true,
  },
  {
    name: "ChartKing",
    seed: "chartking-aureon",
    role: "Professional Trader",
    expertise: "Stocks, Options",
    years: "8+ years",
    reputation: "4.7 (1.2K)",
    verified: true,
  },
  {
    name: "MarketWizard",
    seed: "marketwizard-aureon",
    role: "Aureon Mentor",
    expertise: "Futures, Indices",
    years: "12+ years",
    reputation: "4.9 (3.3K)",
    verified: true,
  },
] as const;

export const verificationSubmissions = [
  { type: "Trading Track Record", status: "Approved", submitted: "May 18, 2024" },
  { type: "Broker Statements", status: "Pending Review", submitted: "May 18, 2024" },
  { type: "MyFxBook", status: "Approved", submitted: "May 17, 2024" },
  { type: "FXBlue", status: "Approved", submitted: "May 17, 2024" },
  { type: "TradingView", status: "Approved", submitted: "May 17, 2024" },
  { type: "Community Username (Skool)", status: "Approved", submitted: "May 17, 2024" },
] as const;

export const feedFilters = ["All", "Discussions", "Polls", "News", "Ideas"] as const;

export const feedPosts = [
  {
    type: "discussion" as const,
    author: "Alex M.",
    seed: "alex-morgan-aureon",
    role: "Aureon Mentor",
    verified: true,
    time: "2 days ago",
    pinned: true,
    title: "Weekly Forex Outlook (May 20 - May 26)",
    body: "Key levels, macro events, and trading opportunities to watch this week...",
    upvotes: 245,
    comments: 89,
  },
  {
    type: "poll" as const,
    author: "TraderNQ",
    seed: "tradernq-aureon",
    role: "Pro Trader",
    verified: true,
    time: "1 hour ago",
    title: "What's your strategy for trading NFP?",
    body: "Curious to see how the community plays this high volatility event.",
    options: [
      { label: "Fade the first move", pct: 28 },
      { label: "Trade the breakout", pct: 45 },
      { label: "Wait for confirmation", pct: 27 },
    ],
    upvotes: 128,
    comments: 56,
  },
  {
    type: "discussion" as const,
    author: "BullishBee",
    seed: "bullishbee-aureon",
    role: null,
    verified: true,
    time: "3 hours ago",
    title: "EURUSD hitting major resistance — thoughts?",
    body: "Price is reacting at the daily supply zone. Watching for confirmation...",
    upvotes: 64,
    comments: 22,
  },
];

export const trendingDiscussions = [
  { title: "Bitcoin breaks $67K as ETF inflows surge", comments: 128 },
  { title: "Gold hits record high — what's next?", comments: 97 },
  { title: "Best risk management rules you follow", comments: 86 },
  { title: "USDJPY technical analysis for this week", comments: 75 },
  { title: "Top 3 altcoins for this bull run?", comments: 68 },
];

export const popularPoll = {
  question: "Where do you see BTC heading next?",
  votes: "1.2K votes",
  daysLeft: "2 days left",
  options: [
    { label: "Above $75,000", pct: 42 },
    { label: "$60,000 - $75,000", pct: 36 },
    { label: "Below $60,000", pct: 22 },
  ],
};

export const recentActivity = [
  { text: "Replied to a discussion", meta: "EURUSD hitting major resistance", time: "10m ago" },
  { text: "Upvoted a post", meta: "Bitcoin breaks $67K as ETF inflows surge", time: "1h ago" },
  { text: "Commented on a poll", meta: "What's your strategy for NFP?", time: "2h ago" },
];

export const savedDiscussions = [
  { title: "Best forex brokers for 2024?", time: "Saved 2d ago" },
  { title: "Risk management tips that work", time: "Saved 5d ago" },
  { title: "Understanding order blocks", time: "Saved 1w ago" },
];

export const myCommunities = [
  { name: "Forex Community", members: "12.4K members", icon: "mdi:currency-usd", tone: "sky" },
  { name: "Crypto Community", members: "18.7K members", icon: "mdi:bitcoin", tone: "gold" },
  { name: "Stocks Community", members: "9.2K members", icon: "mdi:domain", tone: "bull" },
  { name: "Indices Community", members: "4.3K members", icon: "mdi:layers-outline", tone: "violet" },
];
