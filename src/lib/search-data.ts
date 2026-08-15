export const searchCategories = [
  { key: "All", icon: "mdi:text-search" },
  { key: "Communities", icon: "mdi:account-group" },
  { key: "Articles", icon: "mdi:file-document-outline" },
  { key: "News", icon: "mdi:newspaper-variant-outline" },
  { key: "Events", icon: "mdi:calendar-month" },
  { key: "Mentors", icon: "mdi:account-star-outline" },
  { key: "Projects", icon: "mdi:creation" },
  { key: "Users", icon: "mdi:account-outline" },
] as const;

export type SearchCategory = (typeof searchCategories)[number]["key"];

export type SearchResult = {
  category: Exclude<SearchCategory, "All">;
  icon: string;
  title: string;
  meta: string;
  href: string;
};

export const searchResults: SearchResult[] = [
  { category: "Communities", icon: "mdi:currency-usd", title: "Forex Community", meta: "25.6K members · Trading discussions", href: "/community" },
  { category: "Communities", icon: "mdi:bitcoin", title: "Crypto Community", meta: "42.3K members · Trading discussions", href: "/community" },
  { category: "Articles", icon: "mdi:file-document-outline", title: "How AI is Transforming Financial Markets in 2024", meta: "Article · 8 min read · by Alex Morgan", href: "/articles" },
  { category: "Articles", icon: "mdi:file-document-outline", title: "How Quantum Computing Will Affect Blockchain", meta: "Article · 8 min read · Technology", href: "/articles" },
  { category: "News", icon: "mdi:newspaper-variant-outline", title: "Bitcoin Breaks $67K as ETF Inflows Surge", meta: "News · Cointelegraph · 1h ago · Bullish", href: "/ai-solutions?tab=news" },
  { category: "News", icon: "mdi:newspaper-variant-outline", title: "Fed Signals Caution as Inflation Remains Sticky", meta: "News · Bloomberg · 2h ago · Bearish", href: "/ai-solutions?tab=news" },
  { category: "Events", icon: "mdi:calendar-month", title: "AI in Trading: Building Smarter Strategies", meta: "Webinar · May 28, 2024 · Free", href: "/events" },
  { category: "Events", icon: "mdi:calendar-month", title: "Options Trading Workshop", meta: "Workshop · Jun 15, 2024 · $149", href: "/events" },
  { category: "Mentors", icon: "mdi:account-star-outline", title: "Alex M.", meta: "Aureon Mentor · Forex, Macro · 4.9 rating", href: "/community" },
  { category: "Mentors", icon: "mdi:account-star-outline", title: "Luna Trader", meta: "Professional Trader · Crypto, DeFi · 4.8 rating", href: "/community" },
  { category: "Projects", icon: "mdi:creation", title: "Algo Backtesting Tool", meta: "AI Project · 75% complete · Sarah K.", href: "/ai-solutions" },
  { category: "Projects", icon: "mdi:creation", title: "AI Trading Signal Engine", meta: "AI Project · Discovery · Michael T.", href: "/ai-solutions" },
  { category: "Users", icon: "mdi:account-outline", title: "TraderNQ", meta: "Pro Trader · 2.1K followers · Verified", href: "/community" },
  { category: "Users", icon: "mdi:account-outline", title: "BullishBee", meta: "Member · 480 followers", href: "/community" },
];

export const recentSearches = ["BTC breakout", "risk management", "AI in Finance Webinar", "Forex Community"];

export const trendingSearches = ["NFP strategy", "ETF inflows", "Options Workshop", "Verified mentors", "Quantum computing"];
