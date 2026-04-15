import { Star, Check, Quote, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { reviews, reviewStats, type Review } from "@/data/reviews";
import { siteSettings } from "@/data/siteSettings";
import { getSectionCtaLabel } from "@/data/content";
import theme from "@/config/theme";
import checkatradeLogo from "@/assets/icons/certifications/checkatrade.webp";

const ReviewShowcase = () => {
  // Get top verified reviews
  const featuredReviews = reviews
    .filter(r => r.rating === 5)
    .slice(0, 10);

  return (
    <section className="py-16 relative overflow-hidden bg-white text-slate-900">
      {/* Background Patterns */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ 
          backgroundImage: `linear-gradient(${theme.colors.primary.DEFAULT} 1px, transparent 1px), linear-gradient(to right, ${theme.colors.primary.DEFAULT} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: theme.patterns.noise.dataUrl }} 
      />
      
      {/* Decorative Blur */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" /> */}

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gradient text-accent-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 md:mb-4 shadow-sm">
              <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-accent-foreground" aria-hidden="true" />
              Trusted by Locals
            </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 mb-3 md:mb-4 leading-tight">
              Rated <span className="text-accent-text-on-light relative inline-block">
                Excellent
                <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-accent/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-medium max-w-xl mx-auto md:mx-0">
              See how homeowners, buyers and landlords describe the clarity of our surveys and remedial guidance.
            </p>
          </div>

          <div className="flex flex-row gap-2 md:gap-3 w-full md:w-auto">
            {/* Checkatrade Badge */}
            <a 
              href={siteSettings.googlePageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 md:gap-4 bg-slate-50 border border-slate-200 p-2 md:p-4 rounded-lg md:rounded-xl hover:border-accent hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 shadow-sm group flex-1 md:flex-none justify-center md:justify-start min-w-0 md:min-w-[200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="shrink-0 flex items-center justify-center">
                <img src={checkatradeLogo} alt="Checkatrade" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-0.5 md:mb-1">
                  <span className="font-black text-slate-900 text-base md:text-2xl leading-none">{reviewStats.averageRating}</span>
                  <div className="flex gap-0.5 hidden sm:flex">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-accent fill-accent" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <div className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Reviews</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="relative w-full overflow-hidden mask-linear-fade pt-0 pb-4 md:py-4">
        {/* Gradient Masks */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none backdrop-blur-[1px]" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none backdrop-blur-[1px]" />

        <div className="flex w-max animate-scroll hover:pause-animation gap-6 px-4">
          {/* First set of reviews */}
          {featuredReviews.map((review, index) => (
            <ReviewCard key={`first-${index}`} review={review} />
          ))}
          {/* Duplicate set for seamless loop */}
          {featuredReviews.map((review, index) => (
            <ReviewCard key={`second-${index}`} review={review} />
          ))}
        </div>
      </div>

      {/* Section CTA */}
      <div className="container mx-auto px-4 pt-8 pb-4 relative z-10 text-center">
        <Button asChild size="lg" className="bg-accent-gradient hover:opacity-90 text-accent-foreground font-bold px-6 sm:px-8 h-12 rounded-xl text-base shadow-xl shadow-accent/20">
          <Link to="/get-quote" className="inline-flex items-center gap-2">
            {getSectionCtaLabel()}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

// Extracted Card Component
const ReviewCard = ({ review }: { review: Review }) => (
  <Link to="/reviews" className="block h-full">
    <Card className="w-[300px] md:w-[320px] shrink-0 border-none shadow-md bg-slate-50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 flex flex-col h-full select-none group relative overflow-hidden ring-1 ring-slate-200 hover:ring-accent/50 cursor-pointer">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="p-7 flex flex-col h-full relative">
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-0.5">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-accent fill-accent" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-slate-200 group-hover:text-accent/20 transition-colors duration-500" />
        </div>
        
        <p className="text-slate-600 mb-6 text-[15px] leading-relaxed line-clamp-4 italic relative flex-grow font-medium group-hover:text-slate-900 transition-colors">
          "{review.text}"
        </p>

        <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100 group-hover:border-accent/10 transition-colors">
          <div>
            <p className="font-bold text-slate-900 text-sm group-hover:text-accent-text-on-light transition-colors duration-300">{review.name}</p>
            <p className="text-xs text-slate-500 font-medium">{review.location}</p>
          </div>
          {review.verified && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent-foreground bg-accent-gradient px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 shadow-sm">
              <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
              Verified
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default ReviewShowcase;
