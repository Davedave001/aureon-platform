export const articleCategories = [
  "All",
  "AI",
  "Forex",
  "Stocks",
  "Crypto",
  "Macroeconomics",
  "Trading Psychology",
  "Technology",
] as const;

export const article = {
  category: "AI",
  title: "How AI is Transforming Financial Markets in 2024",
  subtitle:
    "Exploring the impact of artificial intelligence on trading, investment strategies, and market efficiency.",
  author: "Alex Morgan",
  authorSeed: "alex-morgan-editorial",
  verified: true,
  date: "May 24, 2024",
  readTime: "8 min read",
  likes: 124,
  comments: 36,
  sections: [
    {
      heading: "1. Smarter Data Analysis",
      body: "AI algorithms can process vast amounts of market data in real-time, identifying patterns and trends that humans might miss. Machine learning models continuously learn from new data, improving accuracy in forecasting price movements and market behaviors.",
    },
    {
      heading: "2. Algorithmic Trading at Scale",
      body: "Automated strategies powered by AI can execute trades in milliseconds, reacting to market conditions far faster than manual trading. This has reshaped liquidity and price discovery across nearly every asset class.",
    },
    {
      heading: "3. Risk Management and Compliance",
      body: "Predictive models help institutions flag unusual activity earlier, tightening risk controls. Regulators and platforms alike are increasingly relying on AI-assisted monitoring to catch anomalies before they become systemic issues.",
    },
  ],
  intro:
    "Artificial Intelligence (AI) is no longer a futuristic concept in financial markets — it's here, and it's evolving faster than ever. From algorithmic trading to predictive analytics, AI technologies are reshaping how investors analyze data, manage risk, and make decisions.",
};

export const keyTakeaways = [
  "AI enhances market analysis by processing massive datasets.",
  "Algorithmic trading is more efficient and emotion-free.",
  "Predictive models improve risk management.",
  "Ethical use of AI and data privacy remain critical.",
];

export const relatedArticles = [
  { title: "Machine Learning Models Every Trader Should Know", readTime: "7 min read", image: "aiAbstractTech" as const },
  { title: "The Future of Algorithmic Trading", readTime: "6 min read", image: "tradingChartsScreen" as const },
  { title: "AI in Crypto Trading: Opportunities & Risks", readTime: "9 min read", image: "cryptoCoins" as const },
  { title: "Big Data in Finance: Turning Information into Alpha", readTime: "5 min read", image: "stockScreens" as const },
];

export const comments = [
  {
    author: "Sarah Johnson",
    seed: "sarah-johnson-reader",
    badge: "Pro Trader",
    time: "2 hours ago",
    text: "Great insights! AI is definitely changing the way we approach markets.",
    likes: 12,
  },
  {
    author: "Marcus Chen",
    seed: "marcus-chen-reader",
    badge: null,
    time: "5 hours ago",
    text: "Curious how smaller retail traders can actually access these tools without an enterprise budget.",
    likes: 4,
  },
];

export const newsletterTopics = [
  { key: "ai", label: "AI", checked: true },
  { key: "forex", label: "Forex", checked: true },
  { key: "stocks", label: "Stocks", checked: true },
  { key: "crypto", label: "Crypto", checked: true },
  { key: "macro", label: "Macroeconomics", checked: false },
  { key: "tech", label: "Technology", checked: true },
];

export const newsletterFrequency = ["Daily", "Weekly", "Bi-weekly", "Monthly"];

export const emailPreferences = [
  { key: "news", label: "News & Articles", checked: true },
  { key: "insights", label: "Market Insights", checked: true },
  { key: "events", label: "Events & Webinars", checked: true },
  { key: "product", label: "Product Updates", checked: false },
  { key: "promo", label: "Promotions", checked: false },
];
