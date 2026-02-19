import Link from "next/link";
import type { SiteSettings } from "@/content/siteSettings";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-[var(--mk-color-border)] bg-[var(--mk-color-bg)]">
      <div
        className="mx-auto w-full px-6 py-10 flex flex-col gap-4"
        style={{ maxWidth: "var(--mk-layout-content-max)" }}
      >
        <nav className="flex flex-wrap gap-4 text-sm">
          {settings.footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline"
              style={{ color: "var(--mk-color-text)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div
          className="text-xs"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          © {new Date().getFullYear()} {settings.legalEntityName}
        </div>
      </div>
    </footer>
  );
}
