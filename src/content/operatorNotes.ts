import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { operatorNotesDir } from "./paths";
import { loadMdxWithFrontmatter } from "./mdx";
import {
  OperatorNoteFrontmatter,
  type OperatorNoteFrontmatterT,
} from "./schema";

function listNoteFiles(): string[] {
  if (!fs.existsSync(operatorNotesDir)) return [];
  return fs.readdirSync(operatorNotesDir).filter((f) => f.endsWith(".mdx"));
}

/**
 * Published notes only, sorted: featured first, then publication date desc.
 * Reads frontmatter only (no MDX compilation) for fast listing.
 */
export function getPublishedOperatorNotes(): OperatorNoteFrontmatterT[] {
  return listNoteFiles()
    .map((file) => {
      const raw = fs.readFileSync(path.join(operatorNotesDir, file), "utf-8");
      return OperatorNoteFrontmatter.parse(matter(raw).data);
    })
    .filter((fm) => fm.status === "published")
    .sort((a, b) => {
      const featuredDelta = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (featuredDelta !== 0) return featuredDelta;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getPublishedOperatorNoteSlugs(): string[] {
  return getPublishedOperatorNotes().map((n) => n.slug);
}

/** Load a single published note (compiled MDX). Returns null for missing/draft. */
export async function getOperatorNote(slug: string) {
  const filePath = path.join(operatorNotesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const result = await loadMdxWithFrontmatter({
    filePath,
    parseFrontmatter: (fm) => OperatorNoteFrontmatter.parse(fm),
  });

  if (result.frontmatter.status !== "published") return null;
  return result;
}

export function noteCanonical(fm: OperatorNoteFrontmatterT): string {
  return fm.seo.canonical ?? `/operator-notes/${fm.slug}`;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Format an ISO YYYY-MM-DD date for display without timezone drift. */
export function formatNoteDate(iso: string): string {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  if (!y || !m || !d || m < 1 || m > 12) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
