import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { indexableRoutes } from "../src/routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist/client");

console.log("Verifying SEO build...");

let errors = 0;

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

  // Check if SSR content was actually injected
  if (html.includes("<!--ssr-outlet-->")) {
    console.error(`❌ SSR outlet comment still present in ${route.outputPath}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\nSEO verification failed with ${errors} errors.`);
  process.exit(1);
}

console.log("\n✅ SEO verification passed!");
