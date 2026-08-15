import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

/** Toggle a lesson's completed state for the signed-in user. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const { id: lessonId } = await params;

  const existing = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });

  if (existing) {
    await prisma.lessonProgress.delete({ where: { id: existing.id } });
    return jsonWithCors(req, { completed: false });
  }

  await prisma.lessonProgress.create({ data: { userId, lessonId } });
  return jsonWithCors(req, { completed: true });
}
