import { NextResponse } from "next/server";
import { requireEnv } from "@/lib/env";

export function GET() {
  const { PUBLIC_SITE_URL } = requireEnv();
  const base = PUBLIC_SITE_URL.endsWith("/")
    ? PUBLIC_SITE_URL.slice(0, -1)
    : PUBLIC_SITE_URL;
  const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
