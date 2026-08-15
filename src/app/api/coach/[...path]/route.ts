import { auth } from "@/auth";
import { corsHeaders, jsonWithCors, preflight } from "@/lib/cors";
import { coachConfigured, coachRequest } from "@/lib/coach";

export function OPTIONS(req: Request) {
  return preflight(req);
}

async function handle(
  req: Request,
  path: string[]
): Promise<Response> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return jsonWithCors(req, { error: "Unauthorized" }, { status: 401 });
  }

  if (!coachConfigured()) {
    return jsonWithCors(
      req,
      { error: "The trading coach service is not connected yet." },
      { status: 503 }
    );
  }

  const url = new URL(req.url);
  const hasBody = req.method !== "GET" && req.method !== "HEAD";

  try {
    const result = await coachRequest(userId, path, {
      method: req.method,
      search: url.search,
      body: hasBody ? await req.arrayBuffer() : null,
      contentType: hasBody ? req.headers.get("content-type") : null,
    });

    return new Response(result.body, {
      status: result.status,
      headers: {
        "Content-Type": result.contentType,
        ...corsHeaders(req),
      },
    });
  } catch {
    return jsonWithCors(
      req,
      { error: "Could not reach the trading coach service." },
      { status: 502 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handle(req, path);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handle(req, path);
}
