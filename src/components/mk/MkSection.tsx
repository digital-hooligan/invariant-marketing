import type { ReactNode } from "react";

export function MkSection({
  children,
  tone = "default",
  id,
  compact = false,
}: {
  children: ReactNode;
  tone?: "default" | "surface-1";
  id?: string;
  compact?: boolean;
}) {
  const bg =
    tone === "surface-1" ? "bg-[var(--mk-color-surface-1)]" : "bg-transparent";
  const py = compact ? "py-10 md:py-14" : "py-14 md:py-20";

  return (
    <section id={id} className={`${bg} ${py}`}>
      <div
        className="mx-auto w-full px-4 sm:px-6"
        style={{ maxWidth: "var(--mk-layout-content-max)" }}
      >
        {children}
      </div>
    </section>
  );
}
