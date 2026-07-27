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

  const { searchParams } = new URL(req.url);
  const community = searchParams.get("community");

  const posts = await prisma.post.findMany({
    where: community ? { communityKey: community } : undefined,
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      user: { select: { id: true, name: true, email: true } },
      _count: { select: { votes: true, comments: true } },
      votes: { where: { userId }, select: { id: true } },
    },
  });

  const shaped = posts.map((p) => ({
    id: p.id,
    communityKey: p.communityKey,
    title: p.title,
    body: p.body,
    createdAt: p.createdAt,
    author: p.user.name ?? p.user.email,
    authorId: p.user.id,
    votes: p._count.votes,
    comments: p._count.comments,
    votedByMe: p.votes.length > 0,
    mine: p.user.id === userId,
  }));

  return jsonWithCors(req, { posts: shaped });
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const communityKey =
    typeof body.communityKey === "string" ? body.communityKey.trim() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const text = typeof body.body === "string" ? body.body.trim() : "";

  if (!communityKey || !title || !text) {
    return jsonWithCors(
      req,
      { error: "Community, title, and body are required." },
      { status: 400 }
    );
  }

  const created = await prisma.post.create({
    data: {
      userId,
      communityKey: communityKey.slice(0, 40),
      title: title.slice(0, 160),
      body: text.slice(0, 4000),
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return jsonWithCors(
    req,
    {
      post: {
        id: created.id,
        communityKey: created.communityKey,
        title: created.title,
        body: created.body,
        createdAt: created.createdAt,
        author: created.user.name ?? created.user.email,
        authorId: created.user.id,
        votes: 0,
        comments: 0,
        votedByMe: false,
        mine: true,
      },
    },
    { status: 201 }
  );
}
