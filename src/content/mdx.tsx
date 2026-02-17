import fs from "node:fs";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import React from "react";

export type MDXLoadResult<TFrontmatter> = {
  frontmatter: TFrontmatter;
  content: React.ReactNode;
};

export async function loadMdxWithFrontmatter<TFrontmatter>(opts: {
  filePath: string;
  parseFrontmatter: (fm: unknown) => TFrontmatter;
}) {
  const source = fs.readFileSync(opts.filePath, "utf-8");
  const parsed = matter(source);

  const fm = opts.parseFrontmatter(parsed.data);

  const compiled = await compileMDX({
    source: parsed.content,
    options: { parseFrontmatter: false },
  });

  return {
    frontmatter: fm,
    content: compiled.content,
  } satisfies MDXLoadResult<TFrontmatter>;
}
