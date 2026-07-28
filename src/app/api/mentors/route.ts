import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const mentors = await prisma.user.findMany({
    where: { verified: true },
    orderBy: { updatedAt: "desc" },
    take: 24,
    select: {
      id: true,
      name: true,
      email: true,
      badge: true,
      bio: true,
      location: true,
    },
  });
  const shaped = mentors.map((m) => ({
    id: m.id,
    name: m.name ?? m.email,
    badge: m.badge ?? "Verified Trader",
    bio: m.bio,
    location: m.location,
  }));
  return jsonWithCors(req, { mentors: shaped });
}
