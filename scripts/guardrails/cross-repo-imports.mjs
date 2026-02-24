// scripts/guardrails/cross-repo-imports.mjs
import {
  gitLsFiles,
  readText,
  modeFromEnv,
  exitWithFindings,
} from "./utils.mjs";

/**
 * STRICT SCOPE SCANNER
 *
 * Only scan marketing surface areas:
 *   - content/**
 *   - src/**
 *
 * Never scan:
 *   - .github/**
 *   - scripts/**
 *   - docs/**
 *   - tooling/**
 *   - config/**
 *
 * Marketing must not couple to scientia-platform internals.
 */

const mode = modeFromEnv();

/**
 * Only scan marketing surface directories.
 */
function isTargetFile(file) {
  const norm = file.replaceAll("\\", "/");

  if (!(norm.startsWith("content/") || norm.startsWith("src/"))) {
    return false;
  }

  const lower = norm.toLowerCase();

  // ignore lockfiles and binaries
  if (
    lower.endsWith("pnpm-lock.yaml") ||
    lower.endsWith("package-lock.json") ||
    lower.endsWith("yarn.lock")
  ) {
    return false;
  }

  return true;
}

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
