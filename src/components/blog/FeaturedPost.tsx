import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Flame } from "lucide-react";
import type { PostMeta } from "@/types/blog";

interface FeaturedPostProps {
  post: PostMeta;
  readingTime?: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function FeaturedPost({ post, readingTime }: FeaturedPostProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-primary min-h-[500px] md:min-h-[580px] flex flex-col justify-end transition-shadow duration-300 hover:shadow-[0_24px_64px_-12px_hsl(var(--accent)/0.3)]">
        {/* Background image */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/20" />

        {/* Yellow left accent strip */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent z-20" />

        {/* Top-right decorative label */}
        <div className="absolute top-6 right-6 z-20 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <Flame className="w-16 h-16 text-accent fill-accent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-5 p-8 md:p-12 pl-10 md:pl-14">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-widest">
              <Flame className="w-3 h-3 fill-accent-foreground" />
              Featured · {post.category}
            </div>
            <span className="flex items-center gap-1.5 text-sm text-primary-foreground/50">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            {readingTime && (
              <span className="flex items-center gap-1.5 text-sm text-primary-foreground/50">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min read
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-tight max-w-3xl group-hover:text-accent transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-primary-foreground/65 text-base md:text-lg leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          {/* CTA */}
          <Button className="w-fit bg-accent hover:bg-accent-dark text-accent-foreground font-black uppercase tracking-wider gap-2 transition-all duration-200 group-hover:gap-3">
            Read article <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
