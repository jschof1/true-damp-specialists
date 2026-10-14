import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isConfigured } from '../functions/api/form-health.js';

export const PROJECT = 'true-damp-specialists';
export const ACCOUNT = '1d7541992ccacf0931ee0e385daa5e08';
export const BINDINGS = Object.freeze([
  'FORM_WEBHOOK_URL', 'QUOTE_WEBHOOK_URL',
  'FEEDBACK_WEBHOOK_URL', 'DISCOUNT_WEBHOOK_URL',
]);

export function validate(project, env) {
  if (project !== PROJECT) throw new Error('Explicit True Damp project required. No writes performed.');
  if (env.CLOUDFLARE_ACCOUNT_ID !== ACCOUNT) throw new Error('Verified True Damp Cloudflare account required. No writes performed.');
  const values = {};
  for (const name of BINDINGS) {
    const value = env[name];
    // Reject whitespace, URL normalization tricks and inert sample values.
    if (typeof value !== 'string' || value !== value.trim() || !isConfigured(value) ||
        new URL(value).href !== value || /(?:example|placeholder|replace[-_]?me|<|>)/i.test(value)) {
      throw new Error(`Invalid or missing ${name}. No writes performed.`);
    }
    values[name] = value;
  }
  if (new Set(Object.values(values)).size !== BINDINGS.length) {
    throw new Error('Distinct role-specific destinations required. No writes performed.');
  }
  return values;
}

export async function verifyProject(env, fetcher = fetch) {
  if (!env.CLOUDFLARE_API_TOKEN) throw new Error('A scoped Cloudflare API token is required for target verification. No writes performed.');
  try {
    const response = await fetcher(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/pages/projects/${PROJECT}`, {
      headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` },
      redirect: 'error', signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error('Provider refused target verification.');
    const body = await response.json();
    if (!body.success || body.result?.name !== PROJECT ||
        !body.result.domains?.includes('truedampspecialists.co.uk')) {
      throw new Error('Provider project/domain mismatch.');
    }
  } catch {
    // Provider errors can contain credentials or private account details.
    throw new Error('Could not verify the True Damp project and production domain. No writes performed.');
  }
}

export async function run(args, env = process.env, dependencies = {}) {
  const log = dependencies.log || console.log;
  const error = dependencies.error || console.error;
  const spawn = dependencies.spawn || spawnSync;
  try {
    if (args.length !== 2 || !['--check', '--apply'].includes(args[1])) {
      throw new Error('Usage: scripts/set-webhook-secrets.sh true-damp-specialists --check|--apply');
    }
    const values = validate(args[0], env);
    if (args[1] === '--check') {
      log('All four destinations pass local scope validation. No network calls or writes performed. Workflow roles and delivery still require verification.');
      return 0;
    }
    if (env.TRUE_DAMP_WEBHOOK_CHANGE_APPROVED !== 'yes') {
      throw new Error('Explicit approved-change flag required for --apply. No writes performed.');
    }
    await verifyProject(env, dependencies.fetch || fetch);
    const childEnv = { ...env, CLOUDFLARE_ACCOUNT_ID: ACCOUNT, WRANGLER_SEND_METRICS: 'false' };
    for (const name of BINDINGS) delete childEnv[name];
    delete childEnv.TRUE_DAMP_WEBHOOK_CHANGE_APPROVED;
    // Do not allow debug/tracing to expose stdin values in provider diagnostics.
    delete childEnv.WRANGLER_LOG;
    let completed = 0;
    for (const name of BINDINGS) {
      let result;
      try {
        result = spawn('wrangler', ['pages', 'secret', 'put', name, '--project-name', PROJECT], {
          input: `${values[name]}\n`, env: childEnv, encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'pipe'], timeout: 60000,
        });
      } catch {
        result = null;
      }
      if (!result || result.error || result.status !== 0) {
        error(`Update stopped at ${name}; ${completed} preceding write(s) were acknowledged. The failing write may be indeterminate. Verify provider state before retrying; no rollback was attempted.`);
        return 1;
      }
      completed += 1;
    }
    log('Provider acknowledged all four secret updates. Deployment, form health, workflow roles and owner notification remain unverified.');
    return 0;
  } catch (cause) {
    error(cause.message);
    return 1;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = await run(process.argv.slice(2));
}
