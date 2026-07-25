import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma / pg must stay external to the server bundle so runtime resolution
  // and native TLS work correctly.
  serverExternalPackages: ["pg", "@prisma/adapter-pg", "@prisma/client"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
