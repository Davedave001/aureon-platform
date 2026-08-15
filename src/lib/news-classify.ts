/**
 * Heuristic news-to-signal classifier. Given a headline/body it guesses the
 * most affected instrument, a bullish/bearish lean, direction, expected market
 * impact, and a confidence score.
 *
 * This is deliberately simple and deterministic so the whole news-trading
 * pipeline works with zero external services. It's structured as a single
 * pure function so it can later be swapped for an LLM call without touching
 * the ingest/execution code.
 */

export type Classification = {
  instrument: string | null;
  direction: "buy" | "sell" | "neutral";
  sentiment: "bullish" | "bearish" | "neutral";
  impact: "high" | "medium" | "low";
  confidence: number; // 0-100
};

type InstrumentRule = {
  symbol: string;
  match: string[];
  // Words that are bullish / bearish *for this instrument*.
  bullish: string[];
  bearish: string[];
};

// Ordered by priority — first instrument whose keywords appear wins.
const INSTRUMENTS: InstrumentRule[] = [
  {
    symbol: "XAUUSD",
    match: ["gold", "xau", "bullion", "safe haven"],
    bullish: ["war", "conflict", "invasion", "sanction", "crisis", "inflation", "geopolitical", "cut"],
    bearish: ["hike", "strong dollar", "risk-on", "peace", "ceasefire"],
  },
  {
    symbol: "USOIL",
    match: ["oil", "crude", "wti", "brent", "opec"],
    bullish: ["cut", "supply cut", "shortage", "sanction", "war", "attack", "outage"],
    bearish: ["increase output", "oversupply", "demand slump", "recession", "release reserves"],
  },
  {
    symbol: "BTCUSD",
    match: ["bitcoin", "btc", "crypto", "ethereum", "eth"],
    bullish: ["etf", "adoption", "approval", "halving", "institutional", "reserve"],
    bearish: ["ban", "hack", "crackdown", "lawsuit", "sec sues", "collapse"],
  },
  {
    symbol: "US500",
    match: ["s&p", "sp500", "stocks", "wall street", "nasdaq", "equities", "dow"],
    bullish: ["beat", "record", "rally", "stimulus", "rate cut", "soft landing"],
    bearish: ["miss", "selloff", "recession", "tariff", "rate hike", "layoffs"],
  },
  {
    symbol: "EURUSD",
    match: ["euro", "eur", "ecb", "eurozone", "lagarde"],
    bullish: ["ecb hike", "eurozone growth", "hawkish ecb"],
    bearish: ["ecb cut", "eurozone recession", "dovish ecb"],
  },
];

// Dollar-moving keywords (affect EURUSD inversely: strong USD => EURUSD sell).
const USD_STRONG = ["rate hike", "hawkish", "hot cpi", "strong nfp", "fed hikes", "tightening"];
const USD_WEAK = ["rate cut", "dovish", "cool cpi", "weak nfp", "fed cuts", "easing", "recession"];

const HIGH_IMPACT = [
  "fed", "fomc", "rate", "cpi", "inflation", "nfp", "jobs", "tariff", "war",
  "invasion", "sanction", "opec", "hike", "cut", "default", "downgrade",
  "emergency", "breaking",
];

function countHits(text: string, words: string[]): number {
  return words.reduce((n, w) => (text.includes(w) ? n + 1 : n), 0);
}

export function classifyNews(headline: string, body?: string | null): Classification {
  const text = `${headline} ${body ?? ""}`.toLowerCase();

  // Pick the instrument.
  let rule = INSTRUMENTS.find((r) => r.match.some((m) => text.includes(m))) ?? null;

  // If nothing matched but the post is clearly USD-macro, default to EURUSD.
  if (!rule && (countHits(text, USD_STRONG) || countHits(text, USD_WEAK))) {
    rule = INSTRUMENTS.find((r) => r.symbol === "EURUSD") ?? null;
  }

  if (!rule) {
    return {
      instrument: null,
      direction: "neutral",
      sentiment: "neutral",
      impact: countHits(text, HIGH_IMPACT) >= 1 ? "medium" : "low",
      confidence: 30,
    };
  }

  let score = countHits(text, rule.bullish) - countHits(text, rule.bearish);

  // Layer in USD macro for EURUSD (strong USD is bearish EURUSD).
  if (rule.symbol === "EURUSD") {
    score += countHits(text, USD_WEAK) - countHits(text, USD_STRONG);
  }

  const sentiment: Classification["sentiment"] =
    score > 0 ? "bullish" : score < 0 ? "bearish" : "neutral";
  const direction: Classification["direction"] =
    score > 0 ? "buy" : score < 0 ? "sell" : "neutral";

  const highHits = countHits(text, HIGH_IMPACT);
  const impact: Classification["impact"] =
    highHits >= 2 ? "high" : highHits === 1 ? "medium" : "low";

  // Confidence grows with how decisive the keyword signal is.
  const magnitude = Math.abs(score);
  const confidence = Math.min(
    95,
    40 + magnitude * 20 + highHits * 8
  );

  return { instrument: rule.symbol, direction, sentiment, impact, confidence };
}

const IMPACT_RANK: Record<string, number> = { low: 1, medium: 2, high: 3 };

export function impactRank(impact: string): number {
  return IMPACT_RANK[impact] ?? 1;
}
