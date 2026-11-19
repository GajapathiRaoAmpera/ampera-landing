"use client";
import { useEffect, useState, type RefObject } from "react";

// prefers-reduced-motion, live (false on the server and until mounted).
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

// Whether `ref` intersects the viewport, grown or shrunk by `margin` (CSS rootMargin syntax).
// `once`: stays true after the first intersection.
export function useInView(
  ref: RefObject<Element | null>,
  { margin = "0px", once = false }: { margin?: string; once?: boolean } = {},
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (once && e.isIntersecting) io.disconnect();
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, once]);
  return inView;
}
