import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Native / Prisma modules must stay external to the server bundle so their
  // native bindings and file resolution work at runtime.
  serverExternalPackages: [
    "better-sqlite3",
    "@prisma/adapter-better-sqlite3",
    "@prisma/client",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
