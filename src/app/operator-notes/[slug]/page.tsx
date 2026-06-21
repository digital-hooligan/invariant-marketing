import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/MDXContent";
import { MkSection } from "@/components/mk/MkSection";
import {
  getOperatorNote,
  getPublishedOperatorNoteSlugs,
  noteCanonical,
  formatNoteDate,
} from "@/content/operatorNotes";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — Operator Notes",
} as const;

export function generateStaticParams() {
  return getPublishedOperatorNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await getOperatorNote(slug);
  if (!note) return {};

  const { frontmatter } = note;
  const canonical = noteCanonical(frontmatter);

  return {
    title: frontmatter.seo.title,
    description: frontmatter.seo.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: frontmatter.seo.title,
      description: frontmatter.seo.description,
      url: canonical,
      publishedTime: frontmatter.date,
      ...(frontmatter.updated ? { modifiedTime: frontmatter.updated } : {}),
      tags: frontmatter.tags,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.seo.title,
      description: frontmatter.seo.description,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    },
    robots: { index: true, follow: true },
  };
}

export default async function OperatorNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getOperatorNote(slug);
  if (!note) notFound();

  const { frontmatter, content } = note;
  const canonical = noteCanonical(frontmatter);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.seo.description,
    datePublished: frontmatter.date,
    ...(frontmatter.updated ? { dateModified: frontmatter.updated } : {}),
    articleSection: frontmatter.category,
    keywords: frontmatter.tags.join(", "),
    author: { "@type": "Organization", name: "Invariant" },
    publisher: { "@type": "Organization", name: "Digital Hooligan LLC" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <MkSection>
      <article className="max-w-3xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{
                color: "var(--mk-color-link)",
                fontFamily: "var(--mk-type-font-mono)",
              }}
            >
              {frontmatter.category}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--mk-color-text-muted)" }}
            >
              {formatNoteDate(frontmatter.date)}
            </span>
          </div>

          <h1
            className="font-semibold leading-[1.1]"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
              color: "var(--mk-color-text)",
            }}
          >
            {frontmatter.title}
          </h1>

          <p
            className="leading-[1.6]"
            style={{
              fontSize: "var(--mk-type-size-body)",
              color: "var(--mk-color-text-muted)",
            }}
          >
            {frontmatter.summary}
          </p>

          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-full border"
                  style={{
                    color: "var(--mk-color-text-muted)",
                    borderColor: "var(--mk-color-border)",
                    fontFamily: "var(--mk-type-font-mono)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <hr
          className="my-8"
          style={{ border: 0, borderTop: "1px solid var(--mk-color-border)" }}
        />

        <MDXContent>{content}</MDXContent>

        {/* footer: back link + CTA */}
        <footer className="mt-12 flex flex-col gap-6 border-t pt-8" style={{ borderColor: "var(--mk-color-border)" }}>
          <Link
            href="/operator-notes"
            className="text-sm font-medium"
            style={{ color: "var(--mk-color-link)" }}
          >
            ← Back to Operator Notes
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold no-underline transition-colors duration-[120ms]"
            style={{
              background: "var(--mk-color-cta)",
              color: "var(--mk-color-bg)",
            }}
          >
            Start a Conversation
          </Link>
        </footer>
      </article>
    </MkSection>
  );
}
