import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";
import { ingestSignal } from "@/lib/news-ingest";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const signals = await prisma.newsSignal.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
  });
  return jsonWithCors(req, { signals });
}

/**
 * Admin-only manual push — feeds a signal through the same pipeline as the
 * webhook. Lets you test alerts + auto-trade end-to-end from the UI with no
 * external collector, and is the entry point for an in-app AI curator.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return jsonWithCors(req, { error: "Admin only" }, { status: 403 });
  }
  const raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const headline = typeof raw.headline === "string" ? raw.headline.trim() : "";
  if (!headline) {
    return jsonWithCors(req, { error: "headline is required" }, { status: 400 });
  }
  const result = await ingestSignal({
    source: typeof raw.source === "string" ? raw.source : "manual",
    author: typeof raw.author === "string" ? raw.author : null,
    headline,
    body: typeof raw.body === "string" ? raw.body : null,
    url: typeof raw.url === "string" ? raw.url : null,
  });
  return jsonWithCors(req, result, { status: 201 });
}

