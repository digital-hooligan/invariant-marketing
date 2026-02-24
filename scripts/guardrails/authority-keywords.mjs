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
 * IMPORTANT:
 * This scanner must NOT scan:
 * - itself / guardrails scripts (contain denylist phrases)
 * - .github templates (contain example prohibited phrases)
 * - docs/guardrails summaries (contain examples and governance language)
 *
 * Escape hatch:
 * `guardrails:allow-authority` on same line suppresses a hit (use sparingly).
 *
 * Allow:
 * Clearly negated compliance statements such as:
 * - "not autonomous decisions or execution"
 * - "no autonomous execution"
 * - "does not make decisions or execute"
 * - "does not decide"
 * - "does not automatically prioritize"
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
  "auto-decide",
  "auto decide",
  "makes decisions",
  "make decisions",
  "decides for you",
  "decide for you",
  "automatically prioritizes",
  "automatically prioritise",
  "automatically executes",
  "automatically execute",
  "self-directed",
  "self directed",
  "agentic",
  "decision engine",
  "ai-powered decision",
  "ai powered decision",
  "ai-driven decision",
  "ai driven decision",
  "ai makes",
  "ai decides",
  "ai will decide",
  "the system decides",
  "it decides",
  "it will decide",
  "it determines",
];

const BANNED_REGEX = [
  /\bAI[-\s]?powered\b.*\b(decision|decide|prioritiz|execute)\b/i,
  /\bAI[-\s]?driven\b.*\b(decision|decide|prioritiz|execute)\b/i,
  /\bautomatically\b.*\b(decide|prioritiz|execute)\b/i,
  /\b(the\s+system|platform|engine)\b.*\b(decides|prioritizes|executes)\b/i,
];

function isTargetFile(file) {
  if (shouldIgnoreFile(file)) return false;

  const lower = file.toLowerCase();

  // ignore lockfiles
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

// Negated autonomy: "not/no/without ... autonomous"
function isNegatedAutonomy(line) {
  return /\b(not|no|without)\b[\s\w,-]{0,40}\bautonomous\b/i.test(line);
}

// Negated authority verbs: "does not / do not / not ... decide|make decisions|execute|prioritize|determine"
function isNegatedAuthorityVerb(line) {
  return /\b(does\s+not|do\s+not|did\s+not|not|never|no)\b[\s\w,-]{0,60}\b(decide|decides|decision|make\s+decisions|makes\s+decisions|execute|executes|execution|prioritiz\w*|determin\w*)\b/i.test(
    line,
  );
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
      if (!raw.trim()) continue;
      if (hasEscapeHatch(raw)) continue;

      // Allow explicit compliance statements that negate authority/autonomy
      if (raw.toLowerCase().includes("autonomous") && isNegatedAutonomy(raw)) {
        continue;
      }
      if (
        /decid|decision|make decisions|execute|prioritiz|determin/i.test(raw) &&
        isNegatedAuthorityVerb(raw)
      ) {
        continue;
      }

      const lowerLine = raw.toLowerCase();

      for (const phrase of BANNED_PHRASES) {
        if (lowerLine.includes(phrase)) {
          // Allow negated compliance statements even if they contain banned substrings
          if (
            (phrase === "autonomous" || phrase === "fully autonomous") &&
            isNegatedAutonomy(raw)
          ) {
            continue;
          }
          if (
            (phrase.includes("decid") ||
              phrase.includes("decision") ||
              phrase.includes("make decisions") ||
              phrase.includes("automatically") ||
              phrase.includes("execute") ||
              phrase.includes("prioritis") ||
              phrase.includes("determin")) &&
            isNegatedAuthorityVerb(raw)
          ) {
            continue;
          }

          findings.push({
            file: f,
            line: i + 1,
            rule: "authority-keywords",
            snippet: raw.slice(0, 240),
            hint: 'Use non-authoritative phrasing: "surfaces signals", "structures context", "requires human decision".',
          });
          break;
        }
      }

      for (const rx of BANNED_REGEX) {
        if (rx.test(raw)) {
          // Allow negated compliance statements that match regex patterns
          if (isNegatedAuthorityVerb(raw) || isNegatedAutonomy(raw)) {
            continue;
          }

          findings.push({
            file: f,
            line: i + 1,
            rule: "authority-regex",
            snippet: raw.slice(0, 240),
            hint: "Avoid implying autonomy/decision authority. Use non-authoritative phrasing.",
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
