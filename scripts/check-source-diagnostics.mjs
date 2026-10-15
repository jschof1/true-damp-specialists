import assert from "node:assert/strict";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const baseline = path.resolve(process.argv[2]);
const candidate = process.cwd();
function run(root, args) {
  const result = spawnSync(process.execPath, args, { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (result.error) throw result.error;
  assert.ok([0, 1, 2].includes(result.status), "Unexpected tool failure: " + result.stderr);
  return result;
}
function types(root) {
  const result = run(root, [path.join(candidate, "node_modules/typescript/bin/tsc"), "-p", "tsconfig.app.json", "--noEmit", "--pretty", "false"]);
  const errors = result.stdout.split("\n").map(line => line.trim()).filter(line => /error TS\d+:/.test(line));
  assert.ok(result.status === 0 || errors.length > 0, result.stdout + result.stderr);
  return errors;
}
function lint(root) {
  const result = run(root, [path.join(candidate, "node_modules/eslint/bin/eslint.js"), ".", "--format", "json"]);
  const files = JSON.parse(result.stdout);
  const errors = files.flatMap(file => file.messages.filter(message => message.severity === 2).map(message =>
    JSON.stringify({ file: path.relative(root, file.filePath), line: message.line, column: message.column, rule: message.ruleId, message: message.message })));
  return { errors, warnings: files.reduce((sum, file) => sum + file.warningCount, 0) };
}
const baselineTypes = types(baseline);
const candidateTypes = types(candidate);
const baselineLint = lint(baseline);
const candidateLint = lint(candidate);
const addedTypes = candidateTypes.filter(error => !baselineTypes.includes(error));
const addedLint = candidateLint.errors.filter(error => !baselineLint.errors.includes(error));
console.log(JSON.stringify({
  baselineTypes, candidateTypes,
  baselineLint: baselineLint.errors.map(value => JSON.parse(value)),
  candidateLint: candidateLint.errors.map(value => JSON.parse(value)),
  baselineWarnings: baselineLint.warnings, candidateWarnings: candidateLint.warnings,
  addedTypes, addedLint,
}, null, 2));
assert.deepEqual(addedTypes, [], "No new app type diagnostics");
assert.deepEqual(addedLint, [], "No new lint errors");
