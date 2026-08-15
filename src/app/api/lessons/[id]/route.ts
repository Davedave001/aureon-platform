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
  if (session?.user?.role !== "admin") {
    return jsonWithCors(req, { error: "Admin only" }, { status: 403 });
  }
  const { id } = await params;
  await prisma.lesson.delete({ where: { id } });
  return jsonWithCors(req, { ok: true });
}
