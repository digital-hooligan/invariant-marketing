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
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">{page.frontmatter.title}</h1>
      </header>
      <section className="prose max-w-none">{page.content}</section>
    </article>
  );
}
