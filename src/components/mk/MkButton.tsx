import Link from "next/link";

export function MkPrimaryCta({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center",
        "rounded-[var(--mk-radius-md)]",
        "px-6 py-4",
        "text-sm font-semibold",
        "no-underline",
        "min-h-[44px]",
        "bg-[var(--mk-color-cta)]",
        "text-[var(--mk-color-bg)]",
        "hover:bg-[var(--mk-color-cta-hover)]",
        "transition-colors",
        "duration-[120ms]",
        "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
