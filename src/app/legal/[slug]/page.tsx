import { permanentRedirect, notFound } from "next/navigation";
import { LEGAL_DOC_SLUGS } from "@/content/legal";

export async function generateStaticParams() {
  return LEGAL_DOC_SLUGS.map((slug) => ({ slug }));
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!LEGAL_DOC_SLUGS.includes(slug as (typeof LEGAL_DOC_SLUGS)[number])) {
    notFound();
  }

  permanentRedirect(`/${slug}`);
}
