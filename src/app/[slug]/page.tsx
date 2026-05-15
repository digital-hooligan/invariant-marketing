import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTopLevelPage, TOP_LEVEL_SLUGS } from "@/content/pages";

export async function generateStaticParams() {
  return TOP_LEVEL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getTopLevelPage(slug);
  if (!page) return {};
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

export default async function TopLevelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getTopLevelPage(slug);
  if (!page) notFound();

  return (
    <div className="mx-auto w-full px-6 py-10" style={{ maxWidth: "var(--mk-layout-content-max)" }}>
      <article className="space-y-6 max-w-3xl">
        <header>
          <h1
            className="font-semibold"
            style={{ fontSize: "var(--mk-type-size-h1)", lineHeight: "var(--mk-type-lh-tight)", color: "var(--mk-color-text)" }}
          >
            {page.frontmatter.title}
          </h1>
        </header>
        <section>{page.content}</section>
      </article>
    </div>
  );
}
