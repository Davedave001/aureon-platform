import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, password } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    password?: unknown;
  };

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanPassword = typeof password === "string" ? password : "";

  if (!cleanName) {
    return Response.json({ error: "Name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return Response.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }
  if (cleanPassword.length < 8) {
    return Response.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: cleanEmail },
  });
  if (existing) {
    return Response.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(cleanPassword, 12);
  await prisma.user.create({
    data: {
      name: cleanName,
      email: cleanEmail,
      passwordHash,
      role: "member",
    },
  });

  return Response.json({ ok: true }, { status: 201 });
}
