import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Next.js configuration
   * - Cache Components disabled in dev to reduce memory (900MB → ~400MB)
   * - Enable for production builds only
   */
  reactStrictMode: true,
  cacheComponents: process.env.NODE_ENV === "production",
  // Allow cross-origin requests from local network devices
  allowedDevOrigins: ['192.168.70.83', '192.168.70.39', 'localhost'],
};

export default nextConfig;
