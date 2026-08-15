import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    currentPassword?: unknown;
    newPassword?: unknown;
  };
  const current =
    typeof body.currentPassword === "string" ? body.currentPassword : "";
  const next = typeof body.newPassword === "string" ? body.newPassword : "";

  if (next.length < 8) {
    return jsonWithCors(
      req,
      { error: "New password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.passwordHash) {
    return jsonWithCors(
      req,
      { error: "Password change is not available for this account." },
      { status: 400 }
    );
  }

  const ok = await bcrypt.compare(current, user.passwordHash);
  if (!ok) {
    return jsonWithCors(
      req,
      { error: "Current password is incorrect." },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(next, 10);
  await prisma.user.update({ where: { id: userId }, data: { passwordHash } });

  return jsonWithCors(req, { ok: true });
}
