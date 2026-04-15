import SEO from "@/components/SEO";
import Header from "@/components/Header";
import TopBanner from "@/components/TopBanner";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import FinalCTA from "@/components/FinalCTA";
import { Star, CheckCircle2, MessageSquare, Quote, ArrowRight, ThumbsUp, Users, Award, ShieldCheck, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/GoogleIcon";
import { cn } from "@/lib/utils";
import ctaBackground from "@/assets/general/damp-survey-thermal-imaging.webp";
import { reviews, reviewStats } from "@/data/reviews";

import { getReviewsPageContent } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";

const testimonials = reviews;
const ReviewsPage = () => {
  const reviewsPage = getReviewsPageContent();
  if (!reviewsPage) return null;
  const statsIcons = [Star, Users, CheckCircle2, ShieldCheck];
    const stats = [{
    label: "Average Rating",
    value: reviewStats.averageRating,
    icon: statsIcons[0],
    color: "text-accent"
  }, {
    label: "Review Themes",
    value: "Clear",
    icon: statsIcons[1],
    color: "text-foreground"
  }, {
    label: "Diagnostic Focus",
    value: "Root Cause",
    icon: statsIcons[2],
    color: "text-accent"
  }, {
    label: "Verified Reviews",
    value: reviewStats.verifiedCount,
    icon: statsIcons[3],
    color: "text-accent"
  }];
  return <div className="min-h-screen bg-background">
      <SEO
        title={`Client Reviews | ${siteSettings.businessName}`}
        description="Read client feedback on independent damp surveys, mould investigations and remedial guidance."
        path="/reviews"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ]}
      />

      {/* <TopBanner /> */}
      <Header />

      <main>
        {/* Hero Section - matches portfolio */}
        <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img src={ctaBackground} alt="True Damp Specialists review page background" className="w-full h-full object-cover opacity-40" width={1920} height={1080} decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 animate-fade-in shrink-0">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden />
              {reviewsPage.hero.badge.replace("{rating}", reviewStats.averageRating).replace("{count}", reviewStats.totalReviews)}
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in inline-flex flex-wrap items-center justify-center gap-3">
              What Our{" "}
              <span className="text-accent relative inline-block">
                Customers
                <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/20 -z-10 -rotate-1" aria-hidden="true" />
              </span>{" "}
              Say
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
              {reviewsPage.hero.description}
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg shadow-xl shadow-accent/25">
                <a href="#reviews">{reviewsPage.hero.ctaPrimary}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg">
                <a href={siteSettings.googlePageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <GoogleIcon className="w-5 h-5" />
                  {reviewsPage.hero.ctaSecondary}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="-mt-8 md:-mt-12 relative z-20 pb-12 md:pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="border-0 shadow-2xl shadow-black/10 overflow-hidden bg-border/50 backdrop-blur-sm">
              <CardContent className="p-[1px]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px]">
                  {stats.map((stat, index) => (
                    <div key={index} className="p-6 md:p-8 flex flex-col items-center text-center group hover:bg-accent/5 transition-colors bg-card">
                      <div className={cn("w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform", stat.color)}>
                        <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="font-display font-black text-2xl md:text-3xl text-foreground mb-1">{stat.value}</div>
                      <div className="text-muted-foreground font-bold uppercase tracking-wider text-[10px] md:text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Review */}
        <section className="py-12 md:py-20 bg-background border-y border-border overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
              <div className="lg:w-1/2 relative w-full">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
                <div className="relative bg-primary rounded-2xl md:rounded-[2rem] p-6 md:p-12 text-primary-foreground shadow-2xl overflow-hidden group">
                  <Quote className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-24 md:h-24 text-primary-foreground/5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div className="flex items-center gap-1 mb-6 md:mb-8">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />)}
                  </div>
                  <blockquote className="text-lg md:text-3xl font-medium leading-relaxed mb-6 md:mb-10 italic">
                    "{reviewsPage.featuredReview.text}"
                  </blockquote>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-black text-xl md:text-2xl">
                      {reviewsPage.featuredReview.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-lg md:text-xl flex items-center gap-2">
                        {reviewsPage.featuredReview.author}
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent fill-accent/20" />
                      </div>
                      <p className="text-primary-foreground/60 text-sm md:text-base">{reviewsPage.featuredReview.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" />
                  {reviewsPage.whyLoveUs.subtitle}
                </div>
                <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-6 md:mb-8 leading-tight">
                  {reviewsPage.whyLoveUs.title}
                </h2>
                <div className="space-y-4 md:space-y-6">
                  {reviewsPage.whyLoveUs.items.map((item, i) => <div key={i} className="flex gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent text-accent-foreground flex-shrink-0 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base">{item.desc}</p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Reviews Grid */}
        <section id="reviews" className="py-12 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
              <div className="max-w-2xl">
                <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-4 md:mb-6">
                  {reviewsPage.latestReviews.title}
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  {reviewsPage.latestReviews.description}
                </p>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                 <Button variant="outline" className="border-border bg-card font-bold h-11 md:h-12 text-sm md:text-base px-4 md:px-6 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                   Sort by: Recent
                 </Button>
                 <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-11 md:h-12 text-sm md:text-base px-4 md:px-6 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                   <a href={siteSettings.googlePageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                     <ExternalLink className="w-4 h-4" />
                     Google Reviews
                   </a>
                 </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((review, index) => <Card key={index} className="border border-border bg-card group hover:border-accent/30 transition-all duration-300 hover:shadow-xl relative flex flex-col h-full">
                  <CardContent className="p-5 md:p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-accent text-accent" />)}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-muted-foreground bg-muted px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider">
                        <Calendar className="w-3 h-3" />
                        {review.date}
                      </div>
                    </div>
                    
                    <p className="text-card-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8 italic">
                      "{review.text}"
                    </p>
                    
                    <div className="mt-auto pt-5 md:pt-6 border-t border-border flex flex-col gap-3 md:gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-card-foreground text-base md:text-lg flex items-center gap-2 leading-tight">
                            {review.name}
                            {review.verified && <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent fill-accent" />}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            {review.location}
                          </div>
                        </div>
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <GoogleIcon className="w-5 h-5 md:w-6 md:h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] md:text-[10px] bg-accent text-accent-foreground font-black px-2 py-1 md:px-2.5 md:py-1.5 rounded-md uppercase tracking-widest">
                          {review.service}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            <div className="mt-12 md:mt-16 text-center">
              <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 md:h-14 px-10 rounded-xl group text-base md:text-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <a href={siteSettings.googlePageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 justify-center">
                  Read More on Google
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Customer Video Section Placeholder */}
        {/* <section className="py-24 bg-navy relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
                <MessageSquare className="w-3.5 h-3.5" />
                Video Testimonials
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6">
                Hear From Our <span className="text-yellow">Customers</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl">
                Nothing speaks louder than the words of our happy clients. Check out these short stories from homeowners we've helped.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
              name: "Mark Peterson",
              role: "Homeowner",
              videoId: "1",
              duration: "1:45"
            }, {
              name: "Sarah Jennings",
              role: "Landlord",
              videoId: "2",
              duration: "2:10"
            }, {
              name: "Robert Fox",
              role: "Business Owner",
              videoId: "3",
              duration: "1:20"
            }].map((video, i) => <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-white/10 border border-white/20 mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-yellow text-yellow-foreground flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Quote className="w-8 h-8 fill-current rotate-180" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-navy/80 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-bold">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{video.name}</h3>
                  <p className="text-white/50 text-sm uppercase tracking-widest font-bold">{video.role}</p>
                </div>)}
            </div>
          </div>
        </section> */}

        {/* Leave a Review Section */}
        <section className="py-12 md:py-24 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 rounded-2xl md:rounded-[3rem] p-8 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 border border-border">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="font-display font-black text-3xl md:text-5xl text-foreground mb-4 md:mb-6">
                  Happy With Our <span className="text-accent">Service?</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">
                  Your feedback helps us improve and helps others find an independent specialist they can trust. It only takes a minute to leave a review.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 md:h-14 px-8 rounded-xl shadow-lg shadow-accent/20 group text-base focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <a href="/feedback" className="flex items-center gap-2 justify-center">
                      Leave a Review
                      <ThumbsUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </Button>
                  <div className="flex items-center gap-4 px-6 h-12 md:h-14 border border-border rounded-xl bg-card justify-center">
                    <GoogleIcon className="w-5 h-5 md:w-6 md:h-6" />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden sm:block">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary/5 flex items-center justify-center">
                  <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent flex items-center justify-center text-accent-foreground shadow-2xl shadow-accent/30">
                      <MessageSquare className="w-10 h-10 md:w-12 md:h-12" />
                    </div>
                  </div>
                </div>
                {/* Floating reviews */}
                <div className="absolute -top-4 -right-4 bg-card p-2 md:p-3 rounded-2xl shadow-xl border border-border animate-bounce-slow" aria-hidden="true">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />
                </div>
                <div className="absolute top-1/2 -left-8 bg-card p-2 md:p-3 rounded-2xl shadow-xl border border-border animate-bounce-slow" style={{
                animationDelay: '1s'
              }} aria-hidden="true">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
      <MobileCallButton />
    </div>;
};
export default ReviewsPage;