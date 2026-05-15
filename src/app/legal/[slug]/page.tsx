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
    <div className="mx-auto w-full px-6 py-10" style={{ maxWidth: "var(--mk-layout-content-max)" }}>
      <article className="space-y-6 max-w-3xl">
        <header className="space-y-2">
          <h1
            className="font-semibold"
            style={{ fontSize: "var(--mk-type-size-h1)", lineHeight: "var(--mk-type-lh-tight)", color: "var(--mk-color-text)" }}
          >
            {doc.frontmatter.title}
          </h1>
          <div
            className="text-sm"
            style={{ color: "var(--mk-color-text-muted)" }}
          >
            Last updated: {doc.frontmatter.lastUpdated}
          </div>
        </header>

        <section>{doc.content}</section>

        <footer
          className="text-sm pt-4 border-t"
          style={{ color: "var(--mk-color-text-muted)", borderColor: "var(--mk-color-border)" }}
        >
          {doc.frontmatter.legalEntityName}
        </footer>
      </article>
    </div>
  );
}
