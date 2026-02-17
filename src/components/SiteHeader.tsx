import Link from "next/link";
import type { SiteSettings } from "@/content/siteSettings";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="font-semibold">
          Invariant
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {settings.mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link href={settings.secondaryCtaHref} className="hover:underline">
            {settings.secondaryCtaLabel}
          </Link>
          <Link
            href={settings.primaryCtaHref}
            className="rounded-md border px-3 py-1 hover:underline"
          >
            {settings.primaryCtaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
