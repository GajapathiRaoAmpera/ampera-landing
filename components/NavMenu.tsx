"use client";
import { useEffect, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { cx } from "@/lib/cx";
import s from "./Nav.module.scss";

// Mobile disclosure for the nav. Links are server-rendered children (in the HTML for crawlers);
// on desktop the toggle is hidden and the menu is always shown.
export function NavMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={toggle}
        type="button"
        className={s.toggle}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <LuX aria-hidden /> : <LuMenu aria-hidden />}
        Menu
      </button>
      <div
        id="site-menu"
        className={cx(s.menu, open && s.open)}
        // Close after choosing a link (client-side navigation keeps this component mounted).
        onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
      >
        {children}
      </div>
    </>
  );
}
