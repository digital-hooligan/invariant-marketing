import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, listCaseStudySlugs } from "@/content/caseStudies";

export async function generateStaticParams() {
  return listCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.frontmatter.seo.title,
    description: cs.frontmatter.seo.description,
    alternates: { canonical: cs.frontmatter.seo.canonical },
    openGraph: {
      title: cs.frontmatter.seo.title,
      description: cs.frontmatter.seo.description,
      url: cs.frontmatter.seo.canonical,
    },
  };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <div className="mx-auto w-full px-6 py-10" style={{ maxWidth: "var(--mk-layout-content-max)" }}>
      <article className="space-y-6 max-w-3xl">
        <header className="space-y-2">
          <h1
            className="font-semibold"
            style={{ fontSize: "var(--mk-type-size-h1)", lineHeight: "var(--mk-type-lh-tight)", color: "var(--mk-color-text)" }}
          >
            {cs.frontmatter.title}
          </h1>
          <p style={{ color: "var(--mk-color-text-muted)" }}>{cs.frontmatter.summary}</p>
        </header>
        <section>{cs.content}</section>
      </article>
    </div>
  );
}
