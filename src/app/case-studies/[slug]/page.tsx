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
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">{cs.frontmatter.title}</h1>
        <p className="opacity-80">{cs.frontmatter.summary}</p>
      </header>
      <section className="prose max-w-none">{cs.content}</section>
    </article>
  );
}
