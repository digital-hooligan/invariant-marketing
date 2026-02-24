// scripts/guardrails/authority-keywords.mjs
import {
  gitLsFiles,
  readText,
  shouldIgnoreFile,
  modeFromEnv,
  exitWithFindings,
} from "./utils.mjs";

/**
 * Marketing-facing guardrail:
 * Block "Implied Autonomy" / authority-collapse language in docs + site content.
 *
 * Escape hatch:
 * `guardrails:allow-authority` on same line suppresses a hit (use sparingly).
 *
 * Important:
 * We DO allow clearly NEGATED statements such as:
 * - "not autonomous decisions or execution"
 * These are compliance statements, not authority claims.
 */

const mode = modeFromEnv();

const ALLOWED_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".md",
  ".mdx",
  ".txt",
]);

const BANNED_PHRASES = [
  "fully autonomous",
  "autonomous",
  "agentic",
  "decision engine",
  "ai-powered decision",
  "ai powered decision",
  "ai-driven decision",
  "ai driven decision",
  "ai decides",
  "ai makes decisions",
  "makes decisions",
  "automatically prioritizes",
  "automatically executes",
  "self-directed",
  "the system decides",
  "the platform decides",
];

const BANNED_REGEX = [
  /\bAI[-\s]?powered\b.*\b(decision|decide|prioritiz|execute)\b/i,
  /\bAI[-\s]?driven\b.*\b(decision|decide|prioritiz|execute)\b/i,
  /\bautomatically\b.*\b(decide|prioritiz|execute)\b/i,
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

  for (const ext of ALLOWED_EXT) {
    if (lower.endsWith(ext)) return true;
  }
  return false;
}

function hasEscapeHatch(line) {
  return line.includes("guardrails:allow-authority");
}

function isNegatedAutonomy(line) {
  return /\b(not|no|without)\b[\s\w,-]{0,30}\bautonomous\b/i.test(line);
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

      // Allow negated autonomy statements
      if (raw.toLowerCase().includes("autonomous") && isNegatedAutonomy(raw)) {
        continue;
      }

      const lowerLine = raw.toLowerCase();

      for (const phrase of BANNED_PHRASES) {
        if (lowerLine.includes(phrase)) {
          if (
            (phrase === "autonomous" || phrase === "fully autonomous") &&
            isNegatedAutonomy(raw)
          ) {
            continue;
          }

          findings.push({
            file: f,
            line: i + 1,
            rule: "authority-keywords",
            snippet: raw.slice(0, 240),
            hint: 'Rewrite as "surfaces signals", "structures context", "requires human decision".',
          });
          break;
        }
      }

      for (const rx of BANNED_REGEX) {
        if (rx.test(raw)) {
          findings.push({
            file: f,
            line: i + 1,
            rule: "authority-regex",
            snippet: raw.slice(0, 240),
            hint: "Avoid implying autonomy/decision authority.",
          });
          break;
        }
      }
    }
  }

  exitWithFindings({
    findings,
    mode,
    title: `Guardrails: Authority / Implied Autonomy language (${mode})`,
  });
}

main();
