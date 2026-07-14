import type { SiteSettings } from "@/content/siteSettings";
import { TrackedLink } from "@/components/analytics/PublicAnalytics";

const EXTERNAL_PRODUCTS = [
  {
    label: "Scientia for Slack",
    href: "https://scientiaos.io/slack",
    tag: "Decision capture",
  },
  {
    label: "Syntaxed",
    href: "https://syntaxed.io",
    tag: "Release confidence",
  },
];

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-[var(--mk-color-border)] bg-[var(--mk-color-bg)]">
      <div
        className="mx-auto w-full px-4 sm:px-6 py-10 flex flex-col gap-8"
        style={{ maxWidth: "var(--mk-layout-content-max)" }}
      >
        {/* Top row: brand + nav */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          {/* Brand block */}
          <div className="flex flex-col gap-1 shrink-0">
            <span
              className="font-semibold"
              style={{ color: "var(--mk-color-text)" }}
            >
              Invariant
            </span>
            <span
              className="text-xs"
              style={{
                color: "var(--mk-color-text-muted)",
                fontFamily: "var(--mk-type-font-mono)",
              }}
            >
              by Digital Hooligan LLC
            </span>
            <span
              className="text-xs mt-1"
              style={{ color: "var(--mk-color-text-muted)" }}
            >
              Veteran-owned · SAM.gov Registered · SBA Certified SDVOSB
            </span>

            {/* Social links */}
            <div className="flex gap-4 mt-3">
              <a
                href="https://www.linkedin.com/company/digital-hooligan-llc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Digital Hooligan on LinkedIn"
                className="text-xs hover:underline"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/DHooliganIO"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Digital Hooligan on X"
                className="text-xs hover:underline"
                style={{ color: "var(--mk-color-text-muted)" }}
              >
                X / Twitter
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {/* Internal nav */}
            <nav className="flex flex-col gap-2.5">
              <span
                className="text-[11px] font-semibold uppercase tracking-widest mb-1"
                style={{
                  color: "var(--mk-color-text-muted)",
                  fontFamily: "var(--mk-type-font-mono)",
                }}
              >
                Site
              </span>
              {settings.footerNav.map((item, i) => (
                <TrackedLink
                  key={`${item.label}-${i}`}
                  href={item.href}
                  event="public_nav_click"
                  label={item.label}
                  location="footer_nav"
                  className="text-sm hover:underline text-[var(--mk-color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--mk-color-focus-ring)] rounded"
                >
                  {item.label}
                </TrackedLink>
              ))}
            </nav>

            {/* External products */}
            <nav className="flex flex-col gap-2.5">
              <span
                className="text-[11px] font-semibold uppercase tracking-widest mb-1"
                style={{
                  color: "var(--mk-color-text-muted)",
                  fontFamily: "var(--mk-type-font-mono)",
                }}
              >
                Products
              </span>
              {EXTERNAL_PRODUCTS.map((p) => (
                <TrackedLink
                  key={p.label}
                  href={p.href}
                  event="public_nav_click"
                  label={p.label}
                  location="footer_products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline text-[var(--mk-color-link)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--mk-color-focus-ring)] rounded"
                >
                  {p.label} ↗
                </TrackedLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom: copyright */}
        <div
          className="text-xs pt-4 border-t"
          style={{
            color: "var(--mk-color-text-muted)",
            borderColor: "var(--mk-color-border)",
          }}
        >
          © {new Date().getFullYear()} {settings.legalEntityName}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
