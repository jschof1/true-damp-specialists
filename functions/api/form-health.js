const bindings = {
  "main": "FORM_WEBHOOK_URL",
  "quote": "QUOTE_WEBHOOK_URL",
  "negative-review": "FEEDBACK_WEBHOOK_URL",
  "discount": "DISCOUNT_WEBHOOK_URL"
};
const accountId = "P7gAXg3KSOnBNGK0XlYO";
export function isConfigured(value) {
  if (typeof value !== 'string' || !value) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && u.hostname === 'services.leadconnectorhq.com' &&
      !u.port && !u.username && !u.password && !u.search && !u.hash &&
      new RegExp('^/hooks/' + accountId + '/webhook-trigger/[A-Za-z0-9-]+$').test(u.pathname);
  } catch { return false; }
}
export function onRequest({request, env}) {
  if (request.method !== 'GET') return Response.json({ok:false}, {status:405,headers:{'Allow':'GET','Cache-Control':'no-store'}});
  const forms = Object.fromEntries(Object.entries(bindings).map(([role, key]) => [role, isConfigured(env[key])]));
  const ok = Object.values(forms).every(Boolean);
  return Response.json({ok,forms}, {status:ok?200:503,headers:{'Cache-Control':'no-store'}});
}
