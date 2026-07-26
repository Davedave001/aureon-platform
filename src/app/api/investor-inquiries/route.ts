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
  const inquiries = await prisma.investorInquiry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return jsonWithCors(req, { inquiries });
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const fullName =
    typeof body.fullName === "string" ? body.fullName.trim() : "";
  if (!fullName) {
    return jsonWithCors(
      req,
      { error: "Full name is required." },
      { status: 400 }
    );
  }

  const str = (v: unknown, max = 120) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

  const inquiry = await prisma.investorInquiry.create({
    data: {
      userId,
      fullName: fullName.slice(0, 120),
      amount: str(body.amount, 40),
      currency: str(body.currency, 8) ?? "USD",
      goal: str(body.goal),
      risk: str(body.risk),
      horizon: str(body.horizon),
      markets: str(body.markets),
      comments: str(body.comments, 500),
    },
  });
  return jsonWithCors(req, { inquiry }, { status: 201 });
}
