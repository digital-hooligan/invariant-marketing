// scripts/guardrails/e1-boundary-transitive.mjs
import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const RULE_ID = "E1-BOUNDARY-TRANSITIVE";
const DOC_POINTER =
  "docs/guardrails/BOUNDARY_ENFORCEMENT.md#e1-boundary-transitive";

function sh(cmd) {
  return execSync(cmd, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
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

function printFailure({
  violations,
  lockHits,
  workspaceProtocolHits,
  gitUrlHits,
}) {
  console.log(
    `❌ Guardrails: Transitive dependency boundary (${RULE_ID}): ${violations.length} violation(s)\n`,
  );

  for (const v of violations) {
    console.log(`- package: ${v.pkg}`);
    console.log(`  chain: ${v.chain.join(" -> ")}`);
  }

  if (workspaceProtocolHits.length) {
    console.log(
      `\n- workspace protocol references detected (review for indirection risk):`,
    );
    for (const h of workspaceProtocolHits) console.log(`  - ${h}`);
  }

  if (gitUrlHits.length) {
    console.log(
      `\n- git URL dependencies detected (must not resolve to forbidden roots):`,
    );
    for (const h of gitUrlHits) console.log(`  - ${h}`);
  }

  if (lockHits.length) {
    console.log(`\n- lockfile forbidden-origin indicators:`);
    for (const h of lockHits) console.log(`  - ${h}`);
  }

  console.log(`\nHow to comply (one paragraph):`);
  console.log(
    `Remove any direct or transitive dependency that originates from forbidden platform/IP roots. ` +
      `Avoid workspace:* indirection that points to forbidden namespaces, avoid git/url deps mapping to platform repos, ` +
      `and remove any vendored package that resolves back to forbidden roots. Re-run locally with: ` +
      `"pnpm install --frozen-lockfile && node scripts/guardrails/e1-boundary-transitive.mjs".`,
  );

  console.log(`\nCanonical doc: ${DOC_POINTER}`);
  process.exit(1);
}

function printSuccess() {
  console.log(
    `✅ Guardrails: Transitive dependency boundary (${RULE_ID}): no findings`,
  );
}

const FORBIDDEN_NAME_PREFIXES = ["@scientia/"];

const FORBIDDEN_NAME_EXACT = new Set(["scientia-platform"]);

// Additional forbidden path-like indicators (lockfile / URLs)
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

function isForbiddenPkgName(name) {
  if (!name) return false;
  if (FORBIDDEN_NAME_EXACT.has(name)) return true;
  for (const p of FORBIDDEN_NAME_PREFIXES) {
    if (name.startsWith(p)) return true;
  }
  return false;
}

/**
 * Build dependency tree via pnpm. Deterministic because it runs after frozen install.
 * We rely on `pnpm list --json` output and walk the graph to find forbidden package names.
 */
function getPnpmListJson() {
  // Ensure pnpm exists and deps installed
  const raw = sh("pnpm list --json --depth 50");
  const parsed = JSON.parse(raw);

  // pnpm returns array for workspace; single object for single project
  return Array.isArray(parsed) ? parsed : [parsed];
}

function walkTree(node, chain, violations) {
  const name = node?.name;
  if (name && isForbiddenPkgName(name)) {
    violations.push({ pkg: name, chain: [...chain, name] });
    // keep walking to show additional hits if nested
  }

  const deps = node?.dependencies || {};
  for (const depName of Object.keys(deps)) {
    const child = deps[depName];
    // pnpm list uses object values with `name` fields sometimes missing; normalize
    const childName = child?.name || depName;
    walkTree(
      { ...child, name: childName },
      [...chain, node?.name || "<root>"],
      violations,
    );
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

function scanLockfileForForbiddenOrigins() {
  const lockPath = path.resolve("pnpm-lock.yaml");
  if (!exists(lockPath)) return [];
  const txt = readText(lockPath);
  const hits = [];

  for (const marker of FORBIDDEN_ORIGIN_MARKERS) {
    if (txt.includes(marker)) hits.push(`pnpm-lock.yaml contains "${marker}"`);
  }

  // crude detection of git tarballs / repo refs
  if (txt.includes("github.com:"))
    hits.push(
      `pnpm-lock.yaml contains "github.com:" (review for forbidden origins)`,
    );
  if (txt.includes("git+"))
    hits.push(`pnpm-lock.yaml contains "git+" (review for forbidden origins)`);

  return hits;
}

function main() {
  const { hitsWorkspace, hitsGit } = scanPackageJsonForIndirection();

  const list = getPnpmListJson();
  const violations = [];

  for (const root of list) {
    const rootName = root?.name || "<workspace>";
    walkTree(root, [rootName], violations);
  }

  const lockHits = scanLockfileForForbiddenOrigins();

  // Fail if forbidden package names found in resolved graph OR forbidden origins indicated in lockfile.
  if (
    violations.length > 0 ||
    lockHits.some((h) => h.includes("digital-hooligan/scientia-platform"))
  ) {
    printFailure({
      violations,
      lockHits,
      workspaceProtocolHits: hitsWorkspace,
      gitUrlHits: hitsGit,
    });
    return;
  }

  printSuccess();
}

main();
