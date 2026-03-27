import type { SiteSettings } from "@/content/siteSettings";
import { TrackedLink } from "@/components/analytics/PublicAnalytics";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="border-b border-[var(--mk-color-border)] bg-[var(--mk-color-bg)]">
      <div
        className="mx-auto w-full px-6 py-4 flex items-center justify-between gap-6"
        style={{ maxWidth: "var(--mk-layout-content-max)" }}
      >
        <TrackedLink
          href="/"
          event="public_nav_click"
          label="Invariant"
          location="header_brand"
          className="font-semibold no-underline text-[var(--mk-color-text)]"
        >
          Invariant
        </TrackedLink>

        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {settings.mainNav.map((item) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              event="public_nav_click"
              label={item.label}
              location="header_nav"
              className="hover:underline text-[var(--mk-color-text)]"
            >
              {item.label}
            </TrackedLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <TrackedLink
            href={settings.secondaryCtaHref}
            event="public_cta_click"
            label={settings.secondaryCtaLabel}
            location="header_secondary"
            className="hover:underline text-[var(--mk-color-text)]"
          >
            {settings.secondaryCtaLabel}
          </TrackedLink>

          <TrackedLink
            href={settings.primaryCtaHref}
            event="public_cta_click"
            label={settings.primaryCtaLabel}
            location="header_primary"
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
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
