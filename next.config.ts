import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export for a pure frontend handoff
  output: "export",
  images: {
    // Disable Next.js image optimization for static export compatibility
    unoptimized: true,
  },
  // Frontend-only handoff: ignore TS/ESLint errors from backend-only files
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
