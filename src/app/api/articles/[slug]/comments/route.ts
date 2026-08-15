import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const comments = await prisma.articleComment.findMany({
    where: { articleSlug: slug },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
  const shaped = comments.map((c) => ({
    id: c.id,
    body: c.body,
    createdAt: c.createdAt,
    author: c.user.name ?? c.user.email,
    mine: c.user.id === userId,
  }));
  return jsonWithCors(req, { comments: shaped });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const body = (await req.json().catch(() => ({}))) as { body?: unknown };
  const text = typeof body.body === "string" ? body.body.trim() : "";
  if (!text) {
    return jsonWithCors(req, { error: "Comment cannot be empty." }, { status: 400 });
  }

  const comment = await prisma.articleComment.create({
    data: { articleSlug: slug, userId, body: text.slice(0, 2000) },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  return jsonWithCors(
    req,
    {
      comment: {
        id: comment.id,
        body: comment.body,
        createdAt: comment.createdAt,
        author: comment.user.name ?? comment.user.email,
        mine: true,
      },
    },
    { status: 201 }
  );
}
