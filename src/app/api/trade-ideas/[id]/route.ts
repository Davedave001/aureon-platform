import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const idea = await prisma.tradeIdea.findUnique({ where: { id } });
  if (!idea || idea.userId !== userId) {
    return jsonWithCors(req, { error: "Not found" }, { status: 404 });
  }
  await prisma.tradeIdea.delete({ where: { id } });
  return jsonWithCors(req, { ok: true });
}
