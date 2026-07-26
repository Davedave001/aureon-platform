import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const ideas = await prisma.tradeIdea.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return jsonWithCors(req, { ideas });
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const symbol =
    typeof body.symbol === "string" ? body.symbol.trim().toUpperCase() : "";
  const side = body.side === "sell" ? "sell" : "buy";
  if (!symbol) {
    return jsonWithCors(req, { error: "Symbol is required." }, { status: 400 });
  }

  const str = (v: unknown) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, 40) : null;
  const confidence =
    typeof body.confidence === "number"
      ? Math.min(5, Math.max(1, Math.round(body.confidence)))
      : 3;

  const idea = await prisma.tradeIdea.create({
    data: {
      userId,
      symbol,
      side,
      entry: str(body.entry),
      target: str(body.target),
      stop: str(body.stop),
      note: typeof body.note === "string" ? body.note.trim().slice(0, 200) : null,
      confidence,
    },
  });
  return jsonWithCors(req, { idea }, { status: 201 });
}
