import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

const SELECT = {
  id: true,
  name: true,
  email: true,
  handle: true,
  bio: true,
  location: true,
  role: true,
  image: true,
  verified: true,
  badge: true,
  createdAt: true,
} as const;

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: SELECT,
  });
  return jsonWithCors(req, { profile });
}

export async function PATCH(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const data: {
    name?: string;
    handle?: string | null;
    bio?: string | null;
    location?: string | null;
  } = {};

  if (typeof body.name === "string" && body.name.trim()) {
    data.name = body.name.trim().slice(0, 80);
  }
  if (typeof body.handle === "string") {
    data.handle = body.handle.trim().slice(0, 40) || null;
  }
  if (typeof body.bio === "string") {
    data.bio = body.bio.trim().slice(0, 500) || null;
  }
  if (typeof body.location === "string") {
    data.location = body.location.trim().slice(0, 80) || null;
  }

  const profile = await prisma.user.update({
    where: { id: userId },
    data,
    select: SELECT,
  });
  return jsonWithCors(req, { profile });
}
