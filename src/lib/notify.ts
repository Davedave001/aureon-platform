import { prisma } from "@/lib/db";

/**
 * Create a notification for a user. No-ops if the recipient is the actor
 * (you don't get notified about your own actions).
 */
export async function notify(params: {
  userId: string;
  actorId?: string;
  type: "comment" | "vote" | "system";
  title: string;
  body?: string | null;
  link?: string | null;
}) {
  if (params.actorId && params.actorId === params.userId) return;
  await prisma.notification.create({
    data: {
      userId: params.userId,
      type: params.type,
      title: params.title,
      body: params.body ?? null,
      link: params.link ?? null,
    },
  });
}
