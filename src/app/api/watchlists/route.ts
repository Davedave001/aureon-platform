import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

const DEFAULT_LISTS = [
  { name: "My Crypto", symbols: ["BTC/USD", "ETH/USD", "SOL/USD"] },
  { name: "US Tech Stocks", symbols: ["AAPL", "NVDA", "TSLA"] },
];

function listSelect() {
  return {
    include: { items: { orderBy: { createdAt: "asc" as const } } },
    orderBy: { createdAt: "asc" as const },
  };
}

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  let watchlists = await prisma.watchlist.findMany({
    where: { userId },
    ...listSelect(),
  });

  // First visit: seed a couple of starter lists so the page isn't empty.
  if (watchlists.length === 0) {
    for (const def of DEFAULT_LISTS) {
      await prisma.watchlist.create({
        data: {
          userId,
          name: def.name,
          items: { create: def.symbols.map((symbol) => ({ symbol })) },
        },
      });
    }
    watchlists = await prisma.watchlist.findMany({
      where: { userId },
      ...listSelect(),
    });
  }

  return jsonWithCors(req, { watchlists });
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { name?: unknown };
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return jsonWithCors(req, { error: "Name is required." }, { status: 400 });
  }

  const watchlist = await prisma.watchlist.create({
    data: { userId, name },
    include: { items: true },
  });
  return jsonWithCors(req, { watchlist }, { status: 201 });
}
