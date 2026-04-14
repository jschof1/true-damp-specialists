import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const BLOG_DIR = join(process.cwd(), "public/content/blog");
const OUTPUT_FILE = join(process.cwd(), "public/content/blog-index.json");

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  coverImage: string;
  excerpt: string;
  tags: string[];
  body: string;
}

function generateBlogIndex() {
  if (!existsSync(BLOG_DIR)) {
    mkdirSync(BLOG_DIR, { recursive: true });
    writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    console.log("Blog directory created. No posts yet.");
    return;
  }

  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts: Post[] = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = readFileSync(join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        category: data.category ?? "General",
        author: data.author ?? "Total Wraps & Tints",
        coverImage: data.coverImage ?? "",
        excerpt: data.excerpt ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        body: content.trim(),
      } satisfies Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const outputDir = join(process.cwd(), "public/content");
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

  writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`✓ Blog index: ${posts.length} posts (with body) → public/content/blog-index.json`);
}

generateBlogIndex();
