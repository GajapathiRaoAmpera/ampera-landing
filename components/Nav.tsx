import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { NavMenu } from "./NavMenu";
import { nav } from "@/lib/site";
import s from "./Nav.module.scss";

// Floating glass bar: blurred, translucent ink (60% keeps white text above 4.5:1 over ivory too).
// Mobile: logo + Menu toggle on one row; the links and CTA open below it.
export function Nav() {
  return (
    <header className={s.header}>
      <div className={s.bar}>
        <Link href="/" aria-label="Ampera Technologies, home" className={s.home}>
          <Image
            src="/brand/ampera-logo.png"
            alt="Ampera"
            width={810}
            height={226}
            priority
            className={s.logo}
          />
        </Link>
        <NavMenu>
          <nav aria-label="Main">
            <ul className={s.links}>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={s.link}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button href="/contact">Book a demo</Button>
        </NavMenu>
      </div>
    </header>
  );
}
