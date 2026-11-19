import type { OpeningDetail } from "./types";

// Dev-only stand-in until the Campus Hire public endpoints are live. Never used in production (see client.ts).
const base = {
  workplace: "hybrid",
  employment_type: "full_time",
  salary: null,
  posted_at: "2026-11-18T05:00:00Z",
  closes_at: "2026-12-31T18:29:59Z",
  updated_at: "2026-11-18T05:00:00Z",
  location: "Chennai, India",
  experience_min: 2,
  experience_max: 5,
} as const;

export const mockOpenings: OpeningDetail[] = [
  {
    ...base,
    id: "00000000-0000-4000-8000-000000000001",
    slug: "mock-senior-data-engineer-chennai",
    title: "[MOCK] Senior Data Engineer",
    summary: "Placeholder role for local development only.",
    description: "[MOCK] Placeholder job description.\n\nNot a real role.",
  },
  {
    ...base,
    id: "00000000-0000-4000-8000-000000000002",
    slug: "mock-ai-engineer-remote",
    title: "[MOCK] AI Engineer",
    summary: "Placeholder remote role for local development only.",
    workplace: "remote",
    description: "[MOCK] Placeholder job description.\n\nNot a real role.",
  },
];
