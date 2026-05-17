"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackPublicEvent } from "@/components/analytics/PublicAnalytics";

type NavItem = { label: string; href: string };

export function SiteNavMobile({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        className="flex flex-col justify-center gap-[5px] p-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--mk-color-focus-ring)]"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        <span
          className="block w-5 h-0.5 transition-transform duration-150"
          style={{
            background: "var(--mk-color-text)",
            transform: open ? "translateY(6px) rotate(45deg)" : "none",
          }}
        />
        <span
          className="block w-5 h-0.5 transition-opacity duration-150"
          style={{
            background: "var(--mk-color-text)",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block w-5 h-0.5 transition-transform duration-150"
          style={{
            background: "var(--mk-color-text)",
            transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {open && (
        <nav
          id="mobile-nav"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 rounded-[var(--mk-radius-md)] border py-2 shadow-lg"
          style={{
            background: "var(--mk-color-surface-1)",
            borderColor: "var(--mk-color-border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {items.map((item, i) => (
            <Link
              key={`m-${item.label}-${i}`}
              href={item.href}
              className="block px-4 py-2.5 text-sm font-medium hover:underline"
              style={{ color: "var(--mk-color-text)" }}
              onClick={() => {
                trackPublicEvent("public_nav_click", {
                  href: item.href,
                  label: item.label,
                  location: "header_nav_mobile",
                });
                setOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
