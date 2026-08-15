import { auth } from "@/auth";
import { prisma } from "@/lib/db";
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

  const now = new Date();

  const [
    user,
    posts,
    watchlists,
    eventsRegistered,
    tradeIdeas,
    aiRequests,
    upcomingRaw,
    myTickets,
    notifications,
    investor,
    communityGroups,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        role: true,
        verified: true,
        badge: true,
        createdAt: true,
      },
    }),
    prisma.post.count({ where: { userId } }),
    prisma.watchlist.count({ where: { userId } }),
    prisma.eventTicket.count({ where: { userId } }),
    prisma.tradeIdea.count({ where: { userId } }),
    prisma.aiRequest.count({ where: { userId } }),
    prisma.event.findMany({
      where: { startsAt: { gte: now } },
      orderBy: { startsAt: "asc" },
      take: 4,
      select: { id: true, title: true, startsAt: true, category: true },
    }),
    prisma.eventTicket.findMany({
      where: { userId },
      select: { eventId: true },
    }),
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        type: true,
        title: true,
        body: true,
        read: true,
        link: true,
        createdAt: true,
      },
    }),
    prisma.investorInquiry.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { status: true, amount: true, currency: true, createdAt: true },
    }),
    prisma.post.groupBy({
      by: ["communityKey"],
      where: { userId },
      _count: { communityKey: true },
    }),
  ]);

  const registered = new Set(myTickets.map((t) => t.eventId));
  const firstName =
    user?.name?.trim().split(/\s+/)[0] ??
    user?.email?.split("@")[0] ??
    "there";

  const communities = communityGroups
    .map((g) => ({ key: g.communityKey, posts: g._count.communityKey }))
    .sort((a, b) => b.posts - a.posts);

  return jsonWithCors(req, {
    user: {
      name: user?.name ?? null,
      firstName,
      email: user?.email ?? null,
      role: user?.role ?? "member",
      verified: user?.verified ?? false,
      badge: user?.badge ?? null,
      plan: user?.role === "admin" ? "Admin" : "Free",
      memberSince: user?.createdAt ?? null,
    },
    stats: {
      posts,
      watchlists,
      eventsRegistered,
      tradeIdeas,
      aiRequests,
    },
    upcomingEvents: upcomingRaw.map((e) => ({
      id: e.id,
      title: e.title,
      startsAt: e.startsAt,
      category: e.category,
      registered: registered.has(e.id),
    })),
    notifications,
    investor,
    communities,
  });
}
