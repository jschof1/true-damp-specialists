import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronRight, Star } from "lucide-react";
import type { PostMeta } from "@/types/blog";

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  allPosts: PostMeta[];
}

export function RelatedPosts({ currentSlug, currentCategory, allPosts }: RelatedPostsProps) {
  const sameCategory = allPosts.filter(
    (p) => p.slug !== currentSlug && p.category === currentCategory
  );
  const others = allPosts.filter(
    (p) => p.slug !== currentSlug && p.category !== currentCategory
  );
  const posts = [...sameCategory, ...others].slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="mt-24 pt-16 border-t border-border/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <Badge className="bg-accent text-accent-foreground border-none mb-3 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
            Keep Reading
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">Related Articles</h2>
        </div>
        <Link 
          to="/blog" 
          className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground hover:text-accent transition-colors"
        >
          View All Posts <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.slug} className="group flex flex-col h-full bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-none text-[10px] font-black uppercase tracking-wider">
                {post.category}
              </Badge>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime} min</span>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-4 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                {post.title}
              </h3>
              <Link 
                to={`/blog/${post.slug}`} 
                className="mt-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground group-hover:text-accent transition-colors"
              >
                Read Post <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
