// scripts/guardrails/authority-keywords.mjs
import {
  gitLsFiles,
  readText,
  modeFromEnv,
  exitWithFindings,
} from "./utils.mjs";

/**
 * STRICT SCOPE AUTHORITY SCANNER
 *
 * Only scan marketing surface:
 *   - content/**
 *   - src/**
 *
 * Never scan:
 *   - .github/**
 *   - scripts/**
 *   - docs/**
 *
 * Blocks implied autonomy / authority-collapse language.
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

  if (
    lower.endsWith("pnpm-lock.yaml") ||
    lower.endsWith("package-lock.json") ||
    lower.endsWith("yarn.lock")
  ) {
    return false;
  }

  return true;
}

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

// Allow negated compliance statements
function isNegated(line) {
  return /\b(does\s+not|do\s+not|did\s+not|not|never|no|without)\b[\s\w,-]{0,60}\b(decide|decides|decision|make\s+decisions|makes\s+decisions|execute|executes|execution|prioritiz\w*|determin\w*|autonomous)\b/i.test(
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

      if (isNegated(raw)) continue;

      const lowerLine = raw.toLowerCase();

      for (const phrase of BANNED_PHRASES) {
        if (lowerLine.includes(phrase)) {
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
