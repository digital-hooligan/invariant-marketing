import type { Metadata } from "next";
import { getHomePage } from "@/content/pages";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getHomePage();
  return {
    title: frontmatter.seo.title,
    description: frontmatter.seo.description,
    alternates: { canonical: frontmatter.seo.canonical },
    openGraph: {
      title: frontmatter.seo.title,
      description: frontmatter.seo.description,
      url: frontmatter.seo.canonical,
    },
  };
}

export default async function HomePage() {
  const { frontmatter, content } = await getHomePage();

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{frontmatter.title}</h1>
        <p className="text-base opacity-80">{frontmatter.lede}</p>
      </header>
      <section className="prose max-w-none">{content}</section>
    </article>
  );
}
