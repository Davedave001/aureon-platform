export const marketIndices = [
  { label: "S&P 500", value: "5,278.40", change: "+0.62%", up: true, icon: "mdi:bank-outline" },
  { label: "NASDAQ 100", value: "18,669.40", change: "+0.74%", up: true, icon: "mdi:domain" },
  { label: "DOW JONES", value: "39,985.27", change: "+0.35%", up: true, icon: "mdi:bank-outline" },
  { label: "BTC/USD", value: "67,842.21", change: "+1.18%", up: true, icon: "cryptocurrency-color:btc" },
  { label: "GOLD", value: "2,345.70", change: "+0.41%", up: true, icon: "mdi:gold" },
  { label: "OIL (WTI)", value: "78.35", change: "-0.32%", up: false, icon: "mdi:oil" },
];

export const marketTabs = ["Forex", "Crypto", "Stocks", "Commodities", "Indices"] as const;

export const marketTables: Record<
  (typeof marketTabs)[number],
  { symbol: string; name: string; icon: string; price: string; change: string; abs: string; up: boolean; low: string; high: string }[]
> = {
  Forex: [
    { symbol: "EUR/USD", name: "Euro / US Dollar", icon: "mdi:currency-eur", price: "1.0845", change: "-0.21%", abs: "-0.0023", up: false, low: "1.0821", high: "1.0879" },
    { symbol: "GBP/USD", name: "Pound / US Dollar", icon: "mdi:currency-gbp", price: "1.2703", change: "+0.15%", abs: "+0.0019", up: true, low: "1.2680", high: "1.2724" },
    { symbol: "USD/JPY", name: "US Dollar / Yen", icon: "mdi:currency-jpy", price: "156.82", change: "+0.08%", abs: "+0.13", up: true, low: "156.44", high: "157.05" },
    { symbol: "AUD/USD", name: "Aussie / US Dollar", icon: "mdi:currency-usd", price: "0.6664", change: "-0.18%", abs: "-0.0012", up: false, low: "0.6648", high: "0.6691" },
    { symbol: "USD/CAD", name: "US Dollar / Loonie", icon: "mdi:currency-usd", price: "1.3642", change: "+0.11%", abs: "+0.0015", up: true, low: "1.3618", high: "1.3659" },
  ],
  Crypto: [
    { symbol: "BTC/USD", name: "Bitcoin", icon: "cryptocurrency-color:btc", price: "67,842.21", change: "+1.18%", abs: "+789.40", up: true, low: "66,210.00", high: "68,105.00" },
    { symbol: "ETH/USD", name: "Ethereum", icon: "cryptocurrency-color:eth", price: "3,684.50", change: "+0.92%", abs: "+33.60", up: true, low: "3,612.00", high: "3,710.00" },
    { symbol: "SOL/USD", name: "Solana", icon: "cryptocurrency-color:sol", price: "168.30", change: "+2.44%", abs: "+4.01", up: true, low: "162.10", high: "171.40" },
    { symbol: "XRP/USD", name: "Ripple", icon: "cryptocurrency-color:xrp", price: "0.5210", change: "-0.65%", abs: "-0.0034", up: false, low: "0.5180", high: "0.5290" },
    { symbol: "DOGE/USD", name: "Dogecoin", icon: "cryptocurrency-color:doge", price: "0.1620", change: "+5.02%", abs: "+0.0077", up: true, low: "0.1520", high: "0.1655" },
  ],
  Stocks: [
    { symbol: "AAPL", name: "Apple Inc.", icon: "mdi:apple", price: "195.95", change: "+1.39%", abs: "+2.69", up: true, low: "193.10", high: "196.80" },
    { symbol: "NVDA", name: "NVIDIA Corp.", icon: "mdi:chip", price: "1,105.44", change: "+5.21%", abs: "+54.77", up: true, low: "1,048.00", high: "1,112.00" },
    { symbol: "TSLA", name: "Tesla, Inc.", icon: "mdi:car-electric", price: "175.43", change: "+3.28%", abs: "+5.57", up: true, low: "169.20", high: "177.10" },
    { symbol: "META", name: "Meta Platforms", icon: "mdi:facebook", price: "497.30", change: "+2.11%", abs: "+10.28", up: true, low: "486.40", high: "499.90" },
    { symbol: "AMZN", name: "Amazon.com", icon: "mdi:cart-outline", price: "184.70", change: "-0.42%", abs: "-0.78", up: false, low: "183.90", high: "186.20" },
  ],
  Commodities: [
    { symbol: "XAU/USD", name: "Gold", icon: "mdi:gold", price: "2,345.70", change: "+0.41%", abs: "+9.55", up: true, low: "2,332.00", high: "2,351.00" },
    { symbol: "XAG/USD", name: "Silver", icon: "mdi:gold", price: "29.85", change: "+0.72%", abs: "+0.21", up: true, low: "29.51", high: "30.02" },
    { symbol: "WTI", name: "Crude Oil", icon: "mdi:oil", price: "78.35", change: "-0.32%", abs: "-0.25", up: false, low: "77.90", high: "79.10" },
    { symbol: "NG", name: "Natural Gas", icon: "mdi:fire", price: "2.71", change: "+1.87%", abs: "+0.05", up: true, low: "2.64", high: "2.74" },
  ],
  Indices: [
    { symbol: "SPX", name: "S&P 500", icon: "mdi:bank-outline", price: "5,278.40", change: "+0.62%", abs: "+32.60", up: true, low: "5,240.00", high: "5,285.00" },
    { symbol: "NDX", name: "NASDAQ 100", icon: "mdi:domain", price: "18,669.40", change: "+0.74%", abs: "+137.20", up: true, low: "18,510.00", high: "18,702.00" },
    { symbol: "DJI", name: "Dow Jones", icon: "mdi:bank-outline", price: "39,985.27", change: "+0.35%", abs: "+139.80", up: true, low: "39,760.00", high: "40,020.00" },
    { symbol: "FTSE", name: "FTSE 100", icon: "mdi:earth", price: "8,215.30", change: "-0.14%", abs: "-11.50", up: false, low: "8,201.00", high: "8,248.00" },
    { symbol: "DAX", name: "DAX 40", icon: "mdi:earth", price: "18,492.10", change: "+0.29%", abs: "+53.40", up: true, low: "18,410.00", high: "18,510.00" },
  ],
};

export const topMovers = {
  gainers: [
    { symbol: "NVDA", change: "+5.21%" },
    { symbol: "DOGE", change: "+5.02%" },
    { symbol: "TSLA", change: "+3.28%" },
    { symbol: "SOL", change: "+2.44%" },
  ],
  losers: [
    { symbol: "XRP", change: "-0.65%" },
    { symbol: "AMZN", change: "-0.42%" },
    { symbol: "OIL", change: "-0.32%" },
    { symbol: "EUR/USD", change: "-0.21%" },
  ],
};

export const heatMap = [
  { symbol: "AAPL", change: "+1.39%", up: true, weight: 2 },
  { symbol: "NVDA", change: "+5.21%", up: true, weight: 3 },
  { symbol: "MSFT", change: "+0.89%", up: true, weight: 2 },
  { symbol: "TSLA", change: "+3.28%", up: true, weight: 2 },
  { symbol: "META", change: "+2.11%", up: true, weight: 1 },
  { symbol: "GOOGL", change: "+1.20%", up: true, weight: 1 },
  { symbol: "AMZN", change: "-0.42%", up: false, weight: 2 },
  { symbol: "JPM", change: "+1.19%", up: true, weight: 1 },
  { symbol: "XOM", change: "-0.32%", up: false, weight: 1 },
  { symbol: "JNJ", change: "-0.21%", up: false, weight: 1 },
  { symbol: "LLY", change: "-0.29%", up: false, weight: 1 },
  { symbol: "WMT", change: "+0.41%", up: true, weight: 1 },
];
