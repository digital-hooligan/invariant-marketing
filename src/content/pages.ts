import path from "node:path";
import fs from "node:fs";
import { pagesDir } from "./paths";
import { loadMdxWithFrontmatter } from "./mdx";
import { HomeFrontmatter, TopLevelPageFrontmatter } from "./schema";

export const TOP_LEVEL_SLUGS = [
  "platform",
  "how-it-works",
  "security",
  "governance",
  "solutions",
  "pricing",
  "company",
  "contact",
] as const;

export type TopLevelSlug = (typeof TOP_LEVEL_SLUGS)[number];

export async function getHomePage() {
  const filePath = path.join(pagesDir, "home.mdx");
  return loadMdxWithFrontmatter({
    filePath,
    parseFrontmatter: (fm) => HomeFrontmatter.parse(fm),
  });
}

export async function getTopLevelPage(slug: string) {
  const filePath = path.join(pagesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  return loadMdxWithFrontmatter({
    filePath,
    parseFrontmatter: (fm) => TopLevelPageFrontmatter.parse(fm),
  });
}
