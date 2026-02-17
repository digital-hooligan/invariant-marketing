import { NextResponse } from "next/server";

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: /sitemap.xml
`;
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
