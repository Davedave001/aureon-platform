import path from "node:path";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Prisma 7 requires a driver adapter. SQLite uses better-sqlite3.
// Resolve to an absolute path so the DB opens regardless of the process cwd
// inside the bundled Next.js server (a bare "./dev.db" resolves incorrectly).
const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const filePart = rawUrl.replace(/^file:/, "");
const absPath = path.isAbsolute(filePart)
  ? filePart
  : path.resolve(process.cwd(), filePart);
// Use forward slashes — inside the bundled Next server, better-sqlite3's
// directory check can run through a POSIX path helper that mishandles "\".
const posixPath = absPath.replace(/\\/g, "/");

const adapter = new PrismaBetterSqlite3({ url: `file:${posixPath}` });

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
