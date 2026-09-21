import test from 'node:test';
import assert from 'node:assert/strict';
import { postFormSubmission, formEndpoints } from '../src/lib/formApi';
import { onRequestPost } from '../functions/api/forms/feedback';

test('feedback requires an explicit acknowledgement and preserves the response body', async t => {
  for (const [name, status, type, body, success] of [
    ['acknowledged', 200, 'application/json; charset=utf-8', '{"ok":true}', true],
    ['missing binding', 500, 'application/json', '{"ok":false}', false],
    ['upstream rejected', 502, 'application/json', '{"ok":false}', false],
    ['HTML fallback', 200, 'text/html', '<html>Fallback</html>', false],
    ['negative acknowledgement', 200, 'application/json', '{"ok":false}', false],
    ['missing acknowledgement', 200, 'application/json', '{}', false],
    ['malformed acknowledgement', 200, 'application/json', 'broken', false],
    ['null acknowledgement', 200, 'application/json', 'null', false],
    ['string acknowledgement', 200, 'application/json', '{"ok":"true"}', false],
  ] as const) {
    await t.test(name, async () => {
      const oldFetch = globalThis.fetch;
      globalThis.fetch = async () => new Response(body, { status, headers: { 'Content-Type': type } });
      try {
        const submit = () => postFormSubmission(formEndpoints.feedback, { rating: 3 });
        if (success) assert.deepEqual(await (await submit()).json(), { ok: true });
        else await assert.rejects(submit);
      } finally {
        globalThis.fetch = oldFetch;
      }
    });
  }
});

test('missing feedback binding fails before any upstream call', async () => {
  const oldFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('Unexpected network'); };
  try {
    const response = await onRequestPost({
      request: new Request('https://local.test/api/forms/feedback', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: 3, name: 'Local fixture', email: 'fixture@example.invalid', feedback: 'Mock only' }),
      }),
      env: {},
    });
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { ok: false, error: 'Webhook is not configured' });
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = oldFetch;
  }
});
