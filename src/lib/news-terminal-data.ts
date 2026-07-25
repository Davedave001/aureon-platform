export const tickerStrip = [
  { label: "S&P 500", value: "5,278.40", change: "+0.62%", up: true, icon: "mdi:bank-outline" },
  { label: "NASDAQ 100", value: "18,669.40", change: "+0.74%", up: true, icon: "mdi:domain" },
  { label: "DOW JONES", value: "39,985.27", change: "+0.35%", up: true, icon: "mdi:bank-outline" },
  { label: "EUR/USD", value: "1.0845", change: "-0.21%", up: false, icon: "mdi:currency-eur" },
  { label: "BTC/USD", value: "67,842.21", change: "+1.18%", up: true, icon: "cryptocurrency-color:btc" },
  { label: "GOLD", value: "2,345.70", change: "+0.41%", up: true, icon: "mdi:gold" },
  { label: "OIL (WTI)", value: "78.35", change: "-0.32%", up: false, icon: "mdi:oil" },
];

export const marketMovers = {
  gainers: [
    { symbol: "NVDA", name: "NVIDIA Corp.", change: "+5.21%", price: "1,105.44" },
    { symbol: "TSLA", name: "Tesla, Inc.", change: "+3.28%", price: "175.43" },
    { symbol: "COIN", name: "Coinbase Global", change: "+7.64%", price: "244.18" },
    { symbol: "META", name: "Meta Platforms", change: "+2.11%", price: "497.30" },
    { symbol: "AAPL", name: "Apple Inc.", change: "+1.39%", price: "195.95" },
  ],
  losers: [
    { symbol: "JNJ", name: "Johnson & Johnson", change: "-0.21%", price: "147.85" },
    { symbol: "LLY", name: "Eli Lilly", change: "-0.29%", price: "812.10" },
    { symbol: "XOM", name: "Exxon Mobil", change: "-0.32%", price: "118.02" },
    { symbol: "CVX", name: "Chevron Corp.", change: "-0.28%", price: "156.44" },
  ],
  active: [
    { symbol: "AAPL", name: "Apple Inc.", change: "+1.39%", price: "195.95" },
    { symbol: "TSLA", name: "Tesla, Inc.", change: "+3.28%", price: "175.43" },
    { symbol: "NVDA", name: "NVIDIA Corp.", change: "+5.21%", price: "1,105.44" },
    { symbol: "AMD", name: "Advanced Micro Devices", change: "+0.94%", price: "168.20" },
  ],
};

export const aiNewsFeed = [
  {
    headline: "Fed Signals Caution as Inflation Remains Sticky",
    source: "Bloomberg",
    time: "10m ago",
    sentiment: "Bearish" as const,
    confidence: 82,
    affected: ["USD", "Stocks", "Bonds"],
    body: "The Federal Reserve indicated it will maintain higher rates for longer as core inflation pressures persist...",
  },
  {
    headline: "Bitcoin Breaks $67K as ETF Inflows Surge",
    source: "Cointelegraph",
    time: "1h ago",
    sentiment: "Bullish" as const,
    confidence: 76,
    affected: ["BTC", "ETH", "COIN"],
    body: "Bitcoin rallies above $67,000 as spot ETF inflows hit record levels, signaling strong institutional demand...",
  },
  {
    headline: "OPEC+ Extends Oil Production Cuts",
    source: "Reuters",
    time: "2h ago",
    sentiment: "Bullish" as const,
    confidence: 71,
    affected: ["Oil", "XLE", "Energy"],
    body: "OPEC+ announces extension of voluntary production cuts through Q3 to support prices amid global demand...",
  },
];

export const economicCalendar = [
  { time: "08:30 AM", event: "Core CPI (MoM)", currency: "USD", impact: "High" as const, actual: "-", forecast: "0.3%" },
  { time: "08:30 AM", event: "CPI (YoY)", currency: "USD", impact: "High" as const, actual: "-", forecast: "3.4%" },
  { time: "08:30 AM", event: "Initial Jobless Claims", currency: "USD", impact: "Medium" as const, actual: "215K", forecast: "218K" },
  { time: "02:00 PM", event: "FOMC Minutes", currency: "USD", impact: "High" as const, actual: "-", forecast: "-" },
  { time: "02:45 PM", event: "ECB President Lagarde Speaks", currency: "EUR", impact: "Medium" as const, actual: "-", forecast: "-" },
];

export const bullishSignals = [
  { symbol: "BTC/USD", note: "Breaking above key resistance", strength: "Strong" },
  { symbol: "AAPL", note: "Strong earnings momentum", strength: "Strong" },
  { symbol: "Gold (XAU/USD)", note: "Safe haven demand rising", strength: "Moderate" },
];

export const bearishSignals = [
  { symbol: "EUR/USD", note: "Weakening below support", strength: "Strong" },
  { symbol: "Oil (WTI)", note: "Overbought conditions", strength: "Moderate" },
  { symbol: "TSLA", note: "Technical breakdown risk", strength: "Moderate" },
];

export const technicalSummary = [
  { label: "S&P 500", value: "Neutral" },
  { label: "BTC/USD", value: "Bullish" },
  { label: "Gold", value: "Bullish" },
];

export const riskLevel = {
  score: 58,
  label: "Moderate",
  volatility: "Moderate",
  sentiment: "Neutral",
  trendStrength: "Moderate",
};

export const tradeJournal = [
  { symbol: "BTC/USD", icon: "cryptocurrency-color:btc", idea: "Breakout above $68K", entry: "68,000", target: "72,500", stop: "65,500", confidence: 4, date: "May 24" },
  { symbol: "AAPL", icon: "mdi:apple", idea: "Earnings momentum", entry: "195.00", target: "205.00", stop: "188.00", confidence: 3, date: "May 23" },
  { symbol: "XAU/USD", icon: "mdi:gold", idea: "Bullish on pullback", entry: "2,320", target: "2,420", stop: "2,280", confidence: 4, date: "May 23" },
];

export const watchlists = [
  { name: "My Crypto", count: 12, change: "+2.31%", up: true },
  { name: "Forex Majors", count: 8, change: "+0.27%", up: true },
  { name: "US Tech Stocks", count: 15, change: "-0.12%", up: false },
  { name: "Commodities", count: 6, change: "+0.61%", up: true },
];

export const marketOverview = {
  forex: [
    { pair: "EUR/USD", price: "1.0845", change: "-0.21%", up: false },
    { pair: "GBP/USD", price: "1.2703", change: "+0.15%", up: true },
    { pair: "USD/JPY", price: "156.82", change: "+0.08%", up: true },
    { pair: "AUD/USD", price: "0.6664", change: "-0.18%", up: false },
    { pair: "USD/CAD", price: "1.3642", change: "+0.11%", up: true },
  ],
  crypto: [
    { pair: "BTC/USD", price: "67,842.21", change: "+1.18%", up: true },
    { pair: "ETH/USD", price: "3,684.50", change: "+0.92%", up: true },
    { pair: "SOL/USD", price: "168.30", change: "+2.44%", up: true },
    { pair: "XRP/USD", price: "0.5210", change: "-0.65%", up: false },
  ],
  commodities: [
    { pair: "Gold (XAU)", price: "2,345.70", change: "+0.41%", up: true },
    { pair: "Silver (XAG)", price: "29.85", change: "+0.72%", up: true },
    { pair: "Oil (WTI)", price: "78.35", change: "-0.32%", up: false },
  ],
  stocks: [
    { pair: "AAPL", price: "195.95", change: "+1.39%", up: true },
    { pair: "NVDA", price: "1,105.44", change: "+5.21%", up: true },
    { pair: "TSLA", price: "175.43", change: "+3.28%", up: true },
  ],
};
