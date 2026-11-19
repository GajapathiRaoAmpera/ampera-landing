import { readdirSync } from "node:fs";
import { join } from "node:path";

// Headshot for /about/leadership-team/<slug>, from public/images (see download-images.sh).
export function headshot(path: string): string | null {
  const dir = "images/" + path.slice(1).replace(/\//g, "_");
  try {
    const f = readdirSync(join(process.cwd(), "public", dir))[0];
    return f ? `/${dir}/${f}` : null;
  } catch {
    return null;
  }
}

export const img = {
  iso: "/images/home/zmoEALUyiaMjMCkWSwURkbwi4.jpg",
  team: "/images/home/uAKI1F420eu0qHprW1A2FFhmk.webp",
  meeting: "/images/about/I6c1rd3lslpSYOXt0CpU4bC4.png",
  accessibility: "/images/accelerators/eyO01LqZco2u5xjgwE1oXQzOeI.png",
  microsoft: "/images/home/A62eiHRfyvALlSQuIaV9nWlOb8.webp",
  pyramid: "/images/home/8ugqiHw4GzdL44wjNwOob1KfLEU.png",
};

const A = "/images/accelerators_market-intelligence/";
const SV = "/images/services_";
const cover: Record<string, string> = {
  "/sub-accelerators/sales-enablement": A + "qATmScqy2iZYkbx6lV4lXb9i57c.png",
  "/sub-accelerators/price-intelligence": A + "auK6oRacJLromuWxDmo1cAscxI.png",
  "/sub-accelerators/knowledge-assistant": A + "23SJOIWZoMurhShDGoPpPmEAI.png",
  "/sub-accelerators/web-accessibility":
    "/images/accelerators_ai-powered-digital-accessibility/jXhizKGmJt0For6oz5Z3kS6RYY.png",
  "/accelerators/market-intelligence": A + "auK6oRacJLromuWxDmo1cAscxI.png",
  "/accelerators/ai-powered-digital-accessibility": img.accessibility,
  "/services/genai-llms": SV + "genai-llms/hg7tnUpx2hQuhVv82QPDjoJToI.png",
  "/services/agentic-autonomous-ai": SV + "agentic-autonomous-ai/rGvWzq7X3dldq6v4isyhLaq0ac.png",
  "/services/data-science-machine-learning":
    SV + "data-science-machine-learning/9wLOGFUThPVwFcHjMPIhydd4.png",
  "/services/cloud-data-engineering": SV + "cloud-data-engineering/XqNkZRxhZ5i6fP6ZobQOMlY0.png",
  "/services/digital-accessibility": SV + "digital-accessibility/7ogR5ERwznfoqpjZxYw4LkqY7nE.png",
  "/about": img.meeting,
};

// Cover image for a page: explicit map first, then the first photo in its project folder.
export function coverFor(path: string): string | null {
  if (cover[path]) return cover[path];
  if (!path.startsWith("/projects/")) return null;
  const dir = "images/projects_" + path.slice("/projects/".length);
  try {
    const f = readdirSync(join(process.cwd(), "public", dir)).sort()[0];
    return f ? `/${dir}/${f}` : null;
  } catch {
    return null;
  }
}
