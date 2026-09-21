import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/forms/contact';

const webhookUrl = 'https://upstream.test/contact';

const makeRequest = (body: string, headers: Record<string, string> = {}) =>
  new Request('https://local.test/api/forms/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body,
  });

const runContactSubmission = (body: string, headers?: Record<string, string>) =>
  onRequestPost({
    request: makeRequest(body, headers),
    env: { FORM_WEBHOOK_URL: webhookUrl },
  });

test('contact proxy forwards the exact ContactPage and Hero payload contracts', async t => {
  const payloads = [
    {
      name: 'ContactPage payload',
      payload: {
        name: 'Controlled QA',
        phone: '+12025550100',
        email: 'contact-test@example.invalid',
        issue: 'condensation',
        previousAdvice: 'A previous contractor advised more ventilation.',
        firstNoticed: 'After recent rain',
        postcode: 'ZZ99 9ZZ',
        source: 'website_contact_page_v3',
      },
    },
    {
      name: 'Hero payload',
      payload: {
        name: 'Controlled QA',
        phone: '+12025550100',
        issue: 'rising-damp',
        issueDescription: 'Damp marks have appeared near the front bay.',
        postcode: 'ZZ99 9ZZ',
        source: 'website_hero_form',
        area: 'South East London',
      },
    },
  ] as const;

  for (const { name, payload } of payloads) {
    await t.test(name, async () => {
      const calls: Array<{ input: RequestInfo | URL; init?: RequestInit }> = [];
      const oldFetch = globalThis.fetch;
      globalThis.fetch = async (input, init) => {
        calls.push({ input, init });
        return new Response('{"accepted":true}', {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      };

      try {
        const response = await runContactSubmission(JSON.stringify(payload));
        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { ok: true });
        assert.equal(calls.length, 1);
        assert.equal(calls[0].input, webhookUrl);
        assert.equal(calls[0].init?.method, 'POST');
        assert.equal(new Headers(calls[0].init?.headers).get('Content-Type'), 'application/json');
        assert.deepEqual(JSON.parse(String(calls[0].init?.body)), payload);
      } finally {
        globalThis.fetch = oldFetch;
      }
    });
  }
});

test('contact proxy reports an unconfigured destination without attempting delivery', async () => {
  let calls = 0;
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    calls++;
    throw new Error('Unexpected upstream call');
  };

  try {
    const response = await onRequestPost({
      request: makeRequest(JSON.stringify({
        name: 'Controlled QA',
        phone: '',
        issue: 'Website capture verification',
        source: 'controlled_test',
      })),
      env: {},
    });

    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { ok: false, error: 'Webhook is not configured' });
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = oldFetch;
  }
});

test('contact proxy still rejects unexpected fields and invalid requests', async t => {
  const cases = [
    {
      name: 'unexpected field',
      request: () =>
        makeRequest(
          JSON.stringify({
            name: 'Controlled QA',
            phone: '+12025550100',
            issueDescription: 'Damp marks near the bay.',
            unexpected: 'do not forward',
          }),
        ),
      status: 400,
      error: 'Unexpected form fields',
    },
    {
      name: 'malformed JSON',
      request: () => makeRequest('{broken'),
      status: 400,
      error: 'Malformed JSON body',
    },
    {
      name: 'invalid origin',
      request: () => makeRequest('{}', { Origin: 'https://attacker.test' }),
      status: 403,
      error: 'Invalid request origin',
    },
    {
      name: 'invalid field value',
      request: () => makeRequest(JSON.stringify({ name: ['not', 'a', 'string'] })),
      status: 400,
      error: 'Invalid form field value',
    },
  ] as const;

  for (const { name, request, status, error } of cases) {
    await t.test(name, async () => {
      const calls: unknown[] = [];
      const oldFetch = globalThis.fetch;
      globalThis.fetch = async () => {
        calls.push(true);
        return new Response('{"accepted":true}', { status: 200 });
      };

      try {
        const response = await onRequestPost({
          request: request(),
          env: { FORM_WEBHOOK_URL: webhookUrl },
        });
        assert.equal(response.status, status);
        assert.deepEqual(await response.json(), { ok: false, error });
        assert.equal(calls.length, 0);
      } finally {
        globalThis.fetch = oldFetch;
      }
    });
  }
});
