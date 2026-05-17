import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/MDXContent";
import { MkSection } from "@/components/mk/MkSection";
import { getTopLevelPage, TOP_LEVEL_SLUGS } from "@/content/pages";
import { getLegalDoc, LEGAL_DOC_SLUGS } from "@/content/legal";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant marketing site",
} as const;

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
        type: "website",
        title: page.frontmatter.seo.title,
        description: page.frontmatter.seo.description,
        url: page.frontmatter.seo.canonical,
        images: [DEFAULT_SOCIAL_IMAGE],
      },
      twitter: {
        card: "summary_large_image",
        title: page.frontmatter.seo.title,
        description: page.frontmatter.seo.description,
        images: [DEFAULT_SOCIAL_IMAGE.url],
      },
      robots: { index: true, follow: true },
    };
  }

  const legalDoc = await getLegalDoc(slug);
  if (!legalDoc) return {};

  return {
    title: legalDoc.frontmatter.seo.title,
    description: legalDoc.frontmatter.seo.description,
    alternates: { canonical: legalDoc.frontmatter.seo.canonical },
    openGraph: {
      type: "article",
      title: legalDoc.frontmatter.seo.title,
      description: legalDoc.frontmatter.seo.description,
      url: legalDoc.frontmatter.seo.canonical,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: legalDoc.frontmatter.seo.title,
      description: legalDoc.frontmatter.seo.description,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    },
    robots: { index: true, follow: true },
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
      <MkSection>
        <article className="max-w-3xl space-y-8">
          <header>
            <h1 className="text-[40px] font-semibold leading-[1.05] text-[var(--mk-color-text)] md:text-[56px]">
              {page.frontmatter.title}
            </h1>
          </header>
          <MDXContent>{page.content}</MDXContent>
        </article>
      </MkSection>
    );
  }

  const legalDoc = await getLegalDoc(slug);
  if (!legalDoc) notFound();

  return (
    <MkSection>
      <article className="max-w-3xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-[40px] font-semibold leading-[1.05] text-[var(--mk-color-text)] md:text-[56px]">
            {legalDoc.frontmatter.title}
          </h1>
          <div className="text-sm text-[var(--mk-color-text-muted)]">
            Last updated: {legalDoc.frontmatter.lastUpdated}
          </div>
        </header>
        <MDXContent>{legalDoc.content}</MDXContent>
        <footer className="text-sm text-[var(--mk-color-text-muted)]">
          {legalDoc.frontmatter.legalEntityName}
        </footer>
      </article>
    </MkSection>
  );
}
