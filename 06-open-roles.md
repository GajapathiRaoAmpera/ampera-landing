# 06 — Open roles: individual applicants from amperatech.ai

**Status:** draft for team review · 18 Nov 2026
**Scope:** let anyone (not only invited campus students) apply for an open role through the public website and go through the same Campus Hire pipeline.
**Repos:**
- `recruitment-backend`: everything in sections 2–6.
- `ampera-landing` (Next.js): section 7.
- `recruitment-frontend`: the small HR UI changes in section 8.

> **ID numbering:** this doc uses **FR-40…FR-47**, **AC-40…AC-55** and **D20** to avoid clashing with existing ids (the code references up to FR-28 / AC-8 / D11). Renumber to match `01-requirements.md` before merging.

---

## 1. Why

- **Campus Hire today:** campus-only.
  - `drives.campus` is required.
  - Candidates are imported from a Google Form export.
  - Students sign in with Student ID + DOB.
  - Every route needs a staff role.
- **The new need:** experienced and individual hires apply from amperatech.ai.
- **What we reuse:** everything after the "way in" — resume parsing (`candidates/parser.py`), JD matching (`matcher.py`), rounds, tests, Judge0, the AI interview, ranking, emails, audit and reports.

**D20 — One system for all hiring:** open roles are drives with `kind = 'open'`. We are not building a second ATS in the website.

- **Why:** one HR dashboard, one candidate store and one place to secure for DPDP.
- **Trade-off:** Campus Hire now exposes two unauthenticated endpoints, so it needs the hardening in section 5.

---

## 2. Requirements

| ID | Requirement |
|---|---|
| FR-40 | A drive has a kind: `campus` (today's behaviour) or `open`. For `open`, `campus` is not required. |
| FR-41 | An open drive carries public listing fields: location, workplace (`onsite`/`hybrid`/`remote`), employment type, experience range, optional salary range, and `closes_at`. |
| FR-42 | HR can publish or unpublish an open drive for the public site. Only `kind='open' AND status='active' AND published AND (closes_at IS NULL OR closes_at > now())` is public. |
| FR-43 | Anyone can list published open roles and view one, without signing in. |
| FR-44 | Anyone can apply to a published open role with name, email, phone (optional), resume PDF and explicit consent. The resume is parsed and matched like campus resumes. |
| FR-45 | An open-role applicant reaches later rounds through an emailed one-time link (magic link), not Student ID + DOB. |
| FR-46 | When an open drive is published, edited, unpublished or closed, the website is told to refresh (revalidation webhook). |
| FR-47 | Consent is recorded (notice version + timestamp + IP hash) for every applicant, and an applicant can ask for deletion. |

## 3. Acceptance criteria

| ID | Criterion |
|---|---|
| AC-40 | Creating a drive with `kind='open'` and no `campus` succeeds; `kind='campus'` without `campus` still fails with 422. |
| AC-41 | `GET /public/openings` returns only rows matching FR-42; a draft, closed, unpublished or expired drive never appears. |
| AC-42 | The public responses contain only the whitelisted fields in §4.2. No owner, candidate counts, rounds config, tests, questions, prompts or internal ids beyond `slug`/`id`. A test asserts the exact key set. |
| AC-43 | `POST /public/openings/{slug}/apply` with valid input returns 201, creates `candidates` + `resumes` rows, and runs parse + JD match. |
| AC-44 | The same email applying twice to the same drive returns 409 `ALREADY_APPLIED`. No duplicate row, and no detail is leaked beyond that message. |
| AC-45 | Apply is rejected (422) without `consent=true`, for a non-PDF, for a PDF over 5 MB, or when the file's magic bytes are not `%PDF`. |
| AC-46 | Apply is rejected (403 `CAPTCHA_FAILED`) when the Turnstile token is missing or invalid. Turnstile is mocked in tests. |
| AC-47 | Apply is rate-limited: the 6th request from one IP within 10 minutes returns 429. |
| AC-48 | Applying to a drive that is not public returns 404 (not 403), so the API does not reveal that hidden drives exist. |
| AC-49 | When an open-role candidate is invited to a round, they receive an email with a single-use link valid for 48 h. Opening it issues the same entry token `/entry/*` already uses, with typ `entry` and claim `cid`. |
| AC-50 | A used or expired magic link returns 401 `INVALID_TOKEN`. Campus Student ID + DOB entry is unchanged (existing tests still pass). |
| AC-51 | `POST /public/candidate/magic-link` with an unknown email returns 204, the same as a known one (no account enumeration), and is rate-limited. |
| AC-52 | Publish, unpublish, edit and close of an open drive each write `audit_logs` and call the website's revalidate URL with the shared secret. A webhook failure is logged and does not roll back the HR action. |
| AC-53 | Every new applicant row has `consent_version`, `consent_at` and `consent_ip_hash` set. |
| AC-54 | Super Admin can erase an open-role applicant. This deletes the candidate row (cascades to resume, attempts, answers and interviews), deletes the resume file, and writes an audit entry without personal data. |
| AC-55 | HR still sees only drives they own (existing AC-1). Open drives obey the same ownership rule. |

---

## 4. API contract changes (add to `04-api-contracts.md`)

### 4.1 Staff endpoints (changed)

**`POST /api/v1/drives`** (`require_role("hr")`): the body gains:
```jsonc
{
  "kind": "campus" | "open",          // default "campus"
  "campus": "string | null",          // required when kind = campus
  "listing": {                         // required when kind = open; ignored for campus
    "location": "Chennai, India",
    "workplace": "onsite" | "hybrid" | "remote",
    "employment_type": "full_time" | "part_time" | "contract" | "internship",
    "experience_min": 2, "experience_max": 5,      // years, nullable
    "salary_min": null, "salary_max": null, "salary_currency": "INR", "salary_period": "year",
    "closes_at": "2026-12-31T18:29:59Z"            // nullable
  }
}
```
`DriveOut` gains `kind`, `listing`, `published` and `slug`.

**`PATCH /api/v1/drives/{id}/listing`** (hr, owner): edits the listing fields → audit `drive.listing.update` → webhook.

**`POST /api/v1/drives/{id}/publish`** and **`/unpublish`** (hr, owner):
- Publishing is allowed only when `kind='open'` and `status='active'`.
- Audit `drive.publish` / `drive.unpublish` → webhook.

**`DELETE /api/v1/admin/candidates/{id}`** (super_admin): DPDP erasure (AC-54).

### 4.2 Public endpoints (new, no auth, router `app/public/`)

**`GET /api/v1/public/openings`**: list. Cache-Control `public, max-age=60`.
```jsonc
[{
  "id": "uuid", "slug": "senior-data-engineer-chennai",
  "title": "Senior Data Engineer",
  "summary": "first ~300 chars of jd_text, plain text",
  "location": "Chennai, India", "workplace": "hybrid",
  "employment_type": "full_time", "experience_min": 2, "experience_max": 5,
  "salary": null,                       // or {min,max,currency,period}
  "posted_at": "2026-11-18T05:00:00Z",  // first publish time
  "closes_at": "2026-12-31T18:29:59Z"
}]
```

**`GET /api/v1/public/openings/{slug}`**: the same fields plus `description` (full `jd_text`) and `updated_at`. Returns 404 when the drive is not public.

**`POST /api/v1/public/openings/{slug}/apply`**: `multipart/form-data`.

| field | rule |
|---|---|
| `full_name` | 1–120 chars |
| `email` | valid email, lower-cased |
| `phone` | optional, ≤ 20 chars |
| `linkedin_url` | optional, https only |
| `resume` | PDF, ≤ 5 MB, magic bytes `%PDF` |
| `consent` | must be `true` |
| `consent_version` | e.g. `"2026-11-v1"` (sent by website) |
| `turnstile_token` | Cloudflare Turnstile token |

- **201:** `{"status": "received"}`, with nothing about scoring.
- **Errors:** 404 `NOT_FOUND`, 409 `ALREADY_APPLIED`, 422 validation, 403 `CAPTCHA_FAILED`, 429 `RATE_LIMITED`.
- **Side effects:** a confirmation email to the applicant (template `application_received`), plus an `audit_logs` row with `actor_id = null`, action `public.apply` and no personal data in `diff`.

**`POST /api/v1/public/candidate/magic-link`**: `{ "email" }` → always 204. Re-sends a link for the candidate's current invited round, if there is one.

**`POST /api/v1/entry/magic`**: `{ "token" }` → the same response shape as `POST /entry/verify` (entry token + rounds). This is the single-use path for FR-45.

---

## 5. Security rules (backend)

- **Router and routes:** a new router `app/public/` with its own `CLAUDE.md` (danger zone). Every route in it is listed explicitly; no `require_role`, but each one is reviewed.
- **Output whitelist:** public responses are built from a dedicated Pydantic model. Never return `DriveOut` or ORM rows.
- **Turnstile:** verify server-side against `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Add `TURNSTILE_SECRET` to `.env.example`.
- **Rate limit:** per IP and per email on apply and magic-link. A simple Postgres-backed counter table is fine (no new dependency); otherwise ask before adding one.
- **Uploads:**
  - Check the PDF size before reading the full body.
  - Reuse `MAX_PDF = 5 MB`.
  - Store under a UUID key only (the existing `storage._full` guard).
- **Storage:** move resume storage to Azure Blob (private container, SAS URLs for HR downloads) before go-live. `storage.py` already flags local disk as a shortcut.
- **Magic links:**
  - 32-byte random token, stored as a SHA-256 hash, single use, 48 h expiry.
  - Signed separately from staff JWTs (same pattern as `entry_signing_key`).
- **CORS:** allow the website origin only for `/api/v1/public/*`. The website calls these from its **server**, so the browser never talks to Campus Hire directly, except the magic-link landing page if it is hosted on the Campus Hire frontend.
- **Logs:** never log resume text, phone or email in plain text.

## 6. Schema changes (new migration `0012_open_roles.py` + update `03-database-schema.md`)

```sql
create type drive_kind as enum ('campus', 'open');
create type workplace as enum ('onsite', 'hybrid', 'remote');

alter table drives
  add column kind drive_kind not null default 'campus',
  alter column campus drop not null,
  add column slug text unique,
  add column published boolean not null default false,
  add column published_at timestamptz,
  add column updated_at timestamptz not null default now(),
  add column location text,
  add column workplace workplace,
  add column employment_type text,
  add column experience_min int,
  add column experience_max int,
  add column salary_min numeric(12,2),
  add column salary_max numeric(12,2),
  add column salary_currency text,
  add column salary_period text,
  add column closes_at timestamptz,
  add constraint drives_campus_required check (kind = 'open' or campus is not null),
  add constraint drives_open_publishable check (published = false or kind = 'open');

alter table candidates
  alter column student_id drop not null,
  alter column dob drop not null,
  add column source text not null default 'import',      -- 'import' | 'web'
  add column linkedin_url text,
  add column consent_version text,
  add column consent_at timestamptz,
  add column consent_ip_hash text,
  add constraint candidates_campus_identity check (source = 'web' or (student_id is not null and dob is not null));
-- existing unique (drive_id, student_id) still holds for campus rows (NULLs don't collide)
create unique index candidates_drive_email_web on candidates (drive_id, lower(email)) where source = 'web';

create table magic_links (
  id           uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidates(id) on delete cascade,
  token_hash   text not null unique,
  expires_at   timestamptz not null,
  used_at      timestamptz,
  created_at   timestamptz not null default now()
);

create table rate_hits (
  key        text not null,            -- e.g. 'apply:ip:<hash>' or 'apply:email:<hash>'
  hit_at     timestamptz not null default now()
);
create index on rate_hits (key, hit_at);
create index on drives (kind, status, published);
```
Check the RLS policies from `0008_rls_current_schema.py` and extend them to the new tables.

---

## 7. Website side (`ampera-landing`, Next.js)

- **Env (server only):**
  - `CAMPUS_HIRE_API_URL`
  - `REVALIDATE_SECRET`
  - `TURNSTILE_SITE_KEY` (public), `TURNSTILE_SECRET` (only if the website also verifies)
- **`/careers`:**
  - Server component; `fetch(`${API}/public/openings`, { next: { tags: ['openings'] } })`.
  - Lists the roles.
  - Includes a "Campus drives" note pointing students to their college placement cell.
- **`/careers/[slug]`:**
  - Server component; fetch tagged `openings` + `opening:${slug}`.
  - Full JD as HTML.
  - **JobPosting JSON-LD** on this page only:
    - title, description, datePosted = `posted_at`, validThrough = `closes_at`
    - hiringOrganization = Ampera Technologies
    - jobLocation (with addressCountry `IN`), or `jobLocationType: TELECOMMUTE` + applicantLocationRequirements when `workplace = remote`
    - employmentType, baseSalary only when real, `directApply: true`, identifier = id
  - Returns `notFound()` (404) when the API returns 404, so closed jobs drop out of Google.
- **Apply form (on the job page):**
  - A Server Action posts `multipart/form-data` to `/public/openings/{slug}/apply`, forwarding the Turnstile token and the client IP header.
  - Accessible: labels, error summary, `aria-describedby`, keyboard file input, email fallback text.
  - The consent checkbox is unticked by default and links to the privacy notice (version string sent).
- **`/api/revalidate`:**
  - POST with header `x-revalidate-secret`; body `{ slug?: string }`.
  - Calls `revalidateTag('openings', { expire: 0 })` and, if a slug is given, `revalidateTag('opening:'+slug, { expire: 0 })`.
  - Then pings the Google Indexing API (`URL_UPDATED` or `URL_DELETED`) for `/careers/{slug}`.
- **`sitemap.ts`:** includes `/careers/{slug}` for every public opening.
- **Chatbot tool `searchOpenings({ query?, location?, workplace? })`:** calls `/public/openings` on the server and returns cards linking to `/careers/{slug}`. The bot never invents roles or salaries.

## 8. HR UI (`recruitment-frontend`)

- **Create Drive:**
  - A kind toggle (Campus / Open role).
  - When "Open role" is selected, show the listing fields and hide Campus and the candidate import.
- **Drive page:**
  - A Publish/Unpublish switch with a "View on website" link.
  - Shows `source` (import/web) per candidate.
- **Invites:** the round invite email for web candidates contains the magic link instead of Student-ID instructions (`notifications/round_invites.py`).

## 9. Task order (suggested)

1. Migration `0012` + schema doc → AC-40, AC-53 tests.
2. Drive create/listing/publish endpoints + audit + webhook → AC-40, AC-52, AC-55.
3. `app/public/` list/detail with whitelist model → AC-41, AC-42, AC-48.
4. Apply endpoint (Turnstile, rate limit, PDF checks, parse + match, email) → AC-43–AC-47.
5. Magic links + invite emails → AC-49–AC-51.
6. Erasure endpoint → AC-54.
7. Azure Blob storage for resumes (production prerequisite).
8. Website pages, form, revalidate route, JSON-LD, sitemap; then the chatbot tool.
9. HR UI changes.

## 10. Open decisions

- Privacy notice text, consent wording and retention period for rejected open-role applicants (suggested: delete 12 months after the drive closes). **Needs legal review (DPDP; main duties from ~13 May 2027).**
- Do open roles use the same default rounds as campus drives? Experienced hires may skip aptitude.
- Should the magic-link landing page live on the website or on the Campus Hire frontend? (It affects CORS.)
- Should salary ranges be shown? (They help with Google for Jobs, but are a business decision.)
