# Form configuration repair — 1 October 2026

The portfolio audit found missing runtime form bindings. The canonical D1 record and Delivery Track sheet row 27 agree for all four roles. They are restored as server-side secrets without changing native payload fields.

`/api/form-health` verifies all four destinations belong to this client without exposing URLs or forwarding any request. `node --test scripts/test-form-health.mjs` verifies missing and foreign bindings fail closed. Production release must check health and supported routes; a footer render alone cannot verify forms.

No live enquiry or notification test has been submitted. Actual notification delivery remains unverified until Jack authorises a controlled test.
