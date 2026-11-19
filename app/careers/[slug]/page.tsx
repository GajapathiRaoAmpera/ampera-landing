import type { Metadata } from "next";
import s from "@/styles/page.module.scss";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/ApplyForm";
import { getOpening, getOpenings } from "@/lib/campus-hire/client";
import { fmtDate, meta } from "@/lib/campus-hire/format";
import type { OpeningDetail } from "@/lib/campus-hire/types";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    return (await getOpenings()).map((o) => ({ slug: o.slug }));
  } catch {
    return []; // new slugs render on demand
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const o = await getOpening((await params).slug);
  if (!o) return {};
  return {
    title: o.title,
    description: o.summary,
    alternates: { canonical: `/careers/${o.slug}` },
    openGraph: { title: o.title, description: o.summary, url: `/careers/${o.slug}` },
  };
}

const EMPLOYMENT = {
  full_time: "FULL_TIME",
  part_time: "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
};
const PERIOD: Record<string, string> = { year: "YEAR", month: "MONTH", hour: "HOUR" };

function jobPosting(o: OpeningDetail) {
  const remote = o.workplace === "remote";
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: o.title,
    description: o.description,
    datePosted: o.posted_at,
    ...(o.closes_at && { validThrough: o.closes_at }),
    employmentType: EMPLOYMENT[o.employment_type],
    hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url },
    ...(remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: "IN" },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: o.location,
              addressCountry: "IN",
            },
          },
        }),
    ...(o.salary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: o.salary.currency,
        value: {
          "@type": "QuantitativeValue",
          minValue: o.salary.min,
          maxValue: o.salary.max,
          unitText: PERIOD[o.salary.period] ?? "YEAR",
        },
      },
    }),
    directApply: true,
    identifier: { "@type": "PropertyValue", name: site.name, value: o.id },
  };
}

export default async function Opening({ params }: Props) {
  const o = await getOpening((await params).slug);
  if (!o) notFound(); // closed jobs must 404 so they drop out of Google
  return (
    <div className={`${s.page} ${s.job}`}>
      <article>
        <h1 className={s.title}>{o.title}</h1>
        <p className={s.jobMeta}>{meta(o).join(" · ")}</p>
        <p className={s.meta}>
          Posted {fmtDate(o.posted_at)}
          {o.closes_at && <> · Apply by {fmtDate(o.closes_at)}</>}
        </p>
        <div className={s.description}>{o.description}</div>
      </article>
      <section aria-labelledby="apply">
        <h2 id="apply" className={s.applyTitle}>
          Apply for this role
        </h2>
        <div className={s.mt4}>
          <ApplyForm slug={o.slug} email={site.email} />
        </div>
      </section>
      {/* "<" escaped so API-supplied text can never close the script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting(o)).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
