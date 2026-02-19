import type { ReactNode } from "react";

export function MkCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-[var(--mk-radius-lg)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6"
      style={{ boxShadow: "var(--mk-shadow-1)" }}
    >
      {children}
    </div>
  );
}
