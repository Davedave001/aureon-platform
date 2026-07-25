/**
 * CORS for cross-subdomain API calls (frontend platform.* -> api.*).
 *
 * Set ALLOWED_ORIGIN to the frontend origin(s) that may call this API with
 * credentials, e.g. "https://platform.aureoncapitalai.com" (comma-separated for
 * several). When unset (single-domain / local dev), no CORS headers are added
 * and same-origin requests work as normal.
 *
 * Credentialed CORS cannot use "*", so we echo back the specific allowed origin.
 */
const ALLOWED = (process.env.ALLOWED_ORIGIN ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export function corsHeaders(req: Request): Record<string, string> {
  if (ALLOWED.length === 0) return {};
  const origin = req.headers.get("origin");
  if (origin && ALLOWED.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    };
  }
  return {};
}

/** JSON response with CORS headers applied. */
export function jsonWithCors(
  req: Request,
  data: unknown,
  init?: ResponseInit
): Response {
  return Response.json(data, {
    ...init,
    headers: { ...corsHeaders(req), ...(init?.headers ?? {}) },
  });
}

/** CORS preflight responder. */
export function preflight(req: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(req) });
}
