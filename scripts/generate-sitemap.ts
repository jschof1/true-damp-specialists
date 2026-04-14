import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { indexableRoutes } from "../src/routes";
import { siteSettings } from "../src/data/siteSettings";

const toAbsoluteUrl = (path: string) => {
  const baseUrl = siteSettings.baseUrl.replace(/\/$/, "");
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

const lastmod = new Date().toISOString().split("T")[0];

const blogIndexPath = resolve(
  fileURLToPath(import.meta.url),
  "../..",
  "public/content/blog-index.json"
);

const blogRoutes = existsSync(blogIndexPath)
  ? (JSON.parse(readFileSync(blogIndexPath, "utf-8")) as Array<{ slug: string; date: string }>).map(
      (post) => ({
        path: `/blog/${post.slug}`,
        changefreq: "monthly" as const,
        priority: 0.6,
      })
    )
  : [];

const allPages = [...indexableRoutes];


const urlset = allPages
  .map((entry) => {
    return [
      "  <url>",
      `    <loc>${toAbsoluteUrl(entry.path)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq || "monthly"}</changefreq>`,
      `    <priority>${(entry.priority || 0.5).toFixed(1)}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlset,
  "</urlset>",
  "",
].join("\n");

const currentDir = resolve(fileURLToPath(import.meta.url), "..");
const outputPath = resolve(currentDir, "..", "public", "sitemap.xml");

writeFileSync(outputPath, sitemap, "utf8");

console.log(`Sitemap generated at ${outputPath}`);
