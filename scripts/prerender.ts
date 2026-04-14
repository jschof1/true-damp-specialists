import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { indexableRoutes } from "../src/routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist/client");
const serverBundlePath = path.resolve(__dirname, "../dist/server/entry-server.js");

async function run() {
  if (!fs.existsSync(serverBundlePath)) {
    console.error("Server bundle not found. Run 'npm run build:server' first.");
    process.exit(1);
  }

  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
  const { render } = await import(serverBundlePath);

  console.log(`Prerendering ${indexableRoutes.length} routes...`);

  for (const route of indexableRoutes) {
    console.log(`  Prerendering ${route.path}...`);
    const { html: appHtml, helmet } = render(route.path);

    const headTags = [
      helmet.title?.toString(),
      helmet.meta?.toString(),
      helmet.link?.toString(),
      helmet.script?.toString(),
    ].filter(Boolean).join("\n");

    const finalHtml = template
      .replace("<!--ssr-head-->", headTags)
      .replace("<!--ssr-outlet-->", appHtml);

    const outputPath = path.join(distDir, route.outputPath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, finalHtml, "utf-8");
  }

  console.log("Prerendering complete.");
}

run().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
