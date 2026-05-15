import Link from "next/link";
import type { SiteSettings } from "@/content/siteSettings";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-[var(--mk-color-border)] bg-[var(--mk-color-bg)]">
      <div
        className="mx-auto w-full px-6 py-10 flex flex-col gap-6"
        style={{ maxWidth: "var(--mk-layout-content-max)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-semibold" style={{ color: "var(--mk-color-text)" }}>
              Invariant
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--mk-color-text-muted)", fontFamily: "var(--mk-type-font-mono)" }}
            >
              by Digital Hooligan LLC
            </span>
            <span
              className="text-xs mt-1"
              style={{ color: "var(--mk-color-text-muted)" }}
            >
              Veteran-owned software company
            </span>
          </div>

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
        </div>

        <div
          className="text-xs pt-2 border-t"
          style={{
            color: "var(--mk-color-text-muted)",
            borderColor: "var(--mk-color-border)",
          }}
        >
          © {new Date().getFullYear()} {settings.legalEntityName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
