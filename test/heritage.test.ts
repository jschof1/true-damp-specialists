import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { services, getServiceBySlug } from "../src/data/services";
import { routes, indexableRoutes } from "../src/routes";
import { siteSettings } from "../src/data/siteSettings";
import content from "../data/content.json";

const slug = "heritage-traditional-buildings";
const routePath = "/services/" + slug;
const canonical = siteSettings.baseUrl + routePath;
const service = getServiceBySlug(slug)!;

test("heritage cards resolve to one indexable service route, preserving pre-purchase", () => {
  assert.equal(services.filter(item => item.slug === slug).length, 1);
  const route = routes.filter(item => item.path === routePath);
  assert.equal(route.length, 1);
  assert.ok(indexableRoutes.includes(route[0]));
  for (const cards of [content.services.items, content.servicesPage.serviceCards]) {
    const heritage = cards.filter(card => card.title === "Heritage & Traditional Buildings");
    assert.equal(heritage.length, 1);
    assert.equal(heritage[0].slug, slug);
    assert.ok(cards.some(card => card.slug === "pre-purchase-investigations"));
  }
  assert.ok(getServiceBySlug("pre-purchase-investigations"));
  for (const related of service.relatedServices) assert.ok(getServiceBySlug(related), related);
});

test("built heritage route contains complete service, one canonical and matching social metadata", () => {
  const html = readFileSync("dist/client/services/" + slug + "/index.html", "utf8");
  const plain = html.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
  assert.equal((html.match(/<link\b[^>]*rel="canonical"[^>]*>/g) || []).length, 1);
  assert.ok(html.includes('href="' + canonical + '"'));
  assert.ok(plain.includes("<title data-rh=\"true\">" + service.metaTitle + "</title>"));
  for (const key of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
    const tag = html.match(new RegExp("<meta\\b[^>]*" + key + "[^>]*>"));
    assert.ok(tag, key);
    assert.ok(tag[0].replace(/&amp;/g, "&").includes(service.metaDescription), key);
  }
  assert.ok(html.includes('property="og:url" content="' + canonical + '"'));
  assert.ok(plain.includes("<h1") && plain.includes(service.title));
  for (const paragraph of service.fullDescription) assert.ok(plain.includes(paragraph), paragraph);
  for (const feature of service.features) assert.ok(plain.includes(feature), feature);
  for (const faq of service.faqs) assert.ok(plain.includes(faq.question), faq.question);
  assert.ok(html.includes('href="/contact"'));
  assert.ok(html.includes('href="tel:'));
  const sitemap = readFileSync("dist/client/sitemap.xml", "utf8");
  assert.equal(sitemap.split("<loc>" + canonical + "</loc>").length - 1, 1);
  assert.ok(sitemap.includes("/services/pre-purchase-investigations</loc>"));
  for (const page of ["index.html", "services/index.html"]) {
    const cards = readFileSync("dist/client/" + page, "utf8");
    assert.ok(cards.includes('href="' + routePath + '"'), page);
    assert.ok(cards.includes('href="/services/pre-purchase-investigations"'), page);
  }
});
