// scripts/guardrails/utils.mjs
import { execSync } from "node:child_process";
import fs from "node:fs";

export function gitLsFiles() {
  const out = execSync("git ls-files", { encoding: "utf8" });
  return out
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function modeFromEnv() {
  const mode = (process.env.GUARDRAILS_MODE || "error").toLowerCase();
  if (mode !== "warn" && mode !== "error") return "error";
  return mode;
}

/**
 * Canonical ignore scope for governance scanning:
 * - Do not scan GitHub templates/workflows (they contain example prohibited phrases)
 * - Do not scan the guardrail scripts themselves (they contain denylists/examples)
 * - Do not scan guardrail implementation docs/summaries (they reference repo names/patterns)
 * - Do not scan build/vendor outputs
 */
export function shouldIgnoreFile(p) {
  const norm = p.replaceAll("\\", "/");

  // Repo governance / CI / templates
  if (norm.startsWith(".github/")) return true;

  // Guardrails implementation (contains denylist terms by design)
  if (norm.startsWith("scripts/guardrails/")) return true;
  if (norm.startsWith("docs/guardrails/")) return true;

  // Build/vendor
  if (norm.startsWith(".next/")) return true;
  if (norm.startsWith("node_modules/")) return true;
  if (norm.startsWith("dist/")) return true;
  if (norm.startsWith("build/")) return true;
  if (norm.startsWith("coverage/")) return true;

  return false;
}

export function exitWithFindings({ findings, mode, title }) {
  if (findings.length === 0) {
    console.log(`✅ ${title}: no findings`);
    process.exit(0);
  }

  const header = mode === "warn" ? "⚠️" : "❌";
  console.log(`${header} ${title}: ${findings.length} finding(s)\n`);

  for (const f of findings) {
    const loc = f.line != null ? `:${f.line}` : "";
    const rule = f.rule ? ` [${f.rule}]` : "";
    console.log(`- ${f.file}${loc}${rule}`);
    if (f.snippet) console.log(`  ${f.snippet}`);
    if (f.hint) console.log(`  Hint: ${f.hint}`);
  }

  process.exit(mode === "warn" ? 0 : 1);
}
