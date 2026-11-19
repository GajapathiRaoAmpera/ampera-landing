import type { Opening } from "./types";

const TYPE = {
  full_time: "Full time",
  part_time: "Part time",
  contract: "Contract",
  internship: "Internship",
};
const WORK = { onsite: "On-site", hybrid: "Hybrid", remote: "Remote" };

export function meta(o: Opening): string[] {
  const { experience_min: lo, experience_max: hi } = o;
  const exp = lo != null && hi != null ? `${lo}–${hi} years` : lo != null ? `${lo}+ years` : null;
  return [o.location, WORK[o.workplace], TYPE[o.employment_type], exp].filter(
    (x): x is string => !!x,
  );
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
