import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/course/:slug*",
        destination: "/course", // Matched parameters can be used in the destination
      },
    ];
  },
};

export default nextConfig;
