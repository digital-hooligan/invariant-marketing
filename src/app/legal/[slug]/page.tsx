import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDoc, LEGAL_DOC_SLUGS } from "@/content/legal";

export async function generateStaticParams() {
  return LEGAL_DOC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getLegalDoc(slug);
  if (!doc) return {};
  return {
    title: doc.frontmatter.seo.title,
    description: doc.frontmatter.seo.description,
    alternates: { canonical: doc.frontmatter.seo.canonical },
    robots: { index: true, follow: true },
  };
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <article className="space-y-mk-6">
      <header className="space-y-mk-1">
        <h1 className="text-mk-h1 font-mkSemibold">{doc.frontmatter.title}</h1>

        <div className="text-mk-small text-mk-muted">
          Last updated: {doc.frontmatter.lastUpdated}
        </div>
      </header>

      <section className="mk-prose max-w-none">{doc.content}</section>

      <footer className="text-mk-small text-mk-muted">
        {doc.frontmatter.legalEntityName}
      </footer>
    </article>
  );
}
