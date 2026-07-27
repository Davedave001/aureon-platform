import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
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
  const pref = await prisma.userPreferences.findUnique({ where: { userId } });
  return jsonWithCors(req, { preferences: pref?.data ?? {} });
}

export async function PUT(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as {
    preferences?: unknown;
  };
  const data: Prisma.InputJsonValue =
    body.preferences && typeof body.preferences === "object"
      ? (body.preferences as Prisma.InputJsonValue)
      : {};

  const pref = await prisma.userPreferences.upsert({
    where: { userId },
    create: { userId, data },
    update: { data },
  });
  return jsonWithCors(req, { preferences: pref.data });
}
