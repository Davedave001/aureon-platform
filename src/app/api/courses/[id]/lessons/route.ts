import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return jsonWithCors(req, { error: "Admin only" }, { status: 403 });
  }
  const { id } = await params;
  const raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  const videoUrl = typeof raw.videoUrl === "string" ? raw.videoUrl.trim() : "";
  if (!title || !videoUrl) {
    return jsonWithCors(
      req,
      { error: "Title and video URL are required." },
      { status: 400 }
    );
  }

  const last = await prisma.lesson.findFirst({
    where: { courseId: id },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const lesson = await prisma.lesson.create({
    data: {
      courseId: id,
      title: title.slice(0, 200),
      description:
        typeof raw.description === "string" ? raw.description.slice(0, 2000) : null,
      videoUrl: videoUrl.slice(0, 2000),
      duration: typeof raw.duration === "string" ? raw.duration.slice(0, 20) : null,
      order: (last?.order ?? 0) + 1,
    },
  });

  return jsonWithCors(req, { lesson }, { status: 201 });
}
