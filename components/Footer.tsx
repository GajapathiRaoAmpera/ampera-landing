import Image from "next/image";
import Link from "next/link";
import { LuArrowUp, LuArrowUpRight, LuBadgeCheck, LuMail } from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa6";
import { services, site } from "@/lib/site";

const columns = [
  {
    title: "Agents",
    links: [
      { href: "/accelerators", label: "All accelerators" },
      { href: "/accelerators/market-intelligence", label: "Market Intelligence" },
      { href: "/accelerators/ai-powered-digital-accessibility", label: "AI-Powered Accessibility" },
      { href: "/sub-accelerators/vpat-generator", label: "VPAT Generator" },
      { href: "/sub-accelerators/knowledge-assistant", label: "Knowledge Assistant" },
    ],
  },
  { title: "Services", links: services.map((s) => ({ href: s.href, label: s.name })) },
  {
    title: "Resources",
    links: [
      { href: "/projects", label: "Case studies" },
      { href: "/blogs", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

const partners = ["Microsoft", "Databricks", "Snowflake"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* hairline + glow separate the footer from dark sections above it */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-purple/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Link href="/" aria-label="Ampera Technologies, home" className="inline-block">
              <Image
                src="/brand/ampera-logo.png"
                alt="Ampera"
                width={810}
                height={226}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-white/75">
              {site.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-white/25 px-5 text-base transition-colors hover:border-purple hover:bg-purple/15"
              >
                <LuMail aria-hidden className="size-4" />
                {site.email}
              </a>
              <a
                href={site.linkedin}
                aria-label="Ampera on LinkedIn"
                className="grid size-11 place-items-center rounded-full border border-white/25 transition-colors hover:border-purple hover:bg-purple/15"
              >
                <FaLinkedinIn aria-hidden className="size-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group inline-flex min-h-8 items-center gap-1 text-[15px] text-white/85 transition-colors hover:text-white"
                      >
                        {l.label}
                        <LuArrowUpRight
                          aria-hidden
                          className="size-3.5 -translate-x-1 text-purple opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8 text-sm">
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/25 px-4 py-1.5">
            <LuBadgeCheck aria-hidden className="size-4 text-purple" />
            ISO certified · Intertek
          </span>
          <span className="text-white/60">Technology partners</span>
          {partners.map((p) => (
            <span
              key={p}
              className="rounded-pill border border-white/15 px-4 py-1.5 font-mono text-xs text-white/85"
            >
              {p}
            </span>
          ))}
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/25 px-4 py-1.5 lg:ml-auto">
            <span aria-hidden className="size-2 rounded-full bg-purple" />
            Accessibility by default
          </span>
        </div>
      </div>

      {/* decorative wordmark; the name is already in the logo alt text */}
      <p
        aria-hidden
        className="relative select-none bg-gradient-to-b from-purple/50 to-transparent bg-clip-text text-center text-[22vw] font-extralight leading-[0.85] tracking-tight text-transparent lg:text-[16rem]"
      >
        Ampera
      </p>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-sm text-white/65">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a
            href="#main"
            className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-white"
          >
            Back to top
            <LuArrowUp aria-hidden className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
