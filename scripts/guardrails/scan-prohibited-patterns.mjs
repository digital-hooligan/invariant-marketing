// scripts/guardrails/scan-prohibited-patterns.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";

/**
 * Guardrails E1 — Prohibited Pattern Scanner (Marketing Repo)
 *
 * Purpose:
 * - Enforce boundary: invariant-marketing must not couple to scientia-platform internals.
 *
 * Critical scope rule:
 * - NEVER scan governance scaffolding or guardrail implementation itself.
 *   Specifically exclude:
 *     - .github/**
 *     - docs/**
 *     - scripts/guardrails/** (including tests/fixtures)
 *     - tooling/**
 *     - node_modules/**, .next/**, dist/**, build/**, coverage/**
 *
 * Scan scope:
 * - Only scan marketing/product surfaces:
 *     - content/**
 *     - src/**
 */

function gitLsFiles() {
  const out = execSync("git ls-files", { encoding: "utf8" });
  return out
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function shouldIgnoreFile(p) {
  const norm = p.replaceAll("\\", "/");

  // governance / scaffolding
  if (norm.startsWith(".github/")) return true;
  if (norm.startsWith("docs/")) return true;
  if (norm.startsWith("scripts/guardrails/")) return true;
  if (norm.startsWith("tooling/")) return true;

  // build/vendor
  if (norm.startsWith(".next/")) return true;
  if (norm.startsWith("node_modules/")) return true;
  if (norm.startsWith("dist/")) return true;
  if (norm.startsWith("build/")) return true;
  if (norm.startsWith("coverage/")) return true;

  return false;
}

function isInScope(p) {
  const norm = p.replaceAll("\\", "/");
  if (shouldIgnoreFile(norm)) return false;

  // strict marketing surface scope
  return norm.startsWith("content/") || norm.startsWith("src/");
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

const PROHIBITED_SUBSTRINGS = [
  // repo-level coupling
  "scientia-platform",
  "digital-hooligan/scientia-platform",
  "@scientia/",

  // platform internals
  "/packages/foundations",
  "/packages/auth",
  "/packages/audit",
  "/packages/evidence",
  "/packages/engine",
  "/packages/feature-flags",
  "/engines/",
];

const PROHIBITED_REGEX = [
  // explicit imports/requires to platform
  /\bfrom\s+['"]scientia-platform['"]/i,
  /\brequire\s*\(\s*['"]scientia-platform['"]\s*\)/i,

  // @scientia namespace imports
  /\bfrom\s+['"](@scientia\/[^'"]+)['"]/i,
  /\bimport\s*\(\s*['"](@scientia\/[^'"]+)['"]\s*\)/i,

  // direct links
  /\bhttps?:\/\/github\.com\/digital-hooligan\/scientia-platform\b/i,
];

function scanFile(file) {
  const findings = [];

  let content = "";
  try {
    content = readText(file);
  } catch {
    return findings;
  }

  if (content.includes("\u0000")) return findings;

  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];

    // optional escape hatch for extremely rare cases (requires explicit reviewer sign-off)
    if (raw.includes("guardrails:allow-prohibited-pattern")) continue;

    const lower = raw.toLowerCase();

    for (const s of PROHIBITED_SUBSTRINGS) {
      if (lower.includes(s.toLowerCase())) {
        findings.push({
          file,
          line: i + 1,
          rule: "e1-prohibited-substring",
          snippet: raw.slice(0, 240),
          hint: "Remove platform coupling. Marketing repo must remain standalone.",
        });
        break;
      }
    }

    for (const rx of PROHIBITED_REGEX) {
      if (rx.test(raw)) {
        findings.push({
          file,
          line: i + 1,
          rule: "e1-prohibited-regex",
          snippet: raw.slice(0, 240),
          hint: "Remove platform coupling. Marketing repo must remain standalone.",
        });
        break;
      }
    }
  }

  return findings;
}

function main() {
  const files = gitLsFiles().filter(isInScope);

  const findings = [];
  for (const f of files) {
    findings.push(...scanFile(f));
  }

  if (findings.length === 0) {
    console.log("✅ Guardrails E1 prohibited pattern scan: no findings");
    process.exit(0);
  }

  console.log(
    `❌ Guardrails E1 prohibited pattern scan: ${findings.length} finding(s)\n`,
  );
  for (const f of findings) {
    console.log(`- ${f.file}:${f.line} [${f.rule}]`);
    console.log(`  ${f.snippet}`);
    console.log(`  Hint: ${f.hint}`);
  }

  process.exit(1);
}

main();
