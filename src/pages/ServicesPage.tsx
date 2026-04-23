import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteSettings } from "@/data/siteSettings";
import { services } from "@/data/services";
import { getServiceDestination } from "@/lib/serviceLinks";
import { ArrowRight, CheckCircle2, FileText, Phone, Search, ShieldCheck } from "lucide-react";
import ctaBackground from "@/assets/general/damp-survey-thermal-imaging.webp";
import { getServicesPageContent } from "@/data/content";

const ServicesPage = () => {
  const servicesPage = getServicesPageContent() as {
    hero: {
      subtitle: string;
      title: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    trustStats: { value: string; label: string }[];
    coreServices: { title: string; description: string };
    serviceCards: {
      title: string;
      description: string;
      includes: string[];
      note?: string;
    }[];
    process: {
      subtitle: string;
      title: string;
      description?: string;
      steps: { title: string; desc: string }[];
    };
    positioningBlock: { title: string; description: string };
    remedialWorks: {
      title: string;
      description: string;
      includes: string[];
      closing: string;
    };
    builtForClarity: { title: string; description: string };
    technicalStandards: { title: string; description: string };
    reporting: { title: string; description: string };
    reviews: { title: string; description: string };
    finalCta: { title: string; description: string; primaryText: string; secondaryText: string };
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${siteSettings.businessName} Services`,
    description: servicesPage.hero.description,
    provider: {
      "@id": `${siteSettings.baseUrl}/#organization`,
    },
  };

  const trustIcons = [ShieldCheck, Search, FileText, CheckCircle2];
  const stepIcons = [Search, ShieldCheck, FileText];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Services | ${siteSettings.businessName}`}
        description={servicesPage.hero.description}
        path="/services"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        schema={servicesSchema}
      />

      <Header />

      <main>
        <section className="relative overflow-hidden bg-primary pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20">
          <div className="absolute inset-0 z-0">
            <img
              src={ctaBackground}
              alt={`${siteSettings.businessName} services background`}
              className="h-full w-full object-cover opacity-35"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/35 via-primary/75 to-primary" />
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground sm:px-4 sm:py-2 sm:text-sm">
              <ShieldCheck className="h-4 w-4" />
              {servicesPage.hero.subtitle}
            </div>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-3xl font-black leading-tight text-primary-foreground sm:text-4xl md:text-6xl">
              {servicesPage.hero.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg md:text-xl">
              {servicesPage.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                <Link to="/get-quote">{servicesPage.hero.ctaPrimary}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                <a href="#services-grid">{servicesPage.hero.ctaSecondary}</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="-mt-8 relative z-20 pb-12 md:-mt-12 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {servicesPage.trustStats.map((stat, index) => {
                const Icon = trustIcons[index] ?? ShieldCheck;
                return (
                  <Card key={stat.value} className="border-2 border-border bg-card shadow-lg">
                    <CardContent className="flex gap-4 p-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-accent">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-xl font-black text-foreground">{stat.value}</p>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="services-grid" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {servicesPage.coreServices.title}
              </h2>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                {servicesPage.coreServices.description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {servicesPage.serviceCards.map((card) => (
                <Card key={card.title} className="h-full border-2 border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-black text-foreground">{card.title}</h3>
                    <div className="mt-4 space-y-4">
                      {card.description.split("\n\n").map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="mt-5">
                      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">Includes</p>
                      <ul className="space-y-2">
                        {card.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {card.note ? (
                      <p className="mt-5 rounded-xl bg-muted px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                        {card.note}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-14 text-center">
              <h3 className="font-display text-2xl font-black text-foreground md:text-3xl">
                Core Service Pages
              </h3>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                The existing detailed service pages remain in place and can still be browsed below.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={getServiceDestination(service.slug)}
                  className="block rounded-lg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Card className="h-full border-2 border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-display text-xl font-bold text-foreground">{service.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {service.shortDesc}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-accent">
                        <span>View details</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">{servicesPage.process.subtitle}</p>
              <h2 className="mt-3 font-display text-2xl font-black text-primary-foreground md:text-4xl">
                {servicesPage.process.title}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {servicesPage.process.steps.map((step, index) => {
                const Icon = stepIcons[index] ?? Search;
                return (
                  <Card key={step.title} className="border border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground shadow-none">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                        <Icon className="h-7 w-7" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-accent">Step {index + 1}</p>
                      <h3 className="mt-3 font-display text-xl font-bold">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">{step.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-muted p-8 text-center shadow-sm">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {servicesPage.positioningBlock.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {servicesPage.positioningBlock.description}
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                  {servicesPage.remedialWorks.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {servicesPage.remedialWorks.description.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-accent">Includes</p>
                <ul className="space-y-3">
                  {servicesPage.remedialWorks.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  {servicesPage.remedialWorks.closing}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-3">
            <Card className="border-2 border-border bg-card shadow-sm lg:col-span-1">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-black text-foreground">{servicesPage.builtForClarity.title}</h3>
                <div className="mt-4 space-y-4">
                  {servicesPage.builtForClarity.description.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-border bg-card shadow-sm lg:col-span-1">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-black text-foreground">{servicesPage.technicalStandards.title}</h3>
                <div className="mt-4 space-y-4">
                  {servicesPage.technicalStandards.description.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-border bg-card shadow-sm lg:col-span-1">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-black text-foreground">{servicesPage.reporting.title}</h3>
                <div className="mt-4 space-y-4">
                  {servicesPage.reporting.description.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
              {servicesPage.reviews.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              {servicesPage.reviews.description}
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-xl border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link to="/reviews" className="flex items-center gap-2">
                Read reviews
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="bg-primary py-12 md:py-20">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl font-black text-primary-foreground md:text-4xl">
              {servicesPage.finalCta.title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {servicesPage.finalCta.description.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                <Link to="/get-quote">{servicesPage.finalCta.primaryText}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  {servicesPage.finalCta.secondaryText}
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

export default ServicesPage;
