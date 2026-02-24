import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const SCANNER = path.join(
  ROOT,
  "scripts/guardrails/scan-prohibited-patterns.mjs",
);
const FIXTURES = path.join(ROOT, "scripts/guardrails/tests/fixtures");

function runScanner() {
  try {
    execFileSync("node", [SCANNER], {
      cwd: ROOT,
      env: { ...process.env, GUARDRAILS_E1_INCLUDE_UNTRACKED: "1" }, // include untracked fixture files
      stdio: "pipe",
    });
    return { ok: true, out: "" };
  } catch (e) {
    const out =
      (e.stdout?.toString?.("utf8") ?? "") +
      (e.stderr?.toString?.("utf8") ?? "");
    return { ok: false, out };
  }
}

test("E1: detects platform coupling references", () => {
  fs.mkdirSync(FIXTURES, { recursive: true });
  const f = path.join(FIXTURES, "cross-repo.fixture.ts");
  fs.writeFileSync(f, `import x from "scientia-platform";\n`, "utf8");

  const res = runScanner();
  assert.equal(res.ok, false);
  assert.match(res.out, /Platform coupling/i);

  fs.unlinkSync(f);
});

test("E1: detects authority-collapse phrases in docs/content", () => {
  const fauxDir = path.join(ROOT, "docs/__guardrails_test__");
  fs.mkdirSync(fauxDir, { recursive: true });
  const f = path.join(fauxDir, "authority.fixture.md");
  fs.writeFileSync(f, `Scientia recommends that you should do X.\n`, "utf8");

  const res = runScanner();
  assert.equal(res.ok, false);
  assert.match(res.out, /Authority-collapse marketing phrase/i);

  fs.unlinkSync(f);
  try {
    fs.rmdirSync(fauxDir);
  } catch {}
});
