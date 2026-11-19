import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Resume PDFs go through a server action (limit 5 MB + form fields).
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
};

export default nextConfig;
