import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/api/form-health.js';
const bindings = {
  "main": "FORM_WEBHOOK_URL",
  "quote": "QUOTE_WEBHOOK_URL",
  "negative-review": "FEEDBACK_WEBHOOK_URL",
  "discount": "DISCOUNT_WEBHOOK_URL"
};
const url = 'https://services.leadconnectorhq.com/hooks/' + "P7gAXg3KSOnBNGK0XlYO" + '/webhook-trigger/not-a-real-webhook';
const env = Object.fromEntries(Object.values(bindings).map(key=>[key,url]));
const request = new Request('https://example.test/api/form-health');
test('health verification never calls a provider and exposes no destinations',async()=>{
 const fetch=globalThis.fetch;globalThis.fetch=()=>{throw Error('Health must not call a provider')};
 try {const r=onRequest({request,env});assert.equal(r.status,200);const data=await r.json();assert.equal(data.ok,true);assert.deepEqual(Object.keys(data.forms).sort(),Object.keys(bindings).sort());assert(!JSON.stringify(data).includes(url));}finally{globalThis.fetch=fetch}
});
for(const [role,key]of Object.entries(bindings)) test('missing '+role+' binding fails closed',async()=>{
 const incomplete={...env};delete incomplete[key];const r=onRequest({request,env:incomplete});assert.equal(r.status,503);const data=await r.json();assert.equal(data.ok,false);assert.equal(data.forms[role],false);
});
test('another client account cannot satisfy the check',()=>assert.equal(onRequest({request,env:Object.fromEntries(Object.values(bindings).map(key=>[key,url.replace('/hooks/', '/hooks/other-')]))}).status,503));
test('only GET is supported',()=>assert.equal(onRequest({request:new Request(request.url,{method:'POST'}),env}).status,405));
