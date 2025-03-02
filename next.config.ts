import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/entering-my-mind",
        destination: "/auth",
      },
    ];
  },
  images: {
    domains: ["static.accelerator.net"],
  },
};

export default nextConfig;
