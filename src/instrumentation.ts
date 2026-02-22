// src/instrumentation.ts
// Next.js instrumentation hook: executed on server startup.
// We validate required env vars here to fail fast.

import { requireEnv } from "./lib/env";

export function register() {
  // Validate on server startup. Never log secret values.
  requireEnv();
}
