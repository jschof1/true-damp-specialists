import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { siteSettings } from "@/data/siteSettings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogIndex } from "@/hooks/useBlog";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import blogHero from "@/assets/general/damp-consultation-report-review.webp";
import logoIcon from "@/assets/general/damp-survey-equipment-flatlay.webp";
import type { BlogCategory } from "@/types/blog";

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const { posts, loading } = useBlogIndex();
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? posts
        : posts.filter((p) => p.category === activeCategory),
    [posts, activeCategory]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [posts]);

  const featured = filtered[0];
  const rest = filtered.slice(1, visibleCount + 1);
  const hasMore = visibleCount + 1 < filtered.length;

  const canonicalUrl = `${siteSettings.baseUrl}/blog`;

  return (
    <>
      <Helmet>
        <title>Damp & Moisture Insights | True Damp Specialists</title>
        <meta
          name="description"
          content="Insights and guidance on damp, mould, moisture diagnostics and independent reporting from True Damp Specialists."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Damp & Moisture Insights | True Damp Specialists" />
        <meta
          property="og:description"
          content="Insights and guidance on damp, mould, moisture diagnostics and independent reporting from True Damp Specialists."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "True Damp Specialists Insights",
            url: canonicalUrl,
            description:
              "Insights and guidance on damp, mould, moisture diagnostics and independent reporting from True Damp Specialists.",
            publisher: {
              "@type": "Organization",
              name: siteSettings.businessName,
              url: siteSettings.baseUrl,
            },
          })}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section - matches portfolio */}
      <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            src={blogHero}
            alt=""
            className="w-full h-full object-cover opacity-40"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 animate-fade-in shrink-0">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden />
            Damp, mould &amp; moisture insights
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in">
            The True Damp <span className="text-accent">Insights Hub</span>
          </h1>
          <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
            Damp, mould and moisture content is still being refreshed for the new site, so this section is temporarily excluded from search indexing while it is brought into line.
          </p>
        </div>
      </section>

      <main className="bg-background px-6 py-8 md:py-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <CategoryFilter
            active={activeCategory}
            onChange={(cat) => {
              setActiveCategory(cat);
              setVisibleCount(POSTS_PER_PAGE);
            }}
            counts={categoryCounts}
          />

          {loading ? (
            <div className="space-y-10">
              <Skeleton className="h-[500px] w-full rounded-2xl" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-section-subtle mb-6">
                <img src={logoIcon} alt="" className="w-8 h-8 opacity-30" aria-hidden />
              </div>
              <p className="text-lg font-black text-foreground">No posts in this category yet.</p>
              <p className="text-sm mt-2 text-muted-foreground">Check back soon — we post regularly.</p>
            </div>
          ) : (
            <>
              {featured && <FeaturedPost post={featured} />}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}

              {hasMore && (
                <div className="text-center pt-6">
                  <button
                    onClick={() => setVisibleCount((n) => n + POSTS_PER_PAGE)}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-accent bg-primary px-8 py-3.5 text-[11px] font-black uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-all duration-200 cursor-pointer"
                  >
                    Load more articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
