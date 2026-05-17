import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageViewTracker } from "@/components/analytics/PublicAnalytics";
import { getSiteSettings } from "@/content/siteSettings";
import { requireEnv } from "@/lib/env";

const { PUBLIC_SITE_URL } = requireEnv();
const DEFAULT_SOCIAL_IMAGE = {
  url: "/social/og-default.png",
  width: 1200,
  height: 630,
  alt: "Invariant — execution-grade software systems",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(PUBLIC_SITE_URL),
  title: {
    default: "Invariant — Execution-grade software systems",
    template: "%s | Invariant",
  },
  description:
    "Digital Hooligan LLC dba Invariant builds SaaS products, automation workflows, internal tools, and operational intelligence platforms for founders, operators, and mission-adjacent teams.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Invariant",
    title: "Invariant — Execution-grade software systems",
    description:
      "Digital Hooligan LLC dba Invariant builds SaaS products, automation workflows, internal tools, and operational intelligence platforms for founders, operators, and mission-adjacent teams.",
    url: "/",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invariant — Execution-grade software systems",
    description:
      "Digital Hooligan LLC dba Invariant builds SaaS products, automation workflows, internal tools, and operational intelligence platforms for founders, operators, and mission-adjacent teams.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSiteSettings();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <PageViewTracker />
        <SiteHeader settings={settings} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
