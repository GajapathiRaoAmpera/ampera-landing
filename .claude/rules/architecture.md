# Architecture Rules

- Read `/CLAUDE.md` first; it is the spec. Do not invent routes, facts, numbers, client names or quotes. Use `[TODO: …]`.
- Next.js App Router, server components by default. `"use client"` only for interactive leaves (console, chat widget, forms, 3D).
- Content lives in `content/` (MDX/JSON); pages read it at build time. No important text may appear only after client JS.
- Styling is SCSS modules (no Tailwind). Brand tokens live once in `styles/_tokens.scss`; each component has its own `*.module.scss` and uses tokens only. Global classes (`styles/_utilities.scss`, `_animations.scss`) only for shared helpers and SVG animation.
- Homepage sections are server components in `components/home/`; their data is in `lib/home.ts`.
- Campus Hire is called only from the server (`lib/campus-hire/`), never from the browser. The site never stores applicant data.
