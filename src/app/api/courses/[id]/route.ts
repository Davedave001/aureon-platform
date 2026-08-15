import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const isAdmin = session?.user?.role === "admin";
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      lessons: { orderBy: { order: "asc" } },
    },
  });

  if (!course || (!course.published && !isAdmin)) {
    return jsonWithCors(req, { error: "Not found" }, { status: 404 });
  }

  const progress = await prisma.lessonProgress.findMany({
    where: { userId, lesson: { courseId: id } },
    select: { lessonId: true },
  });
  const completed = new Set(progress.map((p) => p.lessonId));

  return jsonWithCors(req, {
    isAdmin,
    course: {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      coverImage: course.coverImage,
      published: course.published,
      lessons: course.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        description: l.description,
        videoUrl: l.videoUrl,
        duration: l.duration,
        order: l.order,
        completed: completed.has(l.id),
      })),
    },
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return jsonWithCors(req, { error: "Admin only" }, { status: 403 });
  }
  const { id } = await params;
  const raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const data: Record<string, unknown> = {};
  if (typeof raw.title === "string") data.title = raw.title.slice(0, 200);
  if (typeof raw.description === "string") data.description = raw.description.slice(0, 2000);
  if (typeof raw.category === "string") data.category = raw.category;
  if (typeof raw.level === "string") data.level = raw.level;
  if (typeof raw.coverImage === "string") data.coverImage = raw.coverImage;
  if (typeof raw.published === "boolean") data.published = raw.published;

  const course = await prisma.course.update({ where: { id }, data });
  return jsonWithCors(req, { course });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return jsonWithCors(req, { error: "Admin only" }, { status: 403 });
  }
  const { id } = await params;
  await prisma.course.delete({ where: { id } });
  return jsonWithCors(req, { ok: true });
}
