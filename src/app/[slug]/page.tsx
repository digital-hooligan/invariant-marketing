import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTopLevelPage, TOP_LEVEL_SLUGS } from "@/content/pages";
import { getLegalDoc, LEGAL_DOC_SLUGS } from "@/content/legal";

export async function generateStaticParams() {
  return [...TOP_LEVEL_SLUGS, ...LEGAL_DOC_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getTopLevelPage(slug);
  if (page) {
    return {
      title: page.frontmatter.seo.title,
      description: page.frontmatter.seo.description,
      alternates: { canonical: page.frontmatter.seo.canonical },
      openGraph: {
        title: page.frontmatter.seo.title,
        description: page.frontmatter.seo.description,
        url: page.frontmatter.seo.canonical,
      },
    };
  }

  const legalDoc = await getLegalDoc(slug);
  if (!legalDoc) return {};

  return {
    title: legalDoc.frontmatter.seo.title,
    description: legalDoc.frontmatter.seo.description,
    alternates: { canonical: legalDoc.frontmatter.seo.canonical },
    openGraph: {
      title: legalDoc.frontmatter.seo.title,
      description: legalDoc.frontmatter.seo.description,
      url: legalDoc.frontmatter.seo.canonical,
    },
  };
}

export default async function TopLevelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getTopLevelPage(slug);
  if (page) {
    return (
      <article className="space-y-mk-6">
        <header>
          <h1 className="text-mk-h1 font-mkSemibold">
            {page.frontmatter.title}
          </h1>
        </header>

        <section className="mk-prose max-w-none">{page.content}</section>
      </article>
    );
  }

  const legalDoc = await getLegalDoc(slug);
  if (!legalDoc) notFound();

  return (
    <article className="space-y-mk-6">
      <header className="space-y-mk-1">
        <h1 className="text-mk-h1 font-mkSemibold">
          {legalDoc.frontmatter.title}
        </h1>

        <div className="text-mk-small text-mk-muted">
          Last updated: {legalDoc.frontmatter.lastUpdated}
        </div>
      </header>

      <section className="mk-prose max-w-none">{legalDoc.content}</section>

      <footer className="text-mk-small text-mk-muted">
        {legalDoc.frontmatter.legalEntityName}
      </footer>
    </article>
  );
}
