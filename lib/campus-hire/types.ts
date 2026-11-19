// Response shapes from 06-open-roles.md §4.2. Public whitelist only.
export type Opening = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  location: string;
  workplace: "onsite" | "hybrid" | "remote";
  employment_type: "full_time" | "part_time" | "contract" | "internship";
  experience_min: number | null;
  experience_max: number | null;
  salary: { min: number | null; max: number | null; currency: string; period: string } | null;
  posted_at: string;
  closes_at: string | null;
};

export type OpeningDetail = Opening & { description: string; updated_at: string };

export type ApplyResult = { ok: true } | { ok: false; status: number };
