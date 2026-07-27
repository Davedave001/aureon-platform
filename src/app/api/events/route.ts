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

  const events = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    take: 100,
    include: {
      organizer: { select: { id: true, name: true, email: true } },
      _count: { select: { tickets: true } },
      tickets: { where: { userId }, select: { id: true } },
    },
  });

  const shaped = events.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    category: e.category,
    location: e.location,
    startsAt: e.startsAt,
    price: e.price,
    capacity: e.capacity,
    organizer: e.organizer.name ?? e.organizer.email,
    attendees: e._count.tickets,
    registered: e.tickets.length > 0,
    mine: e.organizer.id === userId,
  }));

  return jsonWithCors(req, { events: shaped });
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const startsAtRaw =
    typeof body.startsAt === "string" ? body.startsAt : "";
  const startsAt = startsAtRaw ? new Date(startsAtRaw) : null;

  if (!title || !startsAt || Number.isNaN(startsAt.getTime())) {
    return jsonWithCors(
      req,
      { error: "Title and a valid date are required." },
      { status: 400 }
    );
  }

  const str = (v: unknown, max = 200) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;
  const capacity =
    typeof body.capacity === "number" && body.capacity > 0
      ? Math.round(body.capacity)
      : null;

  const created = await prisma.event.create({
    data: {
      organizerId: userId,
      title: title.slice(0, 160),
      description: str(body.description, 2000),
      category: str(body.category, 40) ?? "Webinar",
      location: str(body.location, 120),
      startsAt,
      price: str(body.price, 40) ?? "Free",
      capacity,
    },
    include: {
      organizer: { select: { id: true, name: true, email: true } },
    },
  });

  return jsonWithCors(
    req,
    {
      event: {
        id: created.id,
        title: created.title,
        description: created.description,
        category: created.category,
        location: created.location,
        startsAt: created.startsAt,
        price: created.price,
        capacity: created.capacity,
        organizer: created.organizer.name ?? created.organizer.email,
        attendees: 0,
        registered: false,
        mine: true,
      },
    },
    { status: 201 }
  );
}
