export interface PostMeta {
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

export interface Post extends PostMeta {
  readingTime: number;
}

export const BLOG_CATEGORIES = [
  "All",
  "Kitchen",
  "Wrapping",
  "Window Tinting",
  "Tips",
  "Commercial",
  "News",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
