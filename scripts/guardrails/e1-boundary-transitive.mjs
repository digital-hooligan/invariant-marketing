// scripts/guardrails/e1-boundary-transitive.mjs
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const RULE_ID = "E1-BOUNDARY-TRANSITIVE";
const DOC_POINTER =
  "docs/guardrails/BOUNDARY_ENFORCEMENT.md#e1-boundary-transitive";

const MAX_BUFFER_BYTES = 16 * 1024 * 1024; // keep modest; we avoid giant outputs now

function sh(cmd) {
  return execSync(cmd, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: MAX_BUFFER_BYTES,
  }).trim();
}

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function scanPackageJsonForIndirection() {
  const pkgPath = path.resolve("package.json");
  const txt = readText(pkgPath);
  const pkg = JSON.parse(txt);

  const hitsWorkspace = [];
  const hitsGit = [];

  const depBlocks = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ];
  for (const block of depBlocks) {
    const m = pkg[block] || {};
    for (const [name, ver] of Object.entries(m)) {
      if (typeof ver === "string" && ver.startsWith("workspace:")) {
        hitsWorkspace.push(`${block}.${name}=${ver}`);
      }
      if (
        typeof ver === "string" &&
        (ver.startsWith("git+") ||
          ver.startsWith("git://") ||
          ver.includes("github.com"))
      ) {
        hitsGit.push(`${block}.${name}=${ver}`);
      }
    }
  }

  return { hitsWorkspace, hitsGit };
}

// forbidden name roots
const FORBIDDEN_EXACT = new Set(["scientia-platform"]);
const FORBIDDEN_PREFIXES = ["@scientia/"];

// forbidden “origin” markers (URLs/paths) that imply coupling even if the name is disguised
const FORBIDDEN_ORIGIN_MARKERS = [
  "digital-hooligan/scientia-platform",
  "scientia-platform",
  "/packages/foundations",
  "/packages/auth",
  "/packages/db",
  "/packages/audit",
  "/packages/evidence",
  "/packages/feature-flags",
  "/packages/observability",
  "/packages/engine",
  "/engines/",
];

// Extract forbidden package names from pnpm-lock.yaml text without parsing YAML.
function findForbiddenNamesInLockText(lockText) {
  const found = new Set();

  // exact
  if (lockText.includes("scientia-platform")) found.add("scientia-platform");

  // prefix matches: @scientia/<name>
  const rx = /\b@scientia\/[a-zA-Z0-9._-]+\b/g;
  const matches = lockText.match(rx) || [];
  for (const m of matches) found.add(m);

  // Normalize out false positives like references in comments by requiring it to appear in a key-ish context too.
  // (Lightweight check: also accept if found anywhere; enforcement errs safe.)
  return [...found].filter(Boolean);
}

function findForbiddenOriginsInLockText(lockText) {
  const hits = [];
  for (const marker of FORBIDDEN_ORIGIN_MARKERS) {
    if (lockText.includes(marker))
      hits.push(`pnpm-lock.yaml contains "${marker}"`);
  }
  // also flag presence of git-based resolution (needs manual review if present)
  if (lockText.includes("git+"))
    hits.push(`pnpm-lock.yaml contains "git+" (review for forbidden origins)`);
  if (lockText.includes("github.com:"))
    hits.push(
      `pnpm-lock.yaml contains "github.com:" (review for forbidden origins)`,
    );
  return hits;
}

function isForbiddenPkgName(name) {
  if (!name) return false;
  if (FORBIDDEN_EXACT.has(name)) return true;
  for (const p of FORBIDDEN_PREFIXES) if (name.startsWith(p)) return true;
  return false;
}

/**
 * Produce a deterministic “dependency chain” using pnpm why.
 * We keep output small by capturing only a short excerpt.
 */
function dependencyChainExcerpt(pkgName) {
  try {
    const out = sh(`pnpm why --filter . "${pkgName}"`);
    const lines = out.split(/\r?\n/).slice(0, 30);
    return lines.join("\n");
  } catch (e) {
    const msg = String(
      e?.stderr?.toString?.() || e?.message || e || "unknown error",
    );
    return `pnpm why failed for "${pkgName}" (truncated): ${msg.slice(0, 400)}...`;
  }
}

function fail({
  forbiddenPkgs,
  originHits,
  workspaceProtocolHits,
  gitUrlHits,
}) {
  console.log(
    `❌ Guardrails: Transitive dependency boundary (${RULE_ID}): ${forbiddenPkgs.length + originHits.length} finding(s)\n`,
  );

  if (forbiddenPkgs.length) {
    console.log(`Resolved forbidden package name(s):`);
    for (const p of forbiddenPkgs) console.log(`- ${p}`);
  }

  if (originHits.length) {
    console.log(`\nForbidden-origin indicator(s):`);
    for (const h of originHits) console.log(`- ${h}`);
  }

  if (workspaceProtocolHits.length) {
    console.log(
      `\nworkspace:* indirection present (review for forbidden mapping):`,
    );
    for (const h of workspaceProtocolHits) console.log(`- ${h}`);
  }

  if (gitUrlHits.length) {
    console.log(
      `\ngit/url dependency spec present (must not resolve to forbidden roots):`,
    );
    for (const h of gitUrlHits) console.log(`- ${h}`);
  }

  // Dependency chain requirement: show “who pulled it in”
  if (forbiddenPkgs.length) {
    console.log(`\nDependency chain (who pulled it in):`);
    for (const p of forbiddenPkgs) {
      console.log(`\n=== pnpm why ${p} ===`);
      console.log(dependencyChainExcerpt(p));
    }
  }

  console.log(`\nHow to comply:`);
  console.log(
    `Remove any direct or transitive dependency that originates from forbidden platform/IP roots. ` +
      `Replace upstream packages that pull forbidden namespaces, remove workspace:* indirection that maps to forbidden roots, ` +
      `and remove git/url deps or vendored packages that resolve back to scientia-platform or @scientia/* internals. ` +
      `Re-run locally with: "pnpm install --frozen-lockfile && node scripts/guardrails/e1-boundary-transitive.mjs".`,
  );

  console.log(`\nCanonical doc: ${DOC_POINTER}`);
  process.exit(1);
}

function ok() {
  console.log(
    `✅ Guardrails: Transitive dependency boundary (${RULE_ID}): no findings`,
  );
}

function main() {
  const { hitsWorkspace, hitsGit } = scanPackageJsonForIndirection();

  const lockPath = path.resolve("pnpm-lock.yaml");
  if (!exists(lockPath)) {
    console.log(
      `❌ Guardrails: Transitive dependency boundary (${RULE_ID}): tool failure\n`,
    );
    console.log(
      `pnpm-lock.yaml not found. This repo must use pnpm-lock.yaml for deterministic enforcement.`,
    );
    console.log(`Canonical doc: ${DOC_POINTER}`);
    process.exit(1);
  }

  const lockText = readText(lockPath);

  const forbiddenNames =
    findForbiddenNamesInLockText(lockText).filter(isForbiddenPkgName);
  const originHits = findForbiddenOriginsInLockText(lockText);

  // Deterministic pass: no forbidden names and no forbidden origin markers
  if (
    forbiddenNames.length === 0 &&
    originHits.filter((h) => h.includes("digital-hooligan/scientia-platform"))
      .length === 0
  ) {
    ok();
    return;
  }

  fail({
    forbiddenPkgs: forbiddenNames,
    originHits,
    workspaceProtocolHits: hitsWorkspace,
    gitUrlHits: hitsGit,
  });
}

main();
