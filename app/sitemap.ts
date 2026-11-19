import type { MetadataRoute } from "next";
import { getOpenings } from "@/lib/campus-hire/client";
import { paths } from "@/lib/content";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const openings = await getOpenings().catch(() => []);
  return [
    ...["/", "/careers", ...paths].map((p) => ({ url: site.url + p })),
    ...openings.map((o) => ({ url: `${site.url}/careers/${o.slug}`, lastModified: o.posted_at })),
  ];
}
