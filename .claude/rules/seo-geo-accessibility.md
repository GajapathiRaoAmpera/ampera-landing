# SEO / GEO / Accessibility Rules

- Every page: unique `title` + `description`, OpenGraph, canonical via the Metadata API; JSON-LD per CLAUDE.md §7.
- 3D/canvas is decoration only; headline, text and links are real HTML outside it. Reduced motion → static fallback.
- WCAG 2.2 AA: contrast ≥ 4.5:1, real buttons/links/labels, visible focus, skip link, 24px+ targets, nav text ≥ 14px.
- Body text weight ≥ 400. `grey` (#969696) never for body text.
- Images use `next/image` with real alt; decorative alt="". No text baked into images.
- Keep every legacy URL (CLAUDE.md §9) working.
