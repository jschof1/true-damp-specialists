# True Damp Specialists — Lead Recovery Summary

Checked: 13 July 2026

State: local operational summary only. No callback, message, test submission or CRM mutation was made.

## Current 14-day result

- 2 confirmed enquiry candidates
- 2 matching chat-widget form submissions
- 2 current-window conversations
- 4 unread items
- 1 latest-inbound conversation
- 0 opportunities in the inspected window

Exact contact, conversation and form identifiers stay in the private Work OS task record; they are deliberately not committed to this repository.

## Classification

- The first enquiry is a fresh, detailed request for an independent survey after new cellar moisture/odour and possible water ingress. It has three unread items and should be prioritised.
- The second is a homebuyer seeking a damp survey before purchasing a property. It has one unread item and a missed-call/form signal.
- Both are real service enquiries rather than generic contact noise.

## Website form-route check

- Contact, quote, feedback and discount forms post to separate same-origin Cloudflare Pages endpoints.
- The shared proxy enforces same-origin requests, JSON content type, field allowlists, body-size limits and an upstream timeout.
- Webhook destinations remain server-side environment bindings.
- The two confirmed records in this queue came through the GHL chat widget; they do not by themselves test every same-origin website form.
- No controlled production submission was made.

## Next safe action

The fresh moisture-ingress survey request should be handled first, followed by the homebuyer survey request after checking whether the need is still current. Any UKTL-written reply or callback request must be shown to Jack before sending. No opportunity, tag, DND or contact change should occur without approval.
