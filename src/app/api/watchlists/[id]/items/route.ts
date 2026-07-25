import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const watchlist = await prisma.watchlist.findUnique({ where: { id } });
  if (!watchlist || watchlist.userId !== userId) {
    return jsonWithCors(req, { error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => ({}))) as { symbol?: unknown };
  const symbol =
    typeof body.symbol === "string" ? body.symbol.trim().toUpperCase() : "";
  if (!symbol) {
    return jsonWithCors(req, { error: "Symbol is required." }, { status: 400 });
  }

  try {
    const item = await prisma.watchlistItem.create({
      data: { watchlistId: id, symbol },
    });
    return jsonWithCors(req, { item }, { status: 201 });
  } catch {
    // Unique constraint (watchlistId, symbol) — already present.
    return jsonWithCors(
      req,
      { error: "That symbol is already in this watchlist." },
      { status: 409 }
    );
  }
}
