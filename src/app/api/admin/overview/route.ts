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

  const [
    users,
    posts,
    comments,
    events,
    inquiries,
    aiRequests,
    subscribers,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.comment.count(),
    prisma.event.count(),
    prisma.investorInquiry.count(),
    prisma.aiRequest.count(),
    prisma.newsletterSubscriber.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
  ]);

  return jsonWithCors(req, {
    stats: { users, posts, comments, events, inquiries, aiRequests, subscribers },
    recentUsers,
  });
}
