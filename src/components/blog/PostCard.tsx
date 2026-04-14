import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import logoIcon from "@/assets/general/damp-survey-equipment-flatlay.webp";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/types/blog";

interface PostCardProps {
  post: PostMeta;
  readingTime?: number;
  className?: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostCard({ post, readingTime, className }: PostCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className={cn("group block h-full", className)}>
      <div className="relative h-full rounded-2xl bg-card overflow-hidden border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/30">
        {/* Yellow bottom reveal line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

        {/* Image */}
        {post.coverImage ? (
          <div className="aspect-[16/10] overflow-hidden bg-primary/5">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <img src={logoIcon} alt="" className="w-10 h-10 opacity-30" aria-hidden />
          </div>
        )}

        <div className="flex flex-col gap-3 p-5 pb-6">
          {/* Category + reading time */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-accent-gradient text-accent-foreground">
              {post.category}
            </span>
            {readingTime && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {readingTime} min read
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-black text-lg leading-snug text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-accent group-hover:gap-2 transition-all duration-200">
              Read more <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
