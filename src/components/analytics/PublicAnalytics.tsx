"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type PublicAnalyticsPayload = {
  href?: string;
  label?: string;
  location?: string;
  path?: string;
};

declare global {
  interface Window {
    __scientiaAnalyticsQueue?: Array<{
      event: string;
      payload: PublicAnalyticsPayload;
    }>;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackPublicEvent(
  event: string,
  payload: PublicAnalyticsPayload,
) {
  if (typeof window === "undefined") return;

  window.__scientiaAnalyticsQueue = window.__scientiaAnalyticsQueue ?? [];
  window.__scientiaAnalyticsQueue.push({ event, payload });

  window.dispatchEvent(
    new CustomEvent("scientia:analytics", {
      detail: { event, payload },
    }),
  );

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload });
  }
}

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPublicEvent("public_page_view", { path: pathname });
  }, [pathname]);

  return null;
}

type TrackedLinkProps = {
  href: string;
  event: string;
  label: string;
  location: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
};

export function TrackedLink({
  href,
  event,
  label,
  location,
  className,
  children,
  target,
  rel,
}: TrackedLinkProps) {
  const payload = { href, label, location };
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={target}
        rel={rel}
        onClick={() => trackPublicEvent(event, payload)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackPublicEvent(event, payload)}
    >
      {children}
    </Link>
  );
}

type TrackedButtonProps = {
  event: string;
  label: string;
  location: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
};

export function TrackedButton({
  event,
  label,
  location,
  className,
  type = "button",
  children,
}: TrackedButtonProps) {
  return (
    <button
      type={type}
      className={className}
      onClick={() => trackPublicEvent(event, { label, location })}
    >
      {children}
    </button>
  );
}
