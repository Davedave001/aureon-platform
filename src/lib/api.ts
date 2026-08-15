/**
 * Client-side API helper. When NEXT_PUBLIC_API_URL is set (e.g.
 * "https://api.aureoncapitalai.com"), data requests go to the API container;
 * otherwise they hit the same origin. `credentials: "include"` sends the
 * shared session cookie across subdomains.
 *
 * NEXT_PUBLIC_* is inlined at BUILD time — set it as a build arg when building
 * the frontend image (see Dockerfile / DEPLOY.md).
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}

export async function apiFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  // Let the browser set the multipart boundary for FormData uploads; only
  // default to JSON for regular bodies.
  const isFormData =
    typeof FormData !== "undefined" && init?.body instanceof FormData;

  return fetch(apiUrl(path), {
    credentials: "include",
    ...init,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(init?.headers ?? {}),
    },
  });
}
