import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Ampera Technologies handles personal data.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-light text-purple">Privacy notice</h1>
      <p className="mt-4 text-lg">
        [TODO: privacy notice text, consent wording and retention period for job applicants. Needs
        legal review (DPDP).]
      </p>
    </article>
  );
}
