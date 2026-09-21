import test from 'node:test';
import assert from 'node:assert/strict';
import { formEndpoints, postFormSubmission } from '../src/lib/formApi';

test('form submissions reject a successful HTML fallback instead of reporting success', async t => {
  for (const endpoint of Object.values(formEndpoints)) {
    await t.test(endpoint, async () => {
      const oldFetch = globalThis.fetch;
      globalThis.fetch = async () => new Response('<html>Static fallback</html>', {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      });

      try {
        await assert.rejects(postFormSubmission(endpoint, { source: 'controlled-test' }), /receipt was not confirmed/);
      } finally {
        globalThis.fetch = oldFetch;
      }
    });
  }
});

test('contact submissions reject a false JSON acknowledgement', async () => {
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('{"ok":false}', {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  try {
    await assert.rejects(
      postFormSubmission(formEndpoints.contact, { source: 'controlled-test' }),
      /receipt was not confirmed/,
    );
  } finally {
    globalThis.fetch = oldFetch;
  }
});
