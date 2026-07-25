import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const { id, itemId } = await params;
  // Ensure the item belongs to a watchlist owned by this user.
  const item = await prisma.watchlistItem.findUnique({
    where: { id: itemId },
    include: { watchlist: true },
  });
  if (!item || item.watchlistId !== id || item.watchlist.userId !== userId) {
    return jsonWithCors(req, { error: "Not found" }, { status: 404 });
  }

  await prisma.watchlistItem.delete({ where: { id: itemId } });
  return jsonWithCors(req, { ok: true });
}
