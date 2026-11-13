"use client";

/**
 * Triggers the browser's print dialog so a prime contractor can print this view
 * or save it as a PDF from the browser. Secondary to the direct PDF download.
 * Hidden from the printed output via the `no-print` class (see globals.css).
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] border px-6 py-3 text-sm font-semibold transition-colors duration-[120ms] hover:border-[var(--mk-color-cta)] hover:text-[var(--mk-color-cta)]"
      style={{
        borderColor: "var(--mk-color-border)",
        color: "var(--mk-color-text)",
        cursor: "pointer",
      }}
    >
      Print
    </button>
  );
}
