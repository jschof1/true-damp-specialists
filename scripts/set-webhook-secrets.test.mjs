import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { run, BINDINGS, PROJECT, ACCOUNT } from './set-webhook-secrets.mjs';

// Synthetic trigger values only; all transport and Wrangler calls are mocked.
function environment() {
  return {
    CLOUDFLARE_ACCOUNT_ID: ACCOUNT, CLOUDFLARE_API_TOKEN: 'synthetic-token',
    TRUE_DAMP_WEBHOOK_CHANGE_APPROVED: 'yes',
    ...Object.fromEntries(BINDINGS.map((key, index) => [key,
      `https://services.leadconnectorhq.com/hooks/P7gAXg3KSOnBNGK0XlYO/webhook-trigger/synthetic-${index}`])),
  };
}
async function execute(env = environment(), args = [PROJECT, '--apply'], overrides = {}) {
  const writes = []; const reads = []; const output = [];
  const result = await run(args, env, {
    log: text => output.push(text), error: text => output.push(text),
    fetch: async (...args) => {
      reads.push(args);
      if (overrides.readError) throw new Error('synthetic-token private error');
      return {ok: !overrides.httpError, json: async () => ({success: true,
        result: {name: overrides.project || PROJECT, domains: [overrides.domain || 'truedampspecialists.co.uk']}})};
    },
    spawn: (...args) => {
      writes.push(args);
      if (overrides.throwAt === writes.length) throw new Error('synthetic-token');
      return {status: overrides.failAt === writes.length ? 1 : 0,
        stdout: 'synthetic-token', stderr: 'synthetic-token'};
    },
  });
  return {result, writes, reads, output: output.join('\n')};
}
function assertNoWrites(result) {
  assert.equal(result.result, 1); assert.equal(result.writes.length, 0);
}
for (const [name, change] of [
  ['wrong Cloudflare account', e => {e.CLOUDFLARE_ACCOUNT_ID = 'different-account';}],
  ['missing first binding', e => {delete e.FORM_WEBHOOK_URL;}],
  ['missing fourth binding', e => {delete e.DISCOUNT_WEBHOOK_URL;}],
  ['wrong client scope', e => {e.DISCOUNT_WEBHOOK_URL = e.DISCOUNT_WEBHOOK_URL.replace('P7gAXg3KSOnBNGK0XlYO', 'synthetic-other-client');}],
  ['query string', e => {e.FORM_WEBHOOK_URL += '?s=1';}],
  ['fragment', e => {e.FORM_WEBHOOK_URL += '#s';}],
  ['whitespace', e => {e.FORM_WEBHOOK_URL = ' ' + e.FORM_WEBHOOK_URL;}],
  ['credentials', e => {e.FORM_WEBHOOK_URL = e.FORM_WEBHOOK_URL.replace('https://', 'https://user:pass@');}],
  ['wrong host', e => {e.FORM_WEBHOOK_URL = e.FORM_WEBHOOK_URL.replace('services.leadconnectorhq.com', 'invalid.test');}],
  ['HTTP', e => {e.FORM_WEBHOOK_URL = e.FORM_WEBHOOK_URL.replace('https:', 'http:');}],
  ['inert placeholder', e => {e.FORM_WEBHOOK_URL = e.FORM_WEBHOOK_URL.replace('synthetic-0', 'replace-me');}],
  ['duplicate roles', e => {e.QUOTE_WEBHOOK_URL = e.FORM_WEBHOOK_URL;}],
  ['missing approval', e => {delete e.TRUE_DAMP_WEBHOOK_CHANGE_APPROVED;}],
]) {
  test(name + ' fails before network or writes', async () => {
    const env = environment(); change(env); const result = await execute(env);
    assertNoWrites(result); assert.equal(result.reads.length, 0);
    assert.ok(!result.output.includes('https://')); assert.ok(!result.output.includes('synthetic-token'));
  });
}
test('wrong target and unsupported flags cannot invoke Wrangler', async () => {
  for (const args of [[], ['other-project', '--apply'], [PROJECT, '--force'], [PROJECT, '--apply', '--force']]) {
    assertNoWrites(await execute(environment(), args));
  }
});
test('check is non-mutating and makes no network request', async () => {
  const result = await execute(environment(), [PROJECT, '--check']);
  assert.equal(result.result, 0); assert.equal(result.writes.length, 0); assert.equal(result.reads.length, 0);
});
for (const override of [{project: 'different-project'}, {domain: 'invalid.test'}, {httpError: true}, {readError: true}]) {
  test('provider mismatch or read failure stops all writes: ' + JSON.stringify(override), async () => {
    const result = await execute(environment(), [PROJECT, '--apply'], override);
    assertNoWrites(result); assert.ok(!result.output.includes('synthetic-token'));
  });
}
test('correct scope sends four roles using stdin, never command arguments', async () => {
  const env = environment(); const result = await execute(env);
  assert.equal(result.result, 0); assert.equal(result.reads.length, 1); assert.equal(result.writes.length, 4);
  result.writes.forEach(([command, args, options], index) => {
    assert.equal(command, 'wrangler'); assert.equal(args[3], BINDINGS[index]);
    assert.deepEqual(args.slice(-2), ['--project-name', PROJECT]);
    assert.equal(options.input, env[BINDINGS[index]] + '\n');
    assert.equal(options.env.CLOUDFLARE_ACCOUNT_ID, ACCOUNT);
    for (const key of BINDINGS) assert.equal(options.env[key], undefined);
    assert.ok(!args.join(' ').includes('https://')); assert.ok(!result.output.includes(env[BINDINGS[index]]));
  });
  assert.ok(!result.output.includes('synthetic-token'));
  assert.match(result.output, /remain unverified/);
});
for (const failure of [{failAt: 3}, {throwAt: 3}]) {
  test('partial failure is redacted and never announces completion: ' + JSON.stringify(failure), async () => {
    const result = await execute(environment(), [PROJECT, '--apply'], failure);
    assert.equal(result.result, 1); assert.equal(result.writes.length, 3);
    assert.match(result.output, /2 preceding write/); assert.match(result.output, /indeterminate/);
    assert.doesNotMatch(result.output, /acknowledged all four|synthetic-token/);
  });
}
test('example configuration has no usable endpoints', () => {
  const example = readFileSync(new URL('../.dev.vars.example', import.meta.url), 'utf8');
  assert.doesNotMatch(example, /https?:\/\/|webhook-trigger/);
  for (const key of BINDINGS) assert.ok(example.includes(key + '=\n'));
});
