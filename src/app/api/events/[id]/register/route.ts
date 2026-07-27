import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

// Toggle the current user's ticket for an event.
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const { id: eventId } = await params;

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return jsonWithCors(req, { error: "Not found" }, { status: 404 });
  }

  const existing = await prisma.eventTicket.findUnique({
    where: { eventId_userId: { eventId, userId } },
  });

  if (existing) {
    await prisma.eventTicket.delete({ where: { id: existing.id } });
  } else {
    await prisma.eventTicket.create({ data: { eventId, userId } });
  }

  const attendees = await prisma.eventTicket.count({ where: { eventId } });
  return jsonWithCors(req, { attendees, registered: !existing });
}
