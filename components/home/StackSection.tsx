import { Eyebrow } from "@/components/Eyebrow";
import { StackLayers } from "@/components/StackLayers";
import { stackLayers } from "@/lib/home";
import { cx } from "@/lib/cx";
import sec from "./section.module.scss";

// Stack layers: the services as a layered architecture with the 3D stack beside it.
export function StackSection() {
  return (
    <section className={cx("cv-auto", sec.dark)}>
      <div aria-hidden className="blueprint" />
      <div aria-hidden className={cx("hero-glow", sec.glow50)} />
      <div className={sec.inner}>
        <Eyebrow dark>Stack layers</Eyebrow>
        <StackLayers layers={stackLayers} />
      </div>
    </section>
  );
}
