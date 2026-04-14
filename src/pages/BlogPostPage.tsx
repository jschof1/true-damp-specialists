import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useBlogPost, useBlogIndex } from "@/hooks/useBlog";
import { PostBody } from "@/components/blog/PostBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { BlogCTA } from "@/components/blog/BlogCTA";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ChevronRight, Share2, Twitter, Facebook, Link2, ArrowLeft, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteSettings } from "@/data/siteSettings";
import logoIcon from "@/assets/general/damp-survey-equipment-flatlay.webp";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug ?? "");
  const { posts } = useBlogIndex();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (totalHeight > 0 ? window.scrollY / totalHeight : 0) * 100;
      setScrollProgress(progress);
      setParallaxY(window.scrollY * 0.35);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!loading && error) return (
    <>
      <Header />
      <main className="bg-background px-6 py-32 text-center">
        <p className="text-muted-foreground text-lg mb-4">Sorry, this post couldn't be loaded.</p>
        <Link to="/blog" className="text-accent underline underline-offset-4 text-sm">
          ← Back to blog
        </Link>
      </main>
      <Footer />
    </>
  );

  const canonicalUrl = `${siteSettings.baseUrl}/blog/${slug}`;

  function copyLink() {
    navigator.clipboard.writeText(canonicalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {post && (
        <SEO
          title={`${post.title} | ${siteSettings.businessName}`}
          description={post.excerpt}
          path={`/blog/${slug}`}
          image={post.coverImage}
          noindex
          ogType="article"
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]}
          schema={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage ? (post.coverImage.startsWith('http') ? post.coverImage : `${siteSettings.baseUrl}${post.coverImage}`) : undefined,
            datePublished: post.date,
            author: { "@type": "Organization", name: post.author },
            publisher: {
              "@type": "Organization",
              name: siteSettings.businessName,
              url: siteSettings.baseUrl,
            },
            mainEntityOfPage: canonicalUrl,
          }}
        />
      )}

      <Header />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
        <div 
          className="h-full bg-accent transition-all duration-150 ease-out shadow-[0_0_10px_hsl(var(--accent)/0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {loading ? (
        <div className="pt-20">
          <Skeleton className="h-[30vh] w-full" />
        </div>
      ) : (
        <section className="relative pt-8 pb-8 md:pt-12 md:pb-12 overflow-hidden bg-primary border-b-4 border-accent">
          {/* Background Image with Overlay - parallax */}
          <div className="absolute inset-0 z-0">
            {post?.coverImage ? (
              <div className="absolute inset-0 min-h-[120%] -top-[10%]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover blur-sm will-change-transform"
                  style={{ transform: `translate3d(0, ${-parallaxY}px, 0)` }}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-primary/50" />
            )}
            <div className="absolute inset-0 bg-background/80" />
          </div>
        
          <nav className="absolute top-4 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16 z-10 flex items-center justify-start gap-1.5 sm:gap-2 text-primary-foreground/40 text-[10px] sm:text-xs animate-fade-in flex-wrap uppercase font-black tracking-widest">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <span className="opacity-30">/</span>
                <Link to="/blog" className="text-accent/80 hover:text-accent transition-colors">Blog</Link>
                <span className="opacity-30">/</span>
                <span className="text-primary-foreground/60 truncate max-w-[150px] sm:max-w-none">
                  {post?.title ?? "Loading..."}
                </span>
          </nav>

          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4 md:py-6 relative z-10">
            <div className="max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mr-auto text-left">
              {post && (
                <div className="animate-fade-in flex flex-col items-start">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-2 sm:mb-3">
                    <Zap className="w-3 h-3 fill-accent" />
                    {post.category}
                  </div>

                  <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-4 sm:mb-5 leading-[1.1] text-balance">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-8">
                    <div className="flex items-center gap-3">
                      <img
                        src={logoIcon}
                        alt=""
                        className="w-10 h-10 rounded-xl object-contain"
                      />
                      <div className="text-left">
                        <p className="text-primary-foreground font-bold text-sm leading-none mb-1">
                          {post.author}
                        </p>
                        <p className="text-primary-foreground/40 text-[9px] font-black uppercase tracking-widest leading-none">
                          Expert Contributor
                        </p>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-primary-foreground/10 hidden sm:block" />
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-2 text-[10px] font-black text-primary-foreground/50 uppercase tracking-[0.2em]">
                        <Calendar className="h-3.5 w-3.5 text-accent/70" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-2 text-[10px] font-black text-primary-foreground/50 uppercase tracking-[0.2em]">
                        <Clock className="h-3.5 w-3.5 text-accent/70" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <main id="article-content" className="bg-card text-card-foreground px-4 py-2 md:py-4 relative overflow-hidden">
        {/* Decorative Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary to-transparent" />
          <svg className="absolute top-20 right-0 w-64 h-64 text-primary" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
          <svg className="absolute bottom-40 left-0 w-96 h-96 text-primary" viewBox="0 0 100 100" fill="currentColor">
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Decorative element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary to-transparent opacity-20 z-10" />
        
        <div className="mx-auto max-w-6xl relative z-10">
          {loading ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-3/4" />
              <div className="mt-8 space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          ) : post ? (
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Social Share (Desktop) */}
              <div className="hidden lg:block lg:col-span-1 sticky top-32 h-fit">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground vertical-text mb-2">Share</span>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-primary hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm hover:shadow-md group"
                    aria-label="Share on X / Twitter"
                  >
                    <Twitter className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-primary hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm hover:shadow-md group"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <button
                    onClick={copyLink}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md group",
                      copied ? "bg-accent text-accent-foreground" : "bg-secondary/50 text-primary hover:bg-accent hover:text-accent-foreground"
                    )}
                    aria-label="Copy link"
                  >
                    <Link2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Main Content Column */}
              <div className="lg:col-span-11">
                {post.excerpt && (
                  <div className="mb-8 max-w-2xl rounded-md border-l-4 border-accent bg-muted px-5 py-4 md:px-6 md:py-5">
                    <p className="text-foreground/80 text-lg md:text-xl leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                  </div>
                )}
                <div className="max-w-none">
                  <PostBody content={post.body} />
                </div>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/50">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-secondary/50 px-3 py-1.5 text-[10px] font-bold text-primary uppercase tracking-wider border border-border/30 hover:border-accent/30 hover:bg-card transition-all cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Mobile Share */}
                <div className="flex lg:hidden items-center gap-3 mt-6 pt-6 border-t border-border/50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-2">
                    Share:
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-2.5 bg-secondary/50 text-primary hover:bg-accent hover:text-accent-foreground transition-all"
                    aria-label="Share on X / Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-2.5 bg-secondary/50 text-primary hover:bg-accent hover:text-accent-foreground transition-all"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <button
                    onClick={copyLink}
                    className={cn(
                      "rounded-xl p-2.5 transition-all cursor-pointer",
                      copied ? "bg-accent text-accent-foreground" : "bg-secondary/50 text-primary hover:bg-accent hover:text-accent-foreground"
                    )}
                    aria-label="Copy link"
                  >
                    <Link2 className="h-4 w-4" />
                  </button>
                  {copied && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent animate-pulse">Copied!</span>
                  )}
                </div>

                <BlogCTA />

                <div className="mt-12">
                  <RelatedPosts
                    currentSlug={post.slug}
                    currentCategory={post.category}
                    allPosts={posts}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </>
  );
}
