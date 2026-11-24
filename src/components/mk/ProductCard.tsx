import { MkCard } from "@/components/mk/MkCard";

export type Product = {
  name: string;
  tag: string;
  body: string;
  href: string | null;
  /** Availability or status line, stated accurately. */
  note: string | null;
};

/** Shared product card used on the homepage and the Labs page. */
export function ProductCard({ product }: { product: Product }) {
  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3
          className="font-semibold"
          style={{ fontSize: "16px", color: "var(--mk-color-text)" }}
        >
          {product.name}
          {product.href && <span className="ml-1 text-xs opacity-50">↗</span>}
        </h3>
        <span
          className="text-[11px] font-semibold flex-shrink-0 mt-0.5"
          style={{
            color: "var(--mk-color-link)",
            fontFamily: "var(--mk-type-font-mono)",
            opacity: 0.8,
          }}
        >
          {product.tag}
        </span>
      </div>
      <p
        className="leading-[1.6]"
        style={{
          fontSize: "var(--mk-type-size-small)",
          color: "var(--mk-color-text-muted)",
        }}
      >
        {product.body}
      </p>
      {product.note && (
        <p
          className="mt-3 text-xs"
          style={{ color: "var(--mk-color-text-muted)" }}
        >
          {product.note}
        </p>
      )}
    </>
  );

  return product.href ? (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-[var(--mk-radius-lg)] border border-[var(--mk-color-border)] bg-[var(--mk-color-surface-1)] p-6 no-underline block hover:border-[var(--mk-color-link)] transition-colors duration-[120ms]"
      style={{ boxShadow: "var(--mk-shadow-1)" }}
    >
      {cardContent}
    </a>
  ) : (
    <MkCard>{cardContent}</MkCard>
  );
}
