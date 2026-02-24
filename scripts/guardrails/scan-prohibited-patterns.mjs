#!/usr/bin/env node
/**
 * Guardrails Enforcement — E1 (v0.7) for invariant-marketing
 *
 * Deterministic, toolchain-independent enforcement that fails CI on prohibited patterns:
 * - invariant-marketing must never couple to scientia-platform internals (imports/requires/deps)
 * - No platform DB/persistence client references
 * - Marketing copy must not claim system advisory/execution authority (keyword-based, scoped to copy sources)
 *
 * Test support:
 * - Set GUARDRAILS_E1_INCLUDE_UNTRACKED=1 to include untracked files (for invariant fixtures).
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = process.cwd();

function sh(cmd) {
  return execSync(cmd, { cwd: REPO_ROOT, stdio: ["ignore", "pipe", "pipe"] })
    .toString("utf8")
    .trim();
}

function fileExists(p) {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function normalizeSlashes(p) {
  return p.replaceAll("\\", "/");
}

function listFilesToScan() {
  const tracked = sh("git ls-files")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const includeUntracked = process.env.GUARDRAILS_E1_INCLUDE_UNTRACKED === "1";
  if (!includeUntracked) return tracked;

  const untracked = sh("git ls-files --others --exclude-standard")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const set = new Set([...tracked, ...untracked]);
  return Array.from(set);
}

function shouldSkip(rel) {
  const f = normalizeSlashes(rel);
  if (f.startsWith(".git/")) return true;
  if (f.startsWith("node_modules/")) return true;
  if (f.startsWith("dist/")) return true;
  if (f.startsWith("build/")) return true;
  if (f.startsWith(".next/")) return true;
  if (f.startsWith("out/")) return true;
  if (f.startsWith("coverage/")) return true;
  return false;
}

function isCodeFile(filePath) {
  return (
    filePath.endsWith(".js") ||
    filePath.endsWith(".mjs") ||
    filePath.endsWith(".cjs") ||
    filePath.endsWith(".ts") ||
    filePath.endsWith(".tsx") ||
    filePath.endsWith(".jsx")
  );
}

function isTextFile(filePath) {
  return (
    isCodeFile(filePath) ||
    filePath.endsWith(".json") ||
    filePath.endsWith(".md") ||
    filePath.endsWith(".mdx") ||
    filePath.endsWith(".yml") ||
    filePath.endsWith(".yaml") ||
    filePath.endsWith(".css") ||
    filePath.endsWith(".scss") ||
    filePath.endsWith(".html")
  );
}

function parseJsonSafe(text, fileLabel) {
  try {
    return JSON.parse(text);
  } catch {
    return { __parseError: `Invalid JSON in ${fileLabel}` };
  }
}

function failWith(violations) {
  if (violations.length === 0) return;
  const msg = [
    "ERROR: Guardrails E1 enforcement failed.\n",
    ...violations.map((v) => `- ${v}`),
    "\nRef: E1 — Guardrails Enforcement Spec v0.7",
  ].join("\n");
  console.error(msg);
  process.exit(1);
}

function scan() {
  const files = listFilesToScan()
    .filter((f) => !shouldSkip(f))
    .filter(isTextFile);

  const violations = [];

  // Coupling-only: deny module names and platform internal namespaces
  const denyModuleNames = new Set(["scientia-platform"]);
  const denyNamespaces = [/^@scientia\//, /^@radixos\//, /^@solum\//];

  const importDenyRegexes = Array.from(denyModuleNames)
    .map((name) => {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return [
        new RegExp(String.raw`from\s+["']${escaped}["']`, "g"),
        new RegExp(
          String.raw`require$begin:math:text$\\s\*\[\"\'\]\$\{escaped\}\[\"\'\]\\s\*$end:math:text$`,
          "g",
        ),
        new RegExp(
          String.raw`import$begin:math:text$\\s\*\[\"\'\]\$\{escaped\}\[\"\'\]\\s\*$end:math:text$`,
          "g",
        ),
      ];
    })
    .flat();

  // Belt & suspenders: platform DB imports should not exist here at all
  const dbReachThroughDeny = [
    /from\s+["']@scientia\/db["']/g,
    /from\s+["']@radixos\/db["']/g,
    /from\s+["']@solum\/db["']/g,
    /require\(\s*["']@scientia\/db["']\s*\)/g,
    /require\(\s*["']@radixos\/db["']\s*\)/g,
    /require\(\s*["']@solum\/db["']\s*\)/g,
  ];

  // Authority-collapse indicators in marketing copy
  const marketingAuthorityPhrases = [
    "Scientia will decide",
    "Scientia decides",
    "Scientia recommends",
    "Solum recommends",
    "RadixOS executes",
    "Custos decides",
    "automatic approval",
    "auto-approve",
    "we guarantee outcomes",
  ].map((s) => new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"));

  for (const rel of files) {
    const abs = path.join(REPO_ROOT, rel);
    if (!fileExists(abs)) continue;

    const content = readText(abs);
    const nrel = normalizeSlashes(rel);

    // Dependency coupling (package.json)
    if (nrel === "package.json") {
      const json = parseJsonSafe(content, rel);
      if (json.__parseError) {
        violations.push(`[E1 Boundary] ${json.__parseError}`);
      } else {
        const deps = {
          ...(json.dependencies ?? {}),
          ...(json.devDependencies ?? {}),
          ...(json.peerDependencies ?? {}),
          ...(json.optionalDependencies ?? {}),
        };

        for (const name of denyModuleNames) {
          if (Object.prototype.hasOwnProperty.call(deps, name)) {
            violations.push(
              `[E1 Boundary] Cross-repo dependency coupling: package.json depends on "${name}".`,
            );
          }
        }
      }
    }

    // Import/require coupling (code only)
    if (isCodeFile(nrel)) {
      for (const re of importDenyRegexes) {
        if (re.test(content)) {
          violations.push(
            `[E1 Boundary] Platform coupling import/require detected in ${rel} (matched: ${re}).`,
          );
        }
        re.lastIndex = 0;
      }

      // deny @scientia/* etc appearing as module specifiers
      const importStatements =
        content.match(
          /(?:from\s+["'][^"']+["']|require\(\s*["'][^"']+["']\s*\)|import\(\s*["'][^"']+["']\s*\))/g,
        ) ?? [];
      for (const stmt of importStatements) {
        const m = stmt.match(/["']([^"']+)["']/);
        const spec = m?.[1];
        if (!spec) continue;
        for (const ns of denyNamespaces) {
          if (ns.test(spec)) {
            violations.push(
              `[E1 Boundary] Platform internal namespace import detected in ${rel} (specifier: "${spec}").`,
            );
          }
        }
      }

      for (const re of dbReachThroughDeny) {
        if (re.test(content)) {
          violations.push(
            `[E1 Reach-through] DB client import detected in ${rel}. Marketing repo must not contain platform persistence dependencies.`,
          );
        }
        re.lastIndex = 0;
      }
    }

    // Copy/content authority phrase scanning
    const isCopySource =
      nrel.startsWith("content/") ||
      nrel.startsWith("docs/") ||
      nrel.endsWith(".md") ||
      nrel.endsWith(".mdx");

    if (isCopySource) {
      for (const re of marketingAuthorityPhrases) {
        if (re.test(content)) {
          violations.push(
            `[E1 Authority] Authority-collapse marketing phrase detected in ${rel} (matched: ${re}). Marketing copy must not imply system advisory/execution authority.`,
          );
        }
      }
    }
  }

  failWith(violations);
}

try {
  scan();
  console.log("Guardrails E1: OK");
} catch (err) {
  console.error("Guardrails E1: failed with unexpected error.");
  console.error(err?.stack || err);
  process.exit(1);
}
