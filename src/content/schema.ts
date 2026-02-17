import { z } from "zod";

export const PageSEO = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  canonical: z.string().min(1),
  ogImage: z.string().optional(),
});

export const SiteSettingsSchema = z.object({
  primaryCtaLabel: z.string().min(1),
  primaryCtaHref: z.string().min(1),
  secondaryCtaLabel: z.string().min(1),
  secondaryCtaHref: z.string().min(1),
  mainNav: z.array(
    z.object({ label: z.string().min(1), href: z.string().min(1) }),
  ),
  footerNav: z.array(
    z.object({ label: z.string().min(1), href: z.string().min(1) }),
  ),
  legalEntityName: z.string().min(1),
});

export const HomeFrontmatter = z.object({
  type: z.literal("home"),
  seo: PageSEO,
  title: z.string().min(1),
  lede: z.string().min(1),
});

export const TopLevelPageFrontmatter = z.object({
  type: z.literal("page"),
  slug: z.string().min(1),
  seo: PageSEO,
  title: z.string().min(1),
});

export const LegalHubFrontmatter = z.object({
  type: z.literal("legalHub"),
  seo: PageSEO,
  title: z.string().min(1),
  intro: z.string().min(1),
  documents: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().min(1),
      lastUpdated: z.string().min(4),
    }),
  ),
  legalEntityName: z.string().min(1),
});

export const LegalDocumentFrontmatter = z.object({
  type: z.literal("legalDocument"),
  slug: z.enum(["terms", "privacy", "disclaimer"]),
  seo: PageSEO,
  title: z.string().min(1),
  lastUpdated: z.string().min(4),
  jurisdiction: z.string().optional(),
  legalEntityName: z.string().min(1),
  contentOwner: z.string().optional(),
});

export const CaseStudyFrontmatter = z.object({
  type: z.literal("caseStudy"),
  slug: z.string().min(1),
  seo: PageSEO,
  title: z.string().min(1),
  summary: z.string().min(1),
});
