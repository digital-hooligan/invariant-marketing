// src/lib/env.ts — Secrets & Environment Standard v0.1
// Fail-fast env validation. Never log secret values.
//
// This repo enforces an env contract via tooling/env-contract.
// Keep runtime validation aligned with the contract-required keys.

type RequiredEnvKey =
  | "ENVIRONMENT"
  | "PUBLIC_SITE_URL"
  | "APP_ID"
  | "APP_VERSION"
  | "BUILD_TIMESTAMP";

const REQUIRED: RequiredEnvKey[] = [
  "ENVIRONMENT",
  "PUBLIC_SITE_URL",
  "APP_ID",
  "APP_VERSION",
  "BUILD_TIMESTAMP",
];

export function requireEnv(): { [K in RequiredEnvKey]: string } {
  const missing: string[] = [];

  for (const key of REQUIRED) {
    const v = process.env[key];
    if (!v || v.trim().length === 0) missing.push(key);
  }

  if (missing.length > 0) {
    const msg =
      `Missing required environment variables:\n` +
      missing.map((k) => `- ${k}`).join("\n") +
      `\n\nCopy .env.example → .env.local and fill values.`;

    throw new Error(msg);
  }

  return {
    ENVIRONMENT: process.env.ENVIRONMENT as string,
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL as string,
    APP_ID: process.env.APP_ID as string,
    APP_VERSION: process.env.APP_VERSION as string,
    BUILD_TIMESTAMP: process.env.BUILD_TIMESTAMP as string,
  };
}
