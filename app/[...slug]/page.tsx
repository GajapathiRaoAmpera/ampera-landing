import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceVisual } from "@/components/ServiceVisual";
import { Prose } from "@/components/Prose";
import { Cards } from "@/components/Cards";
import { getPage, paths } from "@/lib/content";
import { list } from "@/lib/listing";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;
export const generateStaticParams = () => paths.map((p) => ({ slug: p.slice(1).split("/") }));

const toPath = (slug: string[]) => "/" + slug.map(decodeURIComponent).join("/");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage(toPath((await params).slug));
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: { title: page.title, description: page.description, url: page.path },
  };
}

function jsonLd(path: string, title: string, body: string) {
  const url = site.url + path;
  const segs = path.slice(1).split("/");
  const crumbs = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      ...segs.map((s, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: i === segs.length - 1 ? title : s.replace(/-/g, " "),
        item: site.url + "/" + segs.slice(0, i + 1).join("/"),
      })),
    ],
  };
  const h1 = body.match(/^# (.*)/m)?.[1] ?? title;
  const graph: object[] = [crumbs];
  if (path.startsWith("/services/"))
    graph.push({
      "@type": "Service",
      name: h1,
      url,
      provider: { "@type": "Organization", name: site.name },
    });
  else if (path.startsWith("/blogs/"))
    graph.push({
      "@type": "Article",
      headline: h1,
      url,
      publisher: { "@type": "Organization", name: site.name },
    });
  else if (path.startsWith("/about/leadership-team/"))
    graph.push({
      "@type": "Person",
      name: h1,
      jobTitle: body.split("\n\n")[1],
      url,
      worksFor: { "@type": "Organization", name: site.name },
    });
  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function ContentPage({ params }: Props) {
  const page = getPage(toPath((await params).slug));
  if (!page) notFound();
  return (
    <article className="mx-auto max-w-6xl px-4 py-16">
      {page.path.startsWith("/services/") ? (
        <>
          <Prose>{page.body.split("\n\n").slice(0, 2).join("\n\n")}</Prose>
          <div className="mt-8">
            <ServiceVisual href={page.path} />
          </div>
          <Prose>{page.body.split("\n\n").slice(2).join("\n\n")}</Prose>
        </>
      ) : (
        <Prose>{page.body}</Prose>
      )}
      {["/projects", "/blogs"].includes(page.path) && (
        <Cards label={page.title} items={list(page.path)} />
      )}
      {page.path === "/accelerators" && (
        <Cards
          label="Accelerators"
          items={[...list("/accelerators"), ...list("/sub-accelerators")]}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(page.path, page.title, page.body)),
        }}
      />
    </article>
  );
}
