import Image from "next/image";
import Link from "next/link";
import { LuArrowUp, LuArrowUpRight, LuBadgeCheck, LuMail } from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa6";
import { services, site } from "@/lib/site";
import s from "./Footer.module.scss";

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
  { title: "Services", links: services.map((sv) => ({ href: sv.href, label: sv.name })) },
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
    <footer className={s.footer}>
      {/* hairline + glow separate the footer from dark sections above it */}
      <div aria-hidden className={s.hairline} />
      <div aria-hidden className={s.glow} />

      <div className={s.inner}>
        <div className={s.top}>
          <div>
            <Link href="/" aria-label="Ampera Technologies, home" className={s.home}>
              <Image
                src="/brand/ampera-logo.png"
                alt="Ampera"
                width={810}
                height={226}
                className={s.logo}
              />
            </Link>
            <p className={s.about}>{site.description}</p>

            <div className={s.contact}>
              <a href={`mailto:${site.email}`} className={s.mail}>
                <LuMail aria-hidden />
                {site.email}
              </a>
              <a href={site.linkedin} aria-label="Ampera on LinkedIn" className={s.social}>
                <FaLinkedinIn aria-hidden />
              </a>
            </div>
          </div>

          <div className={s.columns}>
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className={s.colTitle}>{col.title}</p>
                <ul className={s.colLinks}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={s.colLink}>
                        {l.label}
                        <LuArrowUpRight aria-hidden className={s.colArrow} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className={s.badges}>
          <span className={s.badge}>
            <LuBadgeCheck aria-hidden className={s.badgeIcon} />
            ISO certified · Intertek
          </span>
          <span className={s.muted}>Technology partners</span>
          {partners.map((p) => (
            <span key={p} className={s.partner}>
              {p}
            </span>
          ))}
          <span className={`${s.badge} ${s.end}`}>
            <span aria-hidden className={s.dot} />
            Accessibility by default
          </span>
        </div>
      </div>

      {/* decorative wordmark; the name is already in the logo alt text */}
      <p aria-hidden className={s.wordmark}>
        Ampera
      </p>

      <div className={s.bottom}>
        <div className={s.bottomInner}>
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a href="#main" className={s.toTop}>
            Back to top
            <LuArrowUp aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
