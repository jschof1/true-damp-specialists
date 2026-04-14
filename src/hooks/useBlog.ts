import { useState, useEffect } from "react";
import type { PostMeta, Post } from "@/types/blog";

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Module-level cache so we only fetch once per page load
let indexCache: PostMeta[] | null = null;
let indexPromise: Promise<PostMeta[]> | null = null;

function fetchIndex(): Promise<PostMeta[]> {
  if (indexCache) return Promise.resolve(indexCache);
  if (indexPromise) return indexPromise;

  indexPromise = fetch("/content/blog-index.json")
    .then((r) => {
      if (!r.ok) throw new Error(`Failed to load blog index: ${r.status}`);
      return r.json() as Promise<PostMeta[]>;
    })
    .then((data) => {
      indexCache = data;
      return data;
    });

  return indexPromise;
}

export function useBlogIndex() {
  const [posts, setPosts] = useState<PostMeta[]>(indexCache ?? []);
  const [loading, setLoading] = useState(!indexCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (indexCache) return;
    fetchIndex()
      .then(setPosts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("No post slug provided");
      return;
    }

    setLoading(true);
    setError(null);
    setPost(null);

    fetchIndex()
      .then((posts) => {
        const found = posts.find((p) => p.slug === slug);
        if (!found) throw new Error(`Post not found: ${slug}`);
        setPost({ ...found, readingTime: estimateReadingTime(found.body) });
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}
