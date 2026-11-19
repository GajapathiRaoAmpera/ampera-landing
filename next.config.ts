import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Resume PDFs go through a server action (limit 5 MB + form fields).
    serverActions: { bodySizeLimit: "6mb" },
    // CSS is small (~10 KB); inlining removes the render-blocking stylesheet requests.
    inlineCss: true,
  },
};

export default nextConfig;
