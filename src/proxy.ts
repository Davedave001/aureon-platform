import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Lightweight instance — no DB/bcrypt. Only reads the JWT session to gate routes.
const { auth } = NextAuth(authConfig);

const PUBLIC_ROUTES = ["/login", "/signup"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth);
  const isPublic = PUBLIC_ROUTES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (isPublic) {
    // Signed-in users shouldn't see login/signup.
    if (isLoggedIn) {
      return Response.redirect(new URL("/", req.nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    const url = new URL("/login", req.nextUrl);
    if (pathname !== "/") {
      url.searchParams.set("callbackUrl", pathname);
    }
    return Response.redirect(url);
  }
});

export const config = {
  // Run on all routes except API, Next internals, and static assets.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|.*\\.(?:png|jpg|jpeg|svg|ico|webp)$).*)",
  ],
};
