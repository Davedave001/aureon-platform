import type { NextAuthConfig } from "next-auth";

const useSecureCookies = process.env.NODE_ENV === "production";

/**
 * When the app is served across multiple subdomains (e.g. platform.* and
 * api.*), set AUTH_COOKIE_DOMAIN to the shared parent (".aureoncapitalai.com")
 * so the session cookie is valid on all of them. Leave it unset for a single
 * domain / local dev.
 */
const cookieDomain = process.env.AUTH_COOKIE_DOMAIN;

const sharedCookies: NextAuthConfig["cookies"] = cookieDomain
  ? {
      sessionToken: {
        name: `${useSecureCookies ? "__Secure-" : ""}authjs.session-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: useSecureCookies,
          domain: cookieDomain,
        },
      },
    }
  : undefined;

/**
 * Base Auth.js config shared by the full auth instance (`auth.ts`) and the
 * lightweight instance used in `proxy.ts`. Deliberately imports NO database or
 * bcrypt code so the proxy stays lean — providers are added in `auth.ts`.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  ...(sharedCookies ? { cookies: sharedCookies } : {}),
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "member";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.role =
          typeof token.role === "string" ? token.role : "member";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
