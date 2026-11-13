"use client";

/**
 * Triggers the browser's print dialog so a prime contractor can save the
 * capability statement as a PDF or print it directly. Hidden from the printed
 * output via the `no-print` class (see globals.css @media print).
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center justify-center min-h-[44px] rounded-[var(--mk-radius-md)] px-6 py-3 text-sm font-semibold transition-colors duration-[120ms]"
      style={{
        background: "var(--mk-color-cta)",
        color: "var(--mk-color-bg)",
        cursor: "pointer",
      }}
    >
      Download / Print (PDF)
    </button>
  );
}
