import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { jsonWithCors, preflight } from "@/lib/cors";

export function OPTIONS(req: Request) {
  return preflight(req);
}

const DEFAULTS = {
  enabled: false,
  maxLot: 0.1,
  instruments: "",
  minConfidence: 70,
  minImpact: "high",
};

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }
  const config = await prisma.autoTradeConfig.findUnique({ where: { userId } });
  return jsonWithCors(req, {
    config: config
      ? {
          enabled: config.enabled,
          maxLot: config.maxLot,
          instruments: config.instruments ?? "",
          minConfidence: config.minConfidence,
          minImpact: config.minImpact,
        }
      : DEFAULTS,
  });
}

export async function PUT(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  const raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const enabled = Boolean(raw.enabled);
  const maxLot = Math.max(
    0.01,
    Math.min(100, typeof raw.maxLot === "number" ? raw.maxLot : DEFAULTS.maxLot)
  );
  const instruments =
    typeof raw.instruments === "string"
      ? raw.instruments.toUpperCase().slice(0, 300)
      : "";
  const minConfidence = Math.max(
    0,
    Math.min(
      100,
      typeof raw.minConfidence === "number" ? raw.minConfidence : DEFAULTS.minConfidence
    )
  );
  const minImpact = ["low", "medium", "high"].includes(String(raw.minImpact))
    ? (raw.minImpact as string)
    : DEFAULTS.minImpact;

  const data = { enabled, maxLot, instruments, minConfidence, minImpact };

  const config = await prisma.autoTradeConfig.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });

  return jsonWithCors(req, {
    config: {
      enabled: config.enabled,
      maxLot: config.maxLot,
      instruments: config.instruments ?? "",
      minConfidence: config.minConfidence,
      minImpact: config.minImpact,
    },
  });
}
