import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/entering-my-mind",
        destination: "/api/auth",
      },
    ];
  },
  images: {
    domains: ["static.accelerator.net"],
  },
};

export default nextConfig;
