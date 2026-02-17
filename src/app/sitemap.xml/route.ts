import { NextResponse } from "next/server";
import { TOP_LEVEL_SLUGS } from "@/content/pages";
import { LEGAL_DOC_SLUGS } from "@/content/legal";
import { listCaseStudySlugs } from "@/content/caseStudies";

function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// NOTE: We emit relative URLs. When you add a canonical site URL later,
// we can switch to absolute URLs safely.
export function GET() {
  const staticRoutes = [
    "/",
    ...TOP_LEVEL_SLUGS.map((s) => `/${s}`),
    "/case-studies",
    "/legal",
    ...LEGAL_DOC_SLUGS.map((s) => `/legal/${s}`),
  ];

  const caseStudyRoutes = listCaseStudySlugs().map((s) => `/case-studies/${s}`);

  const routes = [...staticRoutes, ...caseStudyRoutes];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map((r) => `  <url><loc>${xmlEscape(r)}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  return new NextResponse(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
