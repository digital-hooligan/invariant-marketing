// scripts/guardrails/cross-repo-imports.mjs
import {
  gitLsFiles,
  readText,
  shouldIgnoreFile,
  modeFromEnv,
  exitWithFindings,
} from "./utils.mjs";

/**
 * Purpose:
 * Prevent invariant-marketing from importing/connecting to scientia-platform internals.
 *
 * Escape hatch:
 * `guardrails:allow-crossrepo` on same line suppresses a hit (should be extremely rare).
 */

const mode = modeFromEnv();

const TARGET_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".md",
  ".mdx",
  ".txt",
  ".yml",
  ".yaml",
  ".json",
]);

const DISALLOWED_SUBSTRINGS = [
  "scientia-platform",
  "digital-hooligan/scientia-platform",
  "@scientia/",
  "/packages/foundations",
  "/packages/auth",
  "/packages/audit",
  "/packages/evidence",
  "/packages/engine",
  "/packages/feature-flags",
  "/engines/",
];

const DISALLOWED_REGEX = [
  /\bfrom\s+['"](@scientia\/[^'"]+)['"]/i,
  /\bimport\s*\(\s*['"](@scientia\/[^'"]+)['"]\s*\)/i,
  /\bhttps?:\/\/github\.com\/digital-hooligan\/scientia-platform\b/i,
];

function isTargetFile(file) {
  if (shouldIgnoreFile(file)) return false;
  const lower = file.toLowerCase();

  if (
    lower.endsWith("pnpm-lock.yaml") ||
    lower.endsWith("package-lock.json") ||
    lower.endsWith("yarn.lock")
  ) {
    return false;
  }

  for (const ext of TARGET_EXT) {
    if (lower.endsWith(ext)) return true;
  }
  return false;
}

function hasEscapeHatch(line) {
  return line.includes("guardrails:allow-crossrepo");
}

function main() {
  const files = gitLsFiles().filter(isTargetFile);
  const findings = [];

  for (const f of files) {
    let content = "";
    try {
      content = readText(f);
    } catch {
      continue;
    }
    if (content.includes("\u0000")) continue;

    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      if (hasEscapeHatch(raw)) continue;

      const lowerLine = raw.toLowerCase();

      for (const s of DISALLOWED_SUBSTRINGS) {
        if (lowerLine.includes(s.toLowerCase())) {
          findings.push({
            file: f,
            line: i + 1,
            rule: "cross-repo-import",
            snippet: raw.slice(0, 240),
            hint: "Remove platform coupling. Marketing repo must remain standalone.",
          });
          break;
        }
      }

      for (const rx of DISALLOWED_REGEX) {
        if (rx.test(raw)) {
          findings.push({
            file: f,
            line: i + 1,
            rule: "cross-repo-import",
            snippet: raw.slice(0, 240),
            hint: "Remove platform coupling. Marketing repo must remain standalone.",
          });
          break;
        }
      }
    }
  }

  exitWithFindings({
    findings,
    mode,
    title: `Guardrails: Cross-repo import boundary (${mode})`,
  });
}

main();
