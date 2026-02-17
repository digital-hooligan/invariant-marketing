import Link from "next/link";
import type { SiteSettings } from "@/content/siteSettings";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col gap-4">
        <nav className="flex flex-wrap gap-4 text-sm">
          {settings.footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs opacity-75">
          © {new Date().getFullYear()} {settings.legalEntityName}
        </div>
      </div>
    </footer>
  );
}
