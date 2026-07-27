import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

// Toggle the current user's upvote on a post.
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const { id: postId } = await params;

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    return jsonWithCors(req, { error: "Not found" }, { status: 404 });
  }

  const existing = await prisma.postVote.findUnique({
    where: { postId_userId: { postId, userId } },
  });

  if (existing) {
    await prisma.postVote.delete({ where: { id: existing.id } });
  } else {
    await prisma.postVote.create({ data: { postId, userId } });
  }

  const votes = await prisma.postVote.count({ where: { postId } });
  return jsonWithCors(req, { votes, votedByMe: !existing });
}
