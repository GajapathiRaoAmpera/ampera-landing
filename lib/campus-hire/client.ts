import "server-only";
import { mockOpenings } from "./mock";
import type { ApplyResult, Opening, OpeningDetail } from "./types";

// Server-only: the browser never talks to Campus Hire, and the site never stores applicant data.
const API = process.env.CAMPUS_HIRE_API_URL?.replace(/\/$/, "");
// shortcut: mock only outside production so fake roles can never reach real visitors; replace once the API is live.
const useMock = !API && process.env.NODE_ENV !== "production";

export async function getOpenings(): Promise<Opening[]> {
  if (!API) return useMock ? mockOpenings : [];
  const res = await fetch(`${API}/api/v1/public/openings`, { next: { tags: ["openings"] } });
  if (!res.ok) throw new Error(`Campus Hire openings: ${res.status}`);
  return res.json();
}

export async function getOpening(slug: string): Promise<OpeningDetail | null> {
  if (!API) return useMock ? (mockOpenings.find((o) => o.slug === slug) ?? null) : null;
  const res = await fetch(`${API}/api/v1/public/openings/${encodeURIComponent(slug)}`, {
    next: { tags: ["openings", `opening:${slug}`] },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Campus Hire opening: ${res.status}`);
  return res.json();
}

export async function submitApplication(
  slug: string,
  body: FormData,
  ip: string,
): Promise<ApplyResult> {
  if (!API) return useMock ? { ok: true } : { ok: false, status: 503 };
  try {
    const res = await fetch(`${API}/api/v1/public/openings/${encodeURIComponent(slug)}/apply`, {
      method: "POST",
      body,
      headers: { "X-Forwarded-For": ip },
      cache: "no-store",
    });
    return res.ok ? { ok: true } : { ok: false, status: res.status };
  } catch {
    return { ok: false, status: 503 };
  }
}
