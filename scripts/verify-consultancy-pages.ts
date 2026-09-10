import assert from "node:assert/strict";
import fs from "node:fs";
import { services } from "../src/data/services";

for (const slug of ["commercial-damp-surveys", "ferro-reinforcement-scanning"]) {
  const service = services.find((item) => item.slug === slug)!;
  const html = fs.readFileSync(`dist/client/services/${slug}/index.html`, "utf8");
  const normalized = html.replace(/&amp;/g, "&");
  assert.match(normalized, new RegExp(`<h1[^>]*>${service.title}</h1>`));
  assert.ok(normalized.includes(service.metaDescription));
  assert.ok(normalized.includes(`https://www.truedampspecialists.co.uk/services/${slug}`));
  assert.ok(fs.readFileSync("dist/client/sitemap.xml", "utf8").includes(`/services/${slug}`));
}
const feedback = fs.readFileSync("dist/client/feedback/index.html", "utf8");
assert.ok(feedback.includes("Leave an honest Google review"));
assert.ok(feedback.includes("https://g.page/r/CU-GUEpjknolEBM/review"));
assert.ok(!fs.readFileSync("src/pages/FeedbackPage.tsx", "utf8").includes("rating === 5"));
console.log("Consultancy routes, canonical metadata, sitemap and ungated review link verified.");
