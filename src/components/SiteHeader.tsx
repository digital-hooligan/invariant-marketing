import Link from "next/link";
import type { SiteSettings } from "@/content/siteSettings";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="border-b border-[var(--mk-color-border)] bg-[var(--mk-color-bg)]">
      <div
        className="mx-auto w-full px-6 py-4 flex items-center justify-between gap-6"
        style={{ maxWidth: "var(--mk-layout-content-max)" }}
      >
        <Link
          href="/"
          className="no-underline flex flex-col leading-none"
        >
          <span className="font-semibold text-[var(--mk-color-text)]">
            Invariant
          </span>
          <span
            className="text-[10px] tracking-wide"
            style={{ color: "var(--mk-color-text-muted)", fontFamily: "var(--mk-type-font-mono)" }}
          >
            by Digital Hooligan LLC
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {settings.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline text-[var(--mk-color-text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href={settings.secondaryCtaHref}
            className="hover:underline text-[var(--mk-color-text)]"
          >
            {settings.secondaryCtaLabel}
          </Link>

          <Link
            href={settings.primaryCtaHref}
            className={[
              "inline-flex items-center justify-center",
              "min-h-[44px]",
              "rounded-[var(--mk-radius-md)]",
              "px-4 py-2",
              "font-semibold",
              "no-underline",
              "bg-[var(--mk-color-cta)]",
              "text-[var(--mk-color-bg)]",
              "hover:bg-[var(--mk-color-cta-hover)]",
              "transition-colors",
              "duration-[120ms]",
              "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            ].join(" ")}
          >
            {settings.primaryCtaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
