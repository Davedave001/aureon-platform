import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";
import { notify } from "@/lib/notify";

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
    const actorName = session.user.name ?? session.user.email ?? "Someone";
    await notify({
      userId: post.userId,
      actorId: userId,
      type: "vote",
      title: `${actorName} upvoted your post`,
      body: post.title,
      link: "/community",
    });
  }

  const votes = await prisma.postVote.count({ where: { postId } });
  return jsonWithCors(req, { votes, votedByMe: !existing });
}
