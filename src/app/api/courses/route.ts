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
  const isAdmin = session?.user?.role === "admin";

  const courses = await prisma.course.findMany({
    where: isAdmin ? {} : { published: true },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { lessons: true } } },
  });

  return jsonWithCors(req, {
    isAdmin,
    courses: courses.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      level: c.level,
      coverImage: c.coverImage,
      published: c.published,
      lessonCount: c._count.lessons,
    })),
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return jsonWithCors(req, { error: "Admin only" }, { status: 403 });
  }
  const raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  if (!title) {
    return jsonWithCors(req, { error: "Title is required" }, { status: 400 });
  }

  const course = await prisma.course.create({
    data: {
      title: title.slice(0, 200),
      description:
        typeof raw.description === "string" ? raw.description.slice(0, 2000) : null,
      category: typeof raw.category === "string" && raw.category ? raw.category : "Forex",
      level: typeof raw.level === "string" && raw.level ? raw.level : "Beginner",
      coverImage: typeof raw.coverImage === "string" ? raw.coverImage : null,
      published: Boolean(raw.published),
      createdById: session.user.id!,
    },
  });

  return jsonWithCors(req, { course }, { status: 201 });
}
