import fs from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { pagesDir } from "./paths";
import { TopLevelPageFrontmatter } from "./schema";

export type PageContent = {
  frontmatter: ReturnType<typeof TopLevelPageFrontmatter.parse>;
  content: React.ReactNode;
};

async function loadMDXFile(filePath: string) {
  const source = fs.readFileSync(filePath, "utf-8");
  const compiled = await compileMDX<{ [key: string]: unknown }>({
    source,
    options: { parseFrontmatter: true },
  });

  const fm = TopLevelPageFrontmatter.parse(compiled.frontmatter ?? {});
  return { frontmatter: fm, content: compiled.content };
}

export async function getHomePage() {
  return loadMDXFile(path.join(pagesDir, "home.mdx"));
}

export async function getTopLevelPageBySlug(slug: string) {
  return loadMDXFile(path.join(pagesDir, `${slug}.mdx`));
}

export function listTopLevelSlugs(): string[] {
  return [
    "platform",
    "how-it-works",
    "security",
    "governance",
    "solutions",
    "pricing",
    "company",
    "contact",
  ];
}
