import { prisma } from "@/lib/db";
import { classifyNews, impactRank } from "@/lib/news-classify";

export type IngestPayload = {
  source?: string;
  author?: string | null;
  headline: string;
  body?: string | null;
  url?: string | null;
  instrument?: string | null;
  direction?: string | null;
  sentiment?: string | null;
  impact?: string | null;
  confidence?: number | null;
};

export type IngestResult = {
  signal: {
    id: string;
    instrument: string | null;
    direction: string;
    sentiment: string;
    impact: string;
    confidence: number;
  };
  notified: number;
  ordersCreated: number;
};

const LINK = "/ai-solutions?tab=news";

/**
 * Core news-trading pipeline: classify a raw news item, store it as a signal,
 * alert users on high-impact items, and run each user's auto-trade rules.
 * Until an MT5 bridge is connected, generated orders are "simulated".
 *
 * Shared by the secret-gated webhook and the in-app admin/AI push.
 */
export async function ingestSignal(payload: IngestPayload): Promise<IngestResult> {
  const headline = payload.headline.trim();
  const body = payload.body ?? null;

  const auto = classifyNews(headline, body);
  const instrument = payload.instrument
    ? payload.instrument.toUpperCase()
    : auto.instrument;
  const direction = payload.direction || auto.direction;
  const sentiment = payload.sentiment || auto.sentiment;
  const impact = payload.impact || auto.impact;
  const confidence =
    typeof payload.confidence === "number" ? payload.confidence : auto.confidence;

  const signal = await prisma.newsSignal.create({
    data: {
      source: payload.source || "manual",
      author: payload.author ?? null,
      headline,
      body,
      url: payload.url ?? null,
      instrument,
      direction,
      sentiment,
      impact,
      confidence,
    },
  });

  // Alert everyone on high-impact news.
  let notified = 0;
  if (impactRank(impact) >= impactRank("high")) {
    const users = await prisma.user.findMany({ select: { id: true } });
    if (users.length) {
      await prisma.notification.createMany({
        data: users.map((u) => ({
          userId: u.id,
          type: "system" as const,
          title: `📈 News alert: ${headline.slice(0, 90)}`,
          body: instrument
            ? `${sentiment} for ${instrument}${
                direction !== "neutral" ? ` — suggests ${direction.toUpperCase()}` : ""
              }`
            : null,
          link: LINK,
        })),
      });
      notified = users.length;
    }
  }

  // Auto-trade evaluation.
  let ordersCreated = 0;
  if (instrument && (direction === "buy" || direction === "sell")) {
    const configs = await prisma.autoTradeConfig.findMany({
      where: { enabled: true },
    });

    for (const cfg of configs) {
      if (confidence < cfg.minConfidence) continue;
      if (impactRank(impact) < impactRank(cfg.minImpact)) continue;

      const allow = (cfg.instruments ?? "")
        .split(",")
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean);
      if (allow.length && !allow.includes(instrument)) continue;

      await prisma.tradeOrder.create({
        data: {
          userId: cfg.userId,
          signalId: signal.id,
          instrument,
          direction,
          lot: cfg.maxLot,
          status: "simulated",
          reason: "MT5 bridge not connected — order simulated",
        },
      });
      ordersCreated += 1;

      await prisma.notification.create({
        data: {
          userId: cfg.userId,
          type: "system",
          title: `🤖 Auto-trade: ${direction.toUpperCase()} ${instrument} (${cfg.maxLot} lot)`,
          body: `Simulated from: ${headline.slice(0, 100)}`,
          link: LINK,
        },
      });
    }
  }

  return {
    signal: {
      id: signal.id,
      instrument,
      direction,
      sentiment,
      impact,
      confidence,
    },
    notified,
    ordersCreated,
  };
}
