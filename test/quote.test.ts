import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/forms/quote';

test('quote delivery preserves all fields and rebuilds summaries from validated fields', async () => {
  const native = {name:'Mapping only',phone:'',email:'',postcode:'',service:'investigation',urgency:'planning',propertyType:'house',description:'Previous advice\nSecond line',source:'website_quote_form'};
  const originalFetch = globalThis.fetch;
  let sent: Record<string, unknown> = {};
  globalThis.fetch = async (url, init) => {
    assert.equal(url, 'https://upstream.test/quote');
    sent = JSON.parse(String(init?.body));
    return new Response('{}');
  };
  try {
    const response = await onRequestPost({request:new Request('https://local.test/api/forms/quote', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...native,summary:{malicious:'ignore'},summaryText:'ignore'})}),env:{QUOTE_WEBHOOK_URL:'https://upstream.test/quote'}});
    assert.equal(response.status,200);
    const {summary, summaryText, ...fields} = sent;
    assert.deepEqual(fields,native);
    assert.deepEqual(summary,native);
    assert.match(String(summaryText),/description: Previous advice\nSecond line/);
    assert.doesNotMatch(String(summaryText),/ignore|malicious/);
  } finally { globalThis.fetch = originalFetch; }
});
