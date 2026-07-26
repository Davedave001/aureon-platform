import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const email =
    typeof body.email === "string" && body.email.trim()
      ? body.email.trim().toLowerCase()
      : (session.user.email ?? "");
  if (!EMAIL_RE.test(email)) {
    return jsonWithCors(
      req,
      { error: "A valid email is required." },
      { status: 400 }
    );
  }

  const topics = Array.isArray(body.topics)
    ? body.topics.filter((t) => typeof t === "string").join(",").slice(0, 200)
    : typeof body.topics === "string"
      ? body.topics.slice(0, 200)
      : null;
  const frequency =
    typeof body.frequency === "string" ? body.frequency.slice(0, 20) : "Weekly";

  const subscriber = await prisma.newsletterSubscriber.upsert({
    where: { email },
    create: { email, topics, frequency },
    update: { topics, frequency },
  });
  return jsonWithCors(req, { subscriber }, { status: 200 });
}
