import type { NextAuthConfig } from "next-auth";

/**
 * Base Auth.js config shared by the full auth instance (`auth.ts`) and the
 * lightweight instance used in `proxy.ts`. Deliberately imports NO database or
 * bcrypt code so the proxy stays lean — providers are added in `auth.ts`.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
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
