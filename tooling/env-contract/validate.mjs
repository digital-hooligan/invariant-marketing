#!/usr/bin/env node
/**
 * Environment Contract v1 validator
 *
 * Guarantees:
 * - Never prints secret values (only variable names + reasons).
 * - Enforces required vs optional per tier.
 * - Validates .env.example is canonical and includes all declared vars.
 * - Enforces forbidden vars per surface.
 *
 * Modes:
 *   --mode=check    validates contract + template; does NOT require secrets.
 *   --mode=runtime  validates runtime env for a specific tier.
 *
 * Runtime env loading (mode=runtime only):
 * - Loads from:
 *     1) .env.local (preferred)
 *     2) .env       (fallback)
 *   Then merges with process.env (process.env wins).
 *
 * It prints ONLY which env files were loaded (filenames only).
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTRACT_PATH = path.join(ROOT, "env.contract.json");
const ENV_EXAMPLE_PATH = path.join(ROOT, ".env.example");
const ENV_LOCAL_PATH = path.join(ROOT, ".env.local");
const ENV_PATH = path.join(ROOT, ".env");

function die(code, lines) {
  for (const line of lines) console.error(line);
  process.exit(code);
}

function parseArgs(argv) {
  const args = {};
  for (const a of argv.slice(2)) {
    if (!a.startsWith("--")) continue;
    const [k, v] = a.slice(2).split("=");
    args[k] = v === undefined ? "true" : v;
  }
  return args;
}

function isKebabCase(s) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
}
function isIso8601(s) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(s);
}
function looksSemver(s) {
  return /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(s);
}
function parseJsonValue(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
function toRegexFromWildcard(pattern) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`);
}
function stripQuotes(v) {
  const s = v.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1);
  return s;
}
function parseEnvFile(content) {
  const out = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (!/^[A-Z0-9_]+$/.test(key)) continue;
    const value = stripQuotes(line.slice(eq + 1));
    out[key] = value;
  }
  return out;
}
function loadRuntimeEnvFromFiles() {
  const merged = {};
  const loaded = [];

  if (fs.existsSync(ENV_LOCAL_PATH)) {
    Object.assign(merged, parseEnvFile(fs.readFileSync(ENV_LOCAL_PATH, "utf8")));
    loaded.push(".env.local");
  }
  if (fs.existsSync(ENV_PATH)) {
    Object.assign(merged, parseEnvFile(fs.readFileSync(ENV_PATH, "utf8")));
    loaded.push(".env");
  }
  return { merged, loaded };
}

function loadContract() {
  if (!fs.existsSync(CONTRACT_PATH)) die(2, ["ENV_CONTRACT_MISSING: env.contract.json not found at repo root"]);
  let raw = "";
  try {
    raw = fs.readFileSync(CONTRACT_PATH, "utf8");
  } catch {
    die(2, ["ENV_CONTRACT_READ_FAIL: could not read env.contract.json"]);
  }
  try {
    return JSON.parse(raw);
  } catch {
    die(2, ["ENV_CONTRACT_PARSE_FAIL: env.contract.json is not valid JSON"]);
  }
}

function normalizeVars(contract) {
  const required = contract.required || {};
  const optional = contract.optional || {};
  const all = new Map();
  for (const [name, meta] of Object.entries(required)) all.set(name, { ...meta, kind: "required" });
  for (const [name, meta] of Object.entries(optional)) all.set(name, { ...meta, kind: "optional" });
  return { required, optional, all };
}

function validateContractShape(contract) {
  const errors = [];
  if (!contract || typeof contract !== "object") errors.push("ENV_CONTRACT_INVALID: root must be object");
  if (contract.surface !== "S1" && contract.surface !== "S2" && contract.surface !== "S3") {
    errors.push("ENV_CONTRACT_INVALID: surface must be S1|S2|S3");
  }
  if (!contract.required || typeof contract.required !== "object") errors.push("ENV_CONTRACT_INVALID: required must be object");
  if (!contract.optional || typeof contract.optional !== "object") errors.push("ENV_CONTRACT_INVALID: optional must be object");
  if (!Array.isArray(contract.forbidden)) errors.push("ENV_CONTRACT_INVALID: forbidden must be array");

  const { all } = normalizeVars(contract);
  for (const [name, meta] of all.entries()) {
    if (!/^[A-Z0-9_]+$/.test(name)) errors.push(`ENV_CONTRACT_INVALID_VAR_NAME: ${name}`);
    if (!meta || typeof meta !== "object") {
      errors.push(`ENV_CONTRACT_INVALID_META: ${name}`);
      continue;
    }
    if (!Array.isArray(meta.tiers) || meta.tiers.length === 0) errors.push(`ENV_CONTRACT_INVALID_TIERS: ${name}`);
    else {
      for (const t of meta.tiers) {
        if (t !== "local" && t !== "preview" && t !== "production") {
          errors.push(`ENV_CONTRACT_INVALID_TIER: ${name} has invalid tier ${t}`);
        }
      }
    }
    if (typeof meta.secret !== "boolean") errors.push(`ENV_CONTRACT_INVALID_SECRET_FLAG: ${name}`);
    if (typeof meta.type !== "string") errors.push(`ENV_CONTRACT_INVALID_TYPE: ${name}`);
  }
  if (errors.length) die(2, errors);
}

function readEnvExampleVars() {
  if (!fs.existsSync(ENV_EXAMPLE_PATH)) die(2, ["ENV_TEMPLATE_MISSING: .env.example not found at repo root"]);
  const content = fs.readFileSync(ENV_EXAMPLE_PATH, "utf8");
  const names = new Set();
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const m = /^([A-Z0-9_]+)=/.exec(trimmed);
    if (m) names.add(m[1]);
  }
  return { content, names };
}

function validateEnvExample(contract) {
  const { required, optional } = normalizeVars(contract);
  const { content, names } = readEnvExampleVars();
  const errors = [];

  for (const v of Object.keys(required)) if (!names.has(v)) errors.push(`ENV_TEMPLATE_MISSING_REQUIRED_VAR: ${v}`);
  for (const v of Object.keys(optional)) if (!names.has(v)) errors.push(`ENV_TEMPLATE_MISSING_OPTIONAL_VAR: ${v}`);

  const all = { ...required, ...optional };
  for (const [name, meta] of Object.entries(all)) {
    if (!meta.secret) continue;
    const re = new RegExp(`^${name}=(.*)$`, "m");
    const m = content.match(re);
    if (!m) continue;
    const val = (m[1] ?? "").trim();
    if (!val) continue;

    const ok = val === "__SET_IN_SECRET_STORE__" || val === "__REPLACE_ME__" || val === "__SECRET__" || val === "disabled";
    if (!ok) errors.push(`ENV_TEMPLATE_SECRET_MUST_BE_PLACEHOLDER_OR_EMPTY: ${name}`);
  }

  if (errors.length) die(2, errors);
}

function validateForbidden(contract, envObj, contextLabel) {
  const forbidden = contract.forbidden || [];
  if (!forbidden.length) return;

  const patterns = forbidden.map((p) => ({ p, re: toRegexFromWildcard(p) }));
  const found = [];
  for (const key of Object.keys(envObj)) {
    for (const { p, re } of patterns) {
      if (re.test(key)) {
        found.push({ key, pattern: p });
        break;
      }
    }
  }
  if (found.length) {
    die(2, [
      `ENV_CONTRACT_FORBIDDEN_VAR: Forbidden variables detected (${contextLabel}).`,
      ...found.map((f) => `- ${f.key} (matched: ${f.pattern})`)
    ]);
  }
}

function validateType(name, val, meta) {
  if (meta.validation === "kebab-case" && !isKebabCase(val)) return `ENV_CONTRACT_INVALID_VALUE: ${name} must be kebab-case`;
  if (meta.validation === "iso-8601" && !isIso8601(val)) return `ENV_CONTRACT_INVALID_VALUE: ${name} must be ISO-8601 (e.g. 2026-02-20T16:33:00Z)`;
  if (meta.validation === "semver" && !looksSemver(val)) return `ENV_CONTRACT_INVALID_VALUE: ${name} must look like semver (e.g. 1.2.3)`;
  if (meta.validation === "non-empty" && !val) return `ENV_CONTRACT_INVALID_VALUE: ${name} must be non-empty`;

  switch (meta.type) {
    case "url":
      try {
        // eslint-disable-next-line no-new
        new URL(val);
        return null;
      } catch {
        return `ENV_CONTRACT_INVALID_TYPE: ${name} expected url`;
      }
    case "enum": {
      const allowed = (meta.validation || "").split("|").filter(Boolean);
      if (allowed.length && !allowed.includes(val)) return `ENV_CONTRACT_INVALID_VALUE: ${name} must be one of ${allowed.join(", ")}`;
      return null;
    }
    case "boolean":
      if (val !== "true" && val !== "false") return `ENV_CONTRACT_INVALID_TYPE: ${name} expected boolean (true|false)`;
      return null;
    case "json": {
      const parsed = parseJsonValue(val);
      if (parsed === null || typeof parsed !== "object") return `ENV_CONTRACT_INVALID_TYPE: ${name} expected json object`;
      return null;
    }
    default:
      return null;
  }
}

function validateRuntime(contract, tier, envObj, loadedFiles) {
  const { required, optional } = normalizeVars(contract);
  const errors = [];

  validateForbidden(contract, envObj, `runtime env (tier=${tier})`);

  for (const [name, meta] of Object.entries(required)) {
    if (!meta.tiers.includes(tier)) continue;
    const val = (envObj[name] ?? "").toString().trim();
    if (!val) errors.push(`ENV_CONTRACT_MISSING_REQUIRED: ${name} (tier=${tier})`);
    else {
      const err = validateType(name, val, meta);
      if (err) errors.push(err);
    }
  }

  for (const [name, meta] of Object.entries(optional)) {
    if (!meta.tiers.includes(tier)) continue;
    const raw = envObj[name];
    if (raw === undefined || raw === null || raw === "") continue;
    const val = raw.toString().trim();
    const err = validateType(name, val, meta);
    if (err) errors.push(err);
  }

  if (errors.length) {
    if ((loadedFiles?.length ?? 0) === 0) {
      errors.unshift(
        "ENV_RUNTIME_NO_ENV_FILE: No .env.local or .env found for runtime validation.",
        "ACTION: cp .env.example .env.local (then re-run) OR export required vars in your shell."
      );
    }
    die(2, errors);
  }
}

function resolveTier(args) {
  const tier = args.tier || "";
  if (tier === "local" || tier === "preview" || tier === "production") return tier;
  return null;
}

function main() {
  const args = parseArgs(process.argv);
  const mode = args.mode || "check";

  const contract = loadContract();
  validateContractShape(contract);
  validateEnvExample(contract);

  const { names } = readEnvExampleVars();
  const templateEnv = {};
  for (const n of names) templateEnv[n] = "PRESENT";
  validateForbidden(contract, templateEnv, ".env.example");

  if (mode === "runtime") {
    const tier = resolveTier(args);
    if (!tier) die(2, ["ENV_CONTRACT_RUNTIME_REQUIRES_TIER: use --tier=local|preview|production"]);

    const { merged, loaded } = loadRuntimeEnvFromFiles();
    console.error(`ENV_RUNTIME_LOADED_FILES: ${loaded.length ? loaded.join(", ") : "(none)"}`);

    const runtimeEnv = { ...merged, ...process.env }; // process.env wins
    validateRuntime(contract, tier, runtimeEnv, loaded);
  }
}

main();
