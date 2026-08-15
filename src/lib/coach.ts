/**
 * Server-side bridge to the AI Trading Coach service.
 *
 * The coach runs as its own container and is never exposed to the browser.
 * Requests go: browser -> our authenticated /api/coach/* proxy -> coach.
 * The proxy injects a shared secret (COACH_SECRET) and the signed-in user's
 * id (X-Account-Id) so each user's trades live in an isolated database.
 */

const COACH_URL = process.env.COACH_URL;
const COACH_SECRET = process.env.COACH_SECRET;

export function coachConfigured(): boolean {
  return Boolean(COACH_URL);
}

export type CoachResult = {
  status: number;
  body: ArrayBuffer;
  contentType: string;
};

/**
 * Forward a request to the coach for a given account (user id). `path` is the
 * segments after /api/v1, e.g. ["performance", "summary"].
 */
export async function coachRequest(
  accountId: string,
  path: string[],
  init: {
    method: string;
    search?: string;
    body?: ArrayBuffer | null;
    contentType?: string | null;
  }
): Promise<CoachResult> {
  if (!COACH_URL) {
    throw new Error("COACH_URL is not configured");
  }

  const safePath = path
    .filter((p) => p && p !== "." && p !== "..")
    .map(encodeURIComponent)
    .join("/");
  const url = `${COACH_URL.replace(/\/$/, "")}/api/v1/${safePath}${
    init.search ?? ""
  }`;

  const headers: Record<string, string> = { "X-Account-Id": accountId };
  if (COACH_SECRET) headers["X-Coach-Secret"] = COACH_SECRET;
  if (init.contentType) headers["Content-Type"] = init.contentType;

  const res = await fetch(url, {
    method: init.method,
    headers,
    body: init.body ?? undefined,
    // never cache per-user trading data
    cache: "no-store",
  });

  return {
    status: res.status,
    body: await res.arrayBuffer(),
    contentType: res.headers.get("content-type") ?? "application/json",
  };
}
