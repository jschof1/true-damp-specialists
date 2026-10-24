import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const contact = readFileSync(new URL('../src/pages/ContactPage.tsx', import.meta.url), 'utf8');
const reviews = JSON.parse(readFileSync(new URL('../src/data/reviews.json', import.meta.url), 'utf8'));

test('contact page sources testimonials only from verified public review records', () => {
  assert.match(contact, /reviews\.filter\(\(review\) => review\.verified\)\.slice\(0, 3\)/);
  assert.ok(reviews.filter((review) => review.verified).length >= 3);
  assert.match(contact, /\{review\.name\} · \{review\.location\}/);
  assert.match(contact, /href=\{siteSettings\.googlePageUrl\}/);
});
test('unattributed invented-sounding testimonial strings are absent from contact page', () => {
  for (const text of [
    'They explained the damp problem properly',
    'Finally someone who looked at ventilation',
    'We needed an independent second opinion before spending',
  ]) assert.equal(contact.includes(text), false, text);
});
