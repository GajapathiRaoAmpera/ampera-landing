import type { Metadata } from "next";
import s from "@/styles/page.module.scss";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Ampera Technologies handles personal data.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <article className={`${s.page} ${s.narrow}`}>
      <h1 className={s.title}>Privacy notice</h1>
      <p className={s.lead}>
        [TODO: privacy notice text, consent wording and retention period for job applicants. Needs
        legal review (DPDP).]
      </p>
    </article>
  );
}
