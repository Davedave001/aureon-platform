import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";
import { notify } from "@/lib/notify";

const BADGES = ["Verified Trader", "Professional Trader", "Aureon Mentor"];

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return jsonWithCors(req, { error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const decision = body.status === "approved" ? "approved" : "rejected";
  const badge =
    typeof body.badge === "string" && BADGES.includes(body.badge)
      ? body.badge
      : "Verified Trader";

  const submission = await prisma.verificationSubmission.findUnique({
    where: { id },
  });
  if (!submission) {
    return jsonWithCors(req, { error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.verificationSubmission.update({
    where: { id },
    data: {
      status: decision,
      reviewedById: session.user.id,
      reviewedAt: new Date(),
    },
  });

  if (decision === "approved") {
    await prisma.user.update({
      where: { id: submission.userId },
      data: { verified: true, badge },
    });
    await notify({
      userId: submission.userId,
      type: "system",
      title: `Your "${submission.type}" was verified`,
      body: `You've been awarded the ${badge} badge.`,
      link: "/community",
    });
  } else {
    await notify({
      userId: submission.userId,
      type: "system",
      title: `Your "${submission.type}" submission was not approved`,
      body: "Review the requirements and submit again.",
      link: "/community",
    });
  }

  return jsonWithCors(req, { submission: updated });
}
