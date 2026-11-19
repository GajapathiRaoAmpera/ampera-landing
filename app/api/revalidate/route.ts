import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { getOpening } from "@/lib/campus-hire/client";
import { pingIndexing } from "@/lib/google-indexing";

const safeEqual = (a: string, b: string) =>
  a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

// Called by Campus Hire on publish/edit/unpublish/close (AC-52).
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || !safeEqual(req.headers.get("x-revalidate-secret") ?? "", secret))
    return Response.json({ error: "unauthorized" }, { status: 401 });

  const { slug } = (await req.json().catch(() => ({}))) as { slug?: unknown };
  if (slug !== undefined && (typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)))
    return Response.json({ error: "bad slug" }, { status: 400 });

  revalidateTag("openings", { expire: 0 });
  if (!slug) return Response.json({ revalidated: true });

  revalidateTag(`opening:${slug}`, { expire: 0 });
  const stillOpen = await getOpening(slug).catch(() => undefined);
  if (stillOpen === undefined) return Response.json({ revalidated: true, indexing: "skipped" });
  const indexing = await pingIndexing(
    `/careers/${slug}`,
    stillOpen ? "URL_UPDATED" : "URL_DELETED",
  );
  return Response.json({ revalidated: true, indexing });
}
