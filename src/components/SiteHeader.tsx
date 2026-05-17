import type { SiteSettings } from "@/content/siteSettings";
import { TrackedLink } from "@/components/analytics/PublicAnalytics";
import { SiteNavMobile } from "@/components/SiteNavMobile";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--mk-color-border)] bg-[var(--mk-color-bg)]">
      <div
        className="mx-auto w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-4"
        style={{ maxWidth: "var(--mk-layout-content-max)" }}
      >
        {/* Brand */}
        <TrackedLink
          href="/"
          event="public_nav_click"
          label="Invariant"
          location="header_brand"
          className="no-underline flex flex-col leading-none shrink-0"
        >
          <span className="font-semibold text-[var(--mk-color-text)]">
            Invariant
          </span>
          <span
            className="text-[10px] tracking-wide"
            style={{
              color: "var(--mk-color-text-muted)",
              fontFamily: "var(--mk-type-font-mono)",
            }}
          >
            by Digital Hooligan LLC
          </span>
        </TrackedLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {settings.mainNav.map((item, i) => (
            <TrackedLink
              key={`${item.label}-${i}`}
              href={item.href}
              event="public_nav_click"
              label={item.label}
              location="header_nav"
              className="hover:underline text-[var(--mk-color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--mk-color-focus-ring)] rounded"
            >
              {item.label}
            </TrackedLink>
          ))}
        </nav>

        {/* Right group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Secondary CTA — hidden on mobile */}
          <TrackedLink
            href={settings.secondaryCtaHref}
            event="public_cta_click"
            label={settings.secondaryCtaLabel}
            location="header_secondary"
            className="hidden lg:inline-flex text-sm hover:underline text-[var(--mk-color-text)]"
          >
            {settings.secondaryCtaLabel}
          </TrackedLink>

          {/* Primary CTA */}
          <TrackedLink
            href={settings.primaryCtaHref}
            event="public_cta_click"
            label={settings.primaryCtaLabel}
            location="header_primary"
            className={[
              "inline-flex items-center justify-center",
              "min-h-[40px]",
              "rounded-[var(--mk-radius-md)]",
              "px-3 sm:px-4 py-2",
              "text-sm font-semibold",
              "no-underline",
              "bg-[var(--mk-color-cta)]",
              "text-[var(--mk-color-bg)]",
              "hover:bg-[var(--mk-color-cta-hover)]",
              "transition-colors",
              "duration-[120ms]",
              "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--mk-color-focus-ring)]",
            ].join(" ")}
          >
            <span className="hidden sm:inline">{settings.primaryCtaLabel}</span>
            <span className="sm:hidden">Contact</span>
          </TrackedLink>

          {/* Mobile hamburger */}
          <SiteNavMobile items={settings.mainNav} />
        </div>
      </div>
    </header>
  );
}
