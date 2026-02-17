import path from "node:path";

export const repoRoot = process.cwd();
export const contentRoot = path.join(repoRoot, "content");

export const settingsPath = path.join(contentRoot, "site", "settings.json");
export const pagesDir = path.join(contentRoot, "pages");
export const legalDir = path.join(contentRoot, "legal");
export const caseStudiesDir = path.join(contentRoot, "case-studies");
