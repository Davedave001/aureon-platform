import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return jsonWithCors(req, { error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { role?: unknown };
  const role = body.role === "admin" ? "admin" : "member";

  // Don't let an admin demote themselves (avoids locking out the last admin).
  if (id === session.user.id && role !== "admin") {
    return jsonWithCors(
      req,
      { error: "You can't change your own admin role." },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  return jsonWithCors(req, { user });
}
