import React from "react";

export function MDXContent({ children }: { children: React.ReactNode }) {
  return <div className="prose max-w-none">{children}</div>;
}
