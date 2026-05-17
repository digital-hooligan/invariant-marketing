import type { ReactNode } from "react";

export function MkSection({
  children,
  tone = "default",
  id,
}: {
  children: ReactNode;
  tone?: "default" | "surface-1";
  id?: string;
}) {
  const bg =
    tone === "surface-1" ? "bg-[var(--mk-color-surface-1)]" : "bg-transparent";

  return (
    <section id={id} className={`${bg} py-14 md:py-24`}>
      <div
        className="mx-auto w-full px-6"
        style={{ maxWidth: "var(--mk-layout-content-max)" }}
      >
        {children}
      </div>
    </section>
  );
}
