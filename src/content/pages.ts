import path from "node:path";
import fs from "node:fs";
import { pagesDir } from "./paths";
import { loadMdxWithFrontmatter } from "./mdx";
import { TopLevelPageFrontmatter } from "./schema";

export const TOP_LEVEL_SLUGS = [] as const;
// all top-level pages have dedicated app routes:
// company, contact, solutions, offering, pricing

export type TopLevelSlug = (typeof TOP_LEVEL_SLUGS)[number];

export async function getTopLevelPage(slug: string) {
  if (!TOP_LEVEL_SLUGS.includes(slug as TopLevelSlug)) return null;

  const filePath = path.join(pagesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  return loadMdxWithFrontmatter({
    filePath,
    parseFrontmatter: (fm) => TopLevelPageFrontmatter.parse(fm),
  });
}
