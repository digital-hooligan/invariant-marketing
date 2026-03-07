// scripts/guardrails/tests/e1-invariants.test.mjs
import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

/**
 * E1 Invariant Tests — Marketing Repo
 *
 * Important: the E1 scanner uses `git ls-files` (tracked files only).
 * Therefore, tests must stage temp fixtures with `git add` to ensure
 * they appear in the scanner’s file list.
 *
 * Updated invariant:
 * - Only marketing surface (content/, src/) is scanned.
 * - Governance scaffolding (scripts/, docs/, .github/) is out-of-scope.
 */

function run(cmd) {
  return execSync(cmd, {
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf8",
  }).trim();
}

function runScanner() {
  try {
    execSync("node scripts/guardrails/scan-prohibited-patterns.mjs", {
      stdio: "pipe",
    });
    return { passed: true, output: "" };
  } catch (err) {
    return {
      passed: false,
      output: err.stdout?.toString() || err.message,
    };
  }
}

function writeTempFile(relPath, content) {
  const full = path.resolve(relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  return full;
}

function stageFile(relPath) {
  // Stage without committing so `git ls-files` includes it
  execSync(`git add -- "${relPath}"`, { stdio: "ignore" });
}

function unstageFile(relPath) {
  // Remove from index (keep working tree) so we can delete it
  execSync(`git reset -q -- "${relPath}"`, { stdio: "ignore" });
}

function cleanupFile(relPath) {
  try {
    fs.unlinkSync(path.resolve(relPath));
  } catch {}
}

test("E1: detects platform coupling in content/", () => {
  const file = "content/__e1_tmp_test__.mdx";

  // Ensure working tree is usable (helpful debug if this ever fails in CI/local)
  // Do not hard-fail on dirty state; tests will still operate via staging/reset per file.
  try {
    run("git rev-parse --is-inside-work-tree");
  } catch {
    throw new Error("E1 invariants test requires a git working tree.");
  }

  writeTempFile(file, `import x from "scientia-platform";\n`);

  try {
    stageFile(file);

    const result = runScanner();

    assert.strictEqual(
      result.passed,
      false,
      `Scanner should fail when platform coupling appears in content/. Output:\n${result.output}`,
    );
  } finally {
    // Always cleanup index + file even if assertion fails
    try {
      unstageFile(file);
    } catch {}
    cleanupFile(file);
  }
});

test("E1: ignores platform references inside scripts/guardrails/", () => {
  const file = "scripts/guardrails/__e1_tmp_test__.mjs";

  writeTempFile(file, `import x from "scientia-platform";\n`);

  try {
    // Even if staged, scanner must ignore due to scope rules (content/src only)
    stageFile(file);

    const result = runScanner();

    assert.strictEqual(
      result.passed,
      true,
      `Scanner must ignore guardrails implementation files. Output:\n${result.output}`,
    );
  } finally {
    try {
      unstageFile(file);
    } catch {}
    cleanupFile(file);
  }
});

test("E1: ignores platform references inside docs/", () => {
  const file = "docs/__e1_tmp_test__.md";

  writeTempFile(
    file,
    `This references scientia-platform for documentation purposes.\n`,
  );

  try {
    // Even if staged, scanner must ignore due to scope rules (content/src only)
    stageFile(file);

    const result = runScanner();

    assert.strictEqual(
      result.passed,
      true,
      `Scanner must ignore documentation scaffolding. Output:\n${result.output}`,
    );
  } finally {
    try {
      unstageFile(file);
    } catch {}
    cleanupFile(file);
  }
});
