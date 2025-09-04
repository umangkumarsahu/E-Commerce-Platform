import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Allow LAN access to dev assets from this origin; adjust if your IP/port changes
    allowedDevOrigins: ["http://192.168.1.45:3000"],
  },
};

export default nextConfig;
