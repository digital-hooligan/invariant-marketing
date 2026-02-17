import Link from "next/link";
import type { Metadata } from "next";
import { listCaseStudySlugs, getCaseStudy } from "@/content/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Structured proof index.",
};

export default async function CaseStudiesIndex() {
  const slugs = listCaseStudySlugs();

  const items = await Promise.all(
    slugs.map(async (slug) => {
      const cs = await getCaseStudy(slug);
      if (!cs) return null;
      return {
        slug,
        title: cs.frontmatter.title,
        summary: cs.frontmatter.summary,
      };
    }),
  );

  const filtered = items.filter(Boolean) as Array<{
    slug: string;
    title: string;
    summary: string;
  }>;

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Case Studies</h1>
        <p className="opacity-80">
          Structured proof in a consistent, non-hype format.
        </p>
      </header>

      <ul className="space-y-4">
        {filtered.map((item) => (
          <li key={item.slug} className="rounded-md border p-4">
            <h2 className="text-xl font-semibold">
              <Link
                className="hover:underline"
                href={`/case-studies/${item.slug}`}
              >
                {item.title}
              </Link>
            </h2>
            <p className="opacity-80">{item.summary}</p>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="opacity-80">No case studies yet.</li>
        )}
      </ul>
    </article>
  );
}
