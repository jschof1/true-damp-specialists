import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { indexableRoutes } from "../src/routes";
import { siteSettings } from "../src/data/siteSettings";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist/client");

console.log("Verifying SEO build...");

let errors = 0;

const canonicalBase = siteSettings.baseUrl.replace(/\/$/, "");
const expectedCanonicalFor = (routePath: string) =>
  routePath === "/" ? `${canonicalBase}/` : `${canonicalBase}${routePath.startsWith("/") ? routePath : `/${routePath}`}`;

for (const route of indexableRoutes) {
  const filePath = path.join(distDir, route.outputPath);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing HTML file: ${route.outputPath} (path: ${route.path})`);
    errors++;
    continue;
  }

  const html = fs.readFileSync(filePath, "utf-8");
  
  // Normalize HTML for comparison
  const normalizedHtml = html
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

  if (!route.title) {
    console.error(`❌ Missing title in manifest for route: ${route.path}`);
    errors++;
  } else {
    const normalizedTitle = route.title.replace(/\s+/g, " ").toLowerCase();
    if (!normalizedHtml.includes(normalizedTitle)) {
      console.warn(`⚠️ Title might be missing or different in ${route.outputPath}`);
      console.warn(`   Expected: ${normalizedTitle}`);
    }
  }

  if (!route.description) {
    console.error(`❌ Missing description in manifest for route: ${route.path}`);
    errors++;
  } else {
    const normalizedDescription = route.description.replace(/\s+/g, " ").toLowerCase();
    if (!normalizedHtml.includes(normalizedDescription)) {
      console.warn(`⚠️ Description might be missing in ${route.outputPath}`);
      console.warn(`   Expected snippet: ${normalizedDescription.substring(0, 50)}...`);
    }
  }

  const canonicalTags = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi) ?? [];
  const expectedCanonical = expectedCanonicalFor(route.path);
  if (canonicalTags.length !== 1 || !canonicalTags[0].includes(`href="${expectedCanonical}"`)) {
    console.error(`❌ Canonical mismatch in ${route.outputPath}`);
    console.error(`   Expected exactly one canonical pointing to: ${expectedCanonical}`);
    errors++;
  }

  // Check if SSR content was actually injected
  if (html.includes("<!--ssr-outlet-->")) {
    console.error(`❌ SSR outlet comment still present in ${route.outputPath}`);
    errors++;
  }
}

const robotsPath = path.join(distDir, "robots.txt");
if (!fs.existsSync(robotsPath)) {
  console.error("❌ Missing robots.txt in production build");
  errors++;
} else {
  const robots = fs.readFileSync(robotsPath, "utf-8");
  const expectedSitemapLine = `Sitemap: ${canonicalBase}/sitemap.xml`;
  if (!robots.includes(expectedSitemapLine)) {
    console.error(`❌ robots.txt sitemap host mismatch. Expected: ${expectedSitemapLine}`);
    errors++;
  }
}

const sitemapPath = path.join(distDir, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
  console.error("❌ Missing sitemap.xml in production build");
  errors++;
} else {
  const sitemap = fs.readFileSync(sitemapPath, "utf-8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const wrongHostUrls = sitemapUrls.filter((url) => !url.startsWith(`${canonicalBase}/`));
  if (sitemapUrls.length === 0 || wrongHostUrls.length > 0) {
    console.error("❌ sitemap.xml contains missing or non-canonical host URLs");
    for (const url of wrongHostUrls.slice(0, 5)) console.error(`   ${url}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\nSEO verification failed with ${errors} errors.`);
  process.exit(1);
}

console.log("\n✅ SEO verification passed!");
