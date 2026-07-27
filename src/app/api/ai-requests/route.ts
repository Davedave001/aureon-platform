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
  const requests = await prisma.aiRequest.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return jsonWithCors(req, { requests });
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const businessName =
    typeof body.businessName === "string" ? body.businessName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!businessName || !email) {
    return jsonWithCors(
      req,
      { error: "Business name and email are required." },
      { status: 400 }
    );
  }

  const str = (v: unknown, max = 200) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

  const request = await prisma.aiRequest.create({
    data: {
      userId,
      businessName: businessName.slice(0, 120),
      email: email.slice(0, 160),
      website: str(body.website, 200),
      businessSize: str(body.businessSize, 40),
      industry: str(body.industry, 60),
      problem: str(body.problem, 1000),
      budget: str(body.budget, 40),
      timeline: str(body.timeline, 40),
    },
  });
  return jsonWithCors(req, { request }, { status: 201 });
}
