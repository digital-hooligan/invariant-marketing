import { NextResponse } from "next/server";
import { requireEnv } from "@/lib/env";
import { getPublishedOperatorNoteSlugs } from "@/content/operatorNotes";

const INDEXABLE_ROUTES = [
  "/",
  "/offering",
  "/solutions",
  "/pricing",
  "/company",
  "/contact",
  "/operator-notes",
  "/legal",
  "/terms",
  "/privacy",
  "/disclaimer",
] as const;

function getPublicUrl(path: string) {
  const { PUBLIC_SITE_URL } = requireEnv();
  const base = PUBLIC_SITE_URL.endsWith("/")
    ? PUBLIC_SITE_URL.slice(0, -1)
    : PUBLIC_SITE_URL;

  return `${base}${path}`;
}

function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  const noteRoutes = getPublishedOperatorNoteSlugs().map(
    (slug) => `/operator-notes/${slug}`,
  );
  const routes = [...new Set([...INDEXABLE_ROUTES, ...noteRoutes])];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes
      .map((r) => {
        const priority =
          r === "/"
            ? "1.0"
            : r === "/legal" ||
                r === "/terms" ||
                r === "/privacy" ||
                r === "/disclaimer"
              ? "0.3"
              : r === "/operator-notes" || r.startsWith("/operator-notes/")
                ? "0.6"
                : "0.7";
        return [
          "  <url>",
          `    <loc>${xmlEscape(getPublicUrl(r))}</loc>`,
          "    <changefreq>weekly</changefreq>",
          `    <priority>${priority}</priority>`,
          "  </url>",
        ].join("\n");
      })
      .join("\n") +
    `\n</urlset>\n`;

  return new NextResponse(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
