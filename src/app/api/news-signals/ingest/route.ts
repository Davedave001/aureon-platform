import { jsonWithCors, preflight } from "@/lib/cors";
import { ingestSignal } from "@/lib/news-ingest";

export function OPTIONS(req: Request) {
  return preflight(req);
}

const INGEST_SECRET = process.env.NEWS_INGEST_SECRET;

/**
 * Webhook that external collectors (an X/Twitter poller, a news API poller, or
 * a manual/AI push) call to feed a raw news item into the trading pipeline.
 * Protected by a shared secret so only your collectors can post.
 */
export async function POST(req: Request) {
  if (INGEST_SECRET && req.headers.get("x-ingest-secret") !== INGEST_SECRET) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const headline = typeof raw.headline === "string" ? raw.headline.trim() : "";
  if (!headline) {
    return jsonWithCors(req, { error: "headline is required" }, { status: 400 });
  }

  const result = await ingestSignal({
    source: typeof raw.source === "string" ? raw.source : undefined,
    author: typeof raw.author === "string" ? raw.author : null,
    headline,
    body: typeof raw.body === "string" ? raw.body : null,
    url: typeof raw.url === "string" ? raw.url : null,
    instrument: typeof raw.instrument === "string" ? raw.instrument : null,
    direction: typeof raw.direction === "string" ? raw.direction : null,
    sentiment: typeof raw.sentiment === "string" ? raw.sentiment : null,
    impact: typeof raw.impact === "string" ? raw.impact : null,
    confidence: typeof raw.confidence === "number" ? raw.confidence : null,
  });

  return jsonWithCors(req, result, { status: 201 });
}
