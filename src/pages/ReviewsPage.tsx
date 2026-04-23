import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ctaBackground from "@/assets/general/damp-survey-thermal-imaging.webp";
import { reviews } from "@/data/reviews";
import { getReviewsPageContent } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";

const ReviewsPage = () => {
  const reviewsPage = getReviewsPageContent() as {
    hero: {
      badge: string;
      title: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    whatTheseReviewsShow: { title: string; description: string };
    whyLoveUs: { title: string; items: { title: string; desc: string }[] };
    latestReviews: { title: string; description: string };
    whereTypicallyInstructed: { title: string; items: string[] };
    seoSection: { title: string; description: string };
    finalCta: { title: string; description: string; primaryText: string; secondaryText: string };
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Reviews | ${siteSettings.businessName}`}
        description="Read what clients say after getting the right diagnosis, with independent damp and moisture investigations focused on clarity and correct next steps."
        path="/reviews"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ]}
      />

      <Header />

      <main>
        <section className="relative overflow-hidden bg-primary pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20">
          <div className="absolute inset-0 z-0">
            <img
              src={ctaBackground}
              alt="True Damp Specialists review page background"
              className="h-full w-full object-cover opacity-35"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground sm:px-4 sm:py-2 sm:text-sm">
              <Star className="h-4 w-4" />
              {reviewsPage.hero.badge}
            </div>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-3xl font-black leading-tight text-primary-foreground sm:text-4xl md:text-6xl">
              {reviewsPage.hero.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg md:text-xl">
              {reviewsPage.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                <a href="#reviews-grid">{reviewsPage.hero.ctaPrimary}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                <a href="/get-quote">{reviewsPage.hero.ctaSecondary}</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {reviewsPage.whatTheseReviewsShow.title}
              </h2>
              <div className="mt-4 space-y-4">
                {reviewsPage.whatTheseReviewsShow.description.split("\n\n").map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {reviewsPage.whyLoveUs.title}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {reviewsPage.whyLoveUs.items.map((item) => (
                <Card key={item.title} className="border-2 border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews-grid" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {reviewsPage.latestReviews.title}
              </h2>
              <div className="mt-4 space-y-4">
                {reviewsPage.latestReviews.description.split("\n\n").map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <Card key={`${review.name}-${review.date}`} className="border-2 border-border bg-card shadow-sm">
                  <CardContent className="flex h-full flex-col p-6">
                    {review.scenarioLabel ? (
                      <div className="mb-4 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent-foreground">
                        {review.scenarioLabel}
                      </div>
                    ) : null}
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm italic leading-relaxed text-foreground md:text-base">
                      “{review.text}”
                    </p>
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="font-semibold text-foreground">
                        {review.name}
                        {review.verified ? <span className="text-accent"> · Verified</span> : null}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {review.location} · {review.date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                  {reviewsPage.whereTypicallyInstructed.title}
                </h2>
                <ul className="mt-6 space-y-3">
                  {reviewsPage.whereTypicallyInstructed.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground md:text-base">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                  {reviewsPage.seoSection.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {reviewsPage.seoSection.description.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl font-black text-primary-foreground md:text-4xl">
              {reviewsPage.finalCta.title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {reviewsPage.finalCta.description.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                <a href={`tel:${siteSettings.phone}`}>{reviewsPage.finalCta.primaryText}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                <a href="/get-quote" className="flex items-center gap-2">
                  {reviewsPage.finalCta.secondaryText}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCallButton />
    </div>
  );
};

export default ReviewsPage;