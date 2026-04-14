import { Star, Quote, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoogleIcon from "./GoogleIcon";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { reviews, reviewStats } from "@/data/reviews";
import { getTestimonialsContent, getSectionCtaLabel } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";
import theme from "@/config/theme";

interface TestimonialsProps {
  areaName?: string;
}

const Testimonials = ({ areaName }: TestimonialsProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressRegion;
  const testimonialsContent = getTestimonialsContent(displayArea);
  const testimonials = reviews.slice(0, 6); // Use the first 6 reviews for the landing page

  return (
    <section 
      id="reviews" 
      className="py-12 md:py-20 lg:py-32 relative overflow-hidden bg-muted text-foreground"
    >
      {/* Background Decorations */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: theme.patterns.noise.dataUrl, 
          opacity: 0.03
        }} 
      />
      <div 
        className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full blur-[120px] -mr-20 -mt-20 pointer-events-none" 
        style={{ backgroundColor: theme.colors.accent.DEFAULT, opacity: 0.05 }}
      />
      <div 
        className="absolute bottom-0 left-0 w-1/3 h-1/3 rounded-full blur-[120px] -ml-20 -mb-20 pointer-events-none" 
        style={{ backgroundColor: theme.colors.primary.DEFAULT, opacity: 0.03 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <div className="max-w-2xl text-center md:text-left">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6 animate-fade-in shadow-sm"
              style={{
                backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.1)'),
                borderColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.3)'),
                borderWidth: theme.borders.width.thin,
                color: theme.surfaces.accentTextOnLight
              }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {testimonialsContent.subtitle}
            </div>
            <h2 
              className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 leading-[1.1] animate-fade-in text-foreground"
            >
              {testimonialsContent.title}
            </h2>
            <p 
              className="text-base md:text-xl leading-relaxed animate-fade-in text-muted-foreground"
              style={{ animationDelay: "0.1s" }}
            >
              {testimonialsContent.description}
            </p>
          </div>

          {/* Google Rating Summary Card */}
          <a 
            href={siteSettings.googlePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 md:p-6 rounded-2xl flex items-center gap-4 md:gap-6 group transition-all duration-300 animate-fade-in hover:[transform:var(--hover-transform)] hover:[box-shadow:var(--hover-shadow)] hover:[border-color:var(--hover-border)] bg-card border-2 border-border shadow-sm"
            style={{
              animationDelay: "0.2s",
              '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
              '--hover-shadow': theme.effects.shadows.lg,
              '--hover-border': theme.colors.accent.DEFAULT
            } as React.CSSProperties}
          >
            <div 
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl transition-colors group-hover:[background-color:var(--hover-bg)] bg-muted"
              style={{
                '--hover-bg': theme.colors.accent.DEFAULT.replace(')', ' / 0.1)')
              } as React.CSSProperties}
            >
              <GoogleIcon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <span 
                  className="font-display font-black text-2xl md:text-3xl text-foreground"
                >
                  {reviewStats.averageRating}
                </span>
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" style={{ color: theme.colors.accent.DEFAULT }} />
                  ))}
                </div>
              </div>
              <p 
                className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-muted-foreground"
              >
                {testimonialsContent.ratingLabel}
              </p>
            </div>
          </a>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={cn(
                "group relative flex flex-col transition-all duration-500 animate-fade-in overflow-hidden hover:[transform:var(--hover-transform)] hover:[box-shadow:var(--hover-shadow)] hover:[border-color:var(--hover-border)] bg-card shadow-sm",
                index === 0 && "md:col-span-2 lg:col-span-1"
              )}
              style={{ 
                animationDelay: `${0.1 * index}s`,
                border: `${theme.borders.width.medium} solid ${index === 0 ? theme.colors.accent.DEFAULT : 'hsl(var(--border))'}`,
                boxShadow: index === 0 ? theme.effects.shadows.accent : theme.effects.shadows.md,
                '--hover-transform': `translateY(-${theme.metrics.hover.liftSm})`,
                '--hover-shadow': theme.effects.shadows.xl,
                '--hover-border': theme.colors.accent.DEFAULT
              } as React.CSSProperties}
            >
              {/* Decorative top accent line on hover */}
              <div 
                className="absolute top-0 left-0 w-0 h-1 transition-all duration-500 group-hover:w-full"
                style={{ background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT }}
              />

              <CardContent className="p-6 md:p-8 flex flex-col h-full relative z-10">
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current drop-shadow-sm" style={{ color: theme.colors.accent.DEFAULT }} />
                    ))}
                  </div>
                  <span 
                    className="text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm"
                    style={{
                      backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.15)'),
                      color: theme.surfaces.accentTextOnLight,
                      border: `${theme.borders.width.hairline} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.3)')}`
                    }}
                  >
                    {testimonial.date}
                  </span>
                </div>

                {/* Quote Icon */}
                <div 
                  className="absolute top-6 right-8 transition-opacity duration-300 opacity-5 group-hover:opacity-10 text-muted-foreground/20"
                >
                  <Quote className="w-12 h-12 md:w-16 md:h-16" />
                </div>
                
                {/* Review Text */}
                <p 
                  className="text-base md:text-lg font-bold leading-relaxed mb-6 md:mb-8 relative z-10 italic text-card-foreground"
                >
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div 
                  className="flex flex-col gap-3 md:gap-4 pt-5 md:pt-6 mt-auto border-t border-border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p 
                        className="font-black text-base md:text-lg flex items-center gap-2 text-foreground"
                      >
                        {testimonial.name}
                        <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: theme.colors.accent.DEFAULT }} />
                      </p>
                      <p 
                        className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-muted-foreground"
                      >
                        Verified Customer in {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[9px] md:text-[10px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-widest shadow-sm bg-muted text-muted-foreground border border-border"
                    >
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto font-black rounded-xl shadow-lg uppercase tracking-wide text-sm sm:text-base transition-all duration-300 hover:opacity-90"
            style={{
              background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
              color: theme.surfaces.accentForeground,
              boxShadow: theme.effects.shadows.accentGlow
            }}
          >
            <Link to="/get-quote" className="flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 h-auto">
              {getSectionCtaLabel()}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto max-w-full px-6 sm:px-10 py-4 sm:py-5 h-auto rounded-xl font-black shadow-sm group uppercase tracking-wide text-sm sm:text-base text-center whitespace-normal transition-all duration-300 hover:[transform:var(--hover-transform)] hover:[box-shadow:var(--hover-shadow)] hover:[background-color:var(--hover-bg)] bg-background border-2 border-border text-foreground"
            style={{
              '--hover-transform': `translateY(-${theme.metrics.hover.liftSm})`,
              '--hover-shadow': theme.effects.shadows.xl,
              '--hover-bg': 'hsl(var(--muted))'
            } as React.CSSProperties}
          >
            <Link to="/reviews" className="flex items-center justify-center">
              {testimonialsContent.ctaText}
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" style={{ color: theme.colors.accent.DEFAULT }} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
