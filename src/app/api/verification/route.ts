import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

const ALLOWED_TYPES = [
  "Trading Track Record",
  "Broker Statements",
  "MyFxBook",
  "FXBlue",
  "TradingView",
  "Community Username (Skool)",
];

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const [submissions, user] = await Promise.all([
    prisma.verificationSubmission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { verified: true, badge: true },
    }),
  ]);
  return jsonWithCors(req, {
    submissions,
    verified: user?.verified ?? false,
    badge: user?.badge ?? null,
    types: ALLOWED_TYPES,
  });
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const type = typeof body.type === "string" ? body.type.trim() : "";
  if (!ALLOWED_TYPES.includes(type)) {
    return jsonWithCors(req, { error: "Invalid submission type." }, { status: 400 });
  }
  const detail =
    typeof body.detail === "string" && body.detail.trim()
      ? body.detail.trim().slice(0, 300)
      : null;

  const submission = await prisma.verificationSubmission.create({
    data: { userId, type, detail },
  });
  return jsonWithCors(req, { submission }, { status: 201 });
}
