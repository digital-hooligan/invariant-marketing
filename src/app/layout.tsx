import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteSettings } from "@/content/siteSettings";

export const metadata: Metadata = {
  title: {
    default: "Invariant — Execution-grade software systems",
    template: "%s | Invariant",
  },
  description:
    "Digital Hooligan LLC dba Invariant builds SaaS products, automation workflows, internal tools, and operational intelligence platforms for founders, operators, and mission-adjacent teams.",
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
        <SiteHeader settings={settings} />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
