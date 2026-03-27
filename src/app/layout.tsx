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
  alt: "Scientia.io public site",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(PUBLIC_SITE_URL),
  title: {
    default: "Scientia.io",
    template: "%s | Scientia.io",
  },
  description:
    "Scientia is the system. Scientia.io is the public platform surface for trust, documentation, and qualified entry.",
  openGraph: {
    type: "website",
    siteName: "Scientia.io",
    title: "Scientia.io",
    description:
      "Scientia is the system. Scientia.io is the public platform surface for trust, documentation, and qualified entry.",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scientia.io",
    description:
      "Scientia is the system. Scientia.io is the public platform surface for trust, documentation, and qualified entry.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
        </main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
