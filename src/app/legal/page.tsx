import Link from "next/link";
import type { Metadata } from "next";
import { getLegalHub } from "@/content/legal";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant marketing site",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getLegalHub();
  return {
    title: frontmatter.seo.title,
    description: frontmatter.seo.description,
    alternates: { canonical: frontmatter.seo.canonical },
    openGraph: {
      type: "website",
      title: frontmatter.seo.title,
      description: frontmatter.seo.description,
      url: frontmatter.seo.canonical,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.seo.title,
      description: frontmatter.seo.description,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LegalHubPage() {
  const { frontmatter } = await getLegalHub();

  return (
    <div className="mx-auto w-full px-6 py-10" style={{ maxWidth: "var(--mk-layout-content-max)" }}>
    <article className="space-y-6 max-w-3xl">
      <header className="space-y-2">
        <h1
          className="font-semibold"
          style={{ fontSize: "var(--mk-type-size-h1)", lineHeight: "var(--mk-type-lh-tight)", color: "var(--mk-color-text)" }}
        >
          {frontmatter.title}
        </h1>
        <p style={{ color: "var(--mk-color-text-muted)" }}>{frontmatter.intro}</p>
      </header>

      <ul className="space-y-3">
        {frontmatter.documents.map((doc) => (
          <li key={doc.href} className="rounded-md border p-4">
            <div className="flex items-center justify-between gap-4">
              <Link className="hover:underline font-medium" href={doc.href}>
                {doc.label}
              </Link>
              <span className="text-sm opacity-75">
                Last updated: {doc.lastUpdated}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-xs opacity-75">{frontmatter.legalEntityName}</p>
    </article>
    </div>
  );
}
