import test from 'node:test';
import assert from 'node:assert/strict';
import { analyticsUrl, trackEvent } from '../src/lib/analytics';
import { postFormSubmission, formEndpoints } from '../src/lib/formApi';

test('analytics limits collection to production public routes and campaign labels', () => {
  assert.equal(analyticsUrl('https://preview.pages.dev/'), null);
  assert.equal(analyticsUrl('https://www.truedampspecialists.co.uk/add-customer?name=Tom'), null);
  assert.equal(analyticsUrl('https://www.truedampspecialists.co.uk/unknown-person'), null);
  assert.equal(analyticsUrl('https://truedampspecialists.co.uk/contact/?email=person@example.com&utm_source=google#private'), 'https://truedampspecialists.co.uk/contact/?utm_source=google');
});

test('only successful contact or quote responses emit enquiries, with no payload data', async () => {
  const events: unknown[] = [];
  const oldFetch = globalThis.fetch;
  Object.assign(globalThis, { window: { location: { href: 'https://truedampspecialists.co.uk/contact/' }, plausible: (...args: unknown[]) => events.push(args) } });
  try {
    globalThis.fetch = async () => new Response('', { status: 500 });
    await assert.rejects(postFormSubmission(formEndpoints.contact, { email: 'private@example.com' }));
    assert.equal(events.length, 0);
    globalThis.fetch = async () => new Response('{"ok":true}', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    await postFormSubmission(formEndpoints.feedback, {});
    assert.equal(events.length, 0);
    globalThis.fetch = async () => new Response('<html>Static fallback</html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
    await assert.rejects(postFormSubmission(formEndpoints.contact, { email: 'private@example.com' }));
    assert.equal(events.length, 0);
    globalThis.fetch = async () => new Response('{"ok":true}', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    await postFormSubmission(formEndpoints.contact, { email: 'private@example.com' });
    assert.deepEqual(events, [['Enquiry Submitted', { u: 'https://truedampspecialists.co.uk/contact/' }]]);
    window.plausible = () => { throw new Error('blocked analytics'); };
    await postFormSubmission(formEndpoints.quote, {});
    assert.doesNotThrow(() => trackEvent('Phone Click'));
  } finally {
    globalThis.fetch = oldFetch;
    Reflect.deleteProperty(globalThis, 'window');
  }
});
