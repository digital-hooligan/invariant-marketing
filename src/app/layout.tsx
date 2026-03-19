import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageViewTracker } from "@/components/analytics/PublicAnalytics";
import { getSiteSettings } from "@/content/siteSettings";

export const metadata: Metadata = {
  title: {
    default: "Scientia.io",
    template: "%s | Scientia.io",
  },
  description:
    "Scientia is the system. Scientia.io is the public platform surface for trust, documentation, and qualified entry.",
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
