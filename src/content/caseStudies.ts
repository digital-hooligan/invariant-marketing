import fs from "node:fs";
import path from "node:path";
import { caseStudiesDir } from "./paths";
import { loadMdxWithFrontmatter } from "./mdx";
import { CaseStudyFrontmatter } from "./schema";

export function listCaseStudySlugs(): string[] {
  if (!fs.existsSync(caseStudiesDir)) return [];
  return fs
    .readdirSync(caseStudiesDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getCaseStudy(slug: string) {
  const filePath = path.join(caseStudiesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  return loadMdxWithFrontmatter({
    filePath,
    parseFrontmatter: (fm) => CaseStudyFrontmatter.parse(fm),
  });
}
