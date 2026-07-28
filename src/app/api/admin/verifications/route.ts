import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function GET(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return jsonWithCors(req, { error: "Forbidden" }, { status: 403 });
  }
  const submissions = await prisma.verificationSubmission.findMany({
    where: { status: "pending" },
    orderBy: { createdAt: "asc" },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
  const shaped = submissions.map((s) => ({
    id: s.id,
    type: s.type,
    detail: s.detail,
    createdAt: s.createdAt,
    userName: s.user.name ?? s.user.email,
    userEmail: s.user.email,
  }));
  return jsonWithCors(req, { submissions: shaped });
}
