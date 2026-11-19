import Link from "next/link";
import { services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="mt-2">
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-1">
            <a className="underline" href={site.linkedin}>
              LinkedIn
            </a>
          </p>
        </div>
        <nav aria-label="Services">
          <p className="font-medium">Services</p>
          <ul className="mt-2 space-y-1">
            {services.map((s) => (
              <li key={s.href}>
                <Link className="hover:underline" href={s.href}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="font-medium">Company</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link className="hover:underline" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/careers">
                Careers
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
