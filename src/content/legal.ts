import path from "node:path";
import fs from "node:fs";
import { legalDir } from "./paths";
import { loadMdxWithFrontmatter } from "./mdx";
import { LegalHubFrontmatter, LegalDocumentFrontmatter } from "./schema";

export const LEGAL_DOC_SLUGS = ["terms", "privacy", "disclaimer"] as const;

export async function getLegalHub() {
  const filePath = path.join(legalDir, "index.mdx");
  return loadMdxWithFrontmatter({
    filePath,
    parseFrontmatter: (fm) => LegalHubFrontmatter.parse(fm),
  });
}

export async function getLegalDoc(slug: string) {
  const filePath = path.join(legalDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  return loadMdxWithFrontmatter({
    filePath,
    parseFrontmatter: (fm) => LegalDocumentFrontmatter.parse(fm),
  });
}
