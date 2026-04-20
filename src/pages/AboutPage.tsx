import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FlaskConical,
  HardHat,
  Layers,
  MapPin,
  MessageSquare,
  Phone,
  Quote as QuoteIcon,
  Shield,
  Star,
  Timer,
  Users,
  Wind,
} from "lucide-react";
import { siteSettings } from "@/data/siteSettings";
import { getAboutPageContent, getSiteContent } from "@/data/content";
import { reviewStats } from "@/data/reviews";
import { cn } from "@/lib/utils";

import imgThermal from "@/assets/general/damp-survey-thermal-imaging.webp";
import imgFlatlay from "@/assets/general/damp-survey-equipment-flatlay.webp";
import imgMould from "@/assets/general/damp-mould-wall-corner.webp";
import imgBasement from "@/assets/general/damp-basement-waterproofing.webp";
import imgRising from "@/assets/general/damp-rising-damp-exterior.webp";
import imgRoof from "@/assets/general/damp-external-defects-roof.webp";
import imgConsultation from "@/assets/general/damp-consultation-report-review.webp";

const ABOUT_IMAGES: Record<string, string> = {
  thermal: imgThermal,
  flatlay: imgFlatlay,
  mouldCorner: imgMould,
  basement: imgBasement,
  risingExterior: imgRising,
  externalRoof: imgRoof,
  consultation: imgConsultation,
};

type TeamRole = { role: string; detail: string };

const ROLE_ICONS = [ClipboardCheck, HardHat, Building2, Layers, FlaskConical, Wind] as const;

const TRUST_ICONS = [Star, Users, Timer, MapPin] as const;

function resolveImageKey(key: string): string {
  return ABOUT_IMAGES[key] ?? imgThermal;
}

const AboutPage = () => {
  const about = getAboutPageContent() as Record<string, unknown>;
  const site = getSiteContent() as { phoneDisplay?: string };
  const phoneDisplay = site.phoneDisplay ?? siteSettings.phoneFormatted;

  const seo = about.seo as { description?: string } | undefined;
  const pageDescription =
    seo?.description ??
    "Independent damp specialists with PCA-trained surveyors, engineers and waterproofing designers.";

  const hero = about.hero as {
    badge: string;
    title: string;
    description: string;
    trustChips?: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };

  const trustStrip = about.trustStrip as {
    items: { label: string; value: string; hint: string }[];
  };

  const valueSplit = about.valueSplit as {
    badge: string;
    title: string;
    paragraphs: string[];
    bullets: string[];
    imageKey: string;
    imageAlt: string;
    ctaLabel: string;
    ctaPath: string;
  };

  const storyPanels = about.storyPanels as Array<{
    badge: string;
    title: string;
    body: string;
    imageKey: string;
    imageAlt: string;
    ctaLabel: string;
    ctaPath: string;
    imagePosition: "left" | "right";
  }>;

  const bento = about.bento as {
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      description: string;
      imageKey: string;
      imageAlt: string;
      ctaLabel: string;
      ctaPath: string;
    }>;
  };

  const process = about.process as {
    title: string;
    subtitle: string;
    steps: Array<{ title: string; description: string }>;
  };

  const objections = about.objections as {
    title: string;
    items: Array<{ title: string; description: string }>;
  };

  const teamHeading = about.teamHeading as string;
  const teamRoles = about.teamRoles as TeamRole[];

  const partners = about.partners as {
    title: string;
    intro: string;
    body: string;
    partnerNames: string[];
    imageKey: string;
    imageAlt: string;
  };

  const testimonial = about.testimonial as {
    quote: string;
    author: string;
    role: string;
    ctaLabel: string;
    ctaPath: string;
  };

  const faqTeaser = about.faqTeaser as {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
      linkText: string;
      linkPath: string;
    }>;
  };

  const closing = about.closing as string[];

  const cta = about.cta as {
    title: string;
    description: string;
    primaryText: string;
    secondaryText: string;
    note?: string;
  };

  const trustItems = trustStrip.items.map((item, i) => ({
    ...item,
    value: item.value
      .replace("{rating}", reviewStats.averageRating)
      .replace("{reviewCount}", reviewStats.totalReviews),
    Icon: TRUST_ICONS[i] ?? Star,
  }));

  const ctaNoteParts = cta.note?.split("{phone}");

  const [bentoFeatured, ...bentoRest] = bento.cards;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title={`About Us | ${siteSettings.businessName}`}
        description={pageDescription}
        path="/about"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About us", path: "/about" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${siteSettings.businessName}`,
          description: pageDescription,
          url: `${siteSettings.baseUrl}/about`,
          mainEntity: { "@id": `${siteSettings.baseUrl}/#organization` },
        }}
      />

      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20">
          <div className="absolute inset-0 z-0">
            <img
              src={imgThermal}
              alt=""
              className="h-full w-full object-cover opacity-[0.38]"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/35 via-primary/70 to-primary" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="mb-4 inline-flex shrink-0 animate-fade-in items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                {hero.badge}
              </div>
              <h1 className="animate-fade-in mb-4 font-display text-3xl font-black leading-[1.1] text-primary-foreground sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              <p className="animate-fade-in mb-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:mb-8 sm:text-lg md:text-xl">
                {hero.description}
              </p>
              {hero.trustChips && hero.trustChips.length > 0 ? (
                <div className="mb-8 flex max-w-2xl flex-wrap justify-center gap-2 animate-fade-in">
                  {hero.trustChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground/95 sm:text-sm"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="flex animate-fade-in flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-xl bg-accent px-6 text-base font-bold text-accent-foreground shadow-xl shadow-accent/25 hover:bg-accent/90 sm:h-14 sm:px-8 sm:text-lg"
                >
                  <Link to="/get-quote" className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    {hero.ctaPrimary}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-primary-foreground/20 bg-primary-foreground/5 px-6 text-base font-bold text-primary-foreground hover:bg-primary-foreground/10 sm:h-14 sm:px-8 sm:text-lg"
                >
                  <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    {hero.ctaSecondary}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-b border-border bg-card py-8 md:py-10">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <item.Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xl font-black tabular-nums text-foreground">{item.value}</p>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value split + image */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-accent/15 text-accent hover:bg-accent/20">{valueSplit.badge}</Badge>
                <h2 className="mb-6 font-display text-2xl font-black text-foreground md:text-3xl lg:text-4xl">
                  {valueSplit.title}
                </h2>
                <div className="mb-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {valueSplit.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <ul className="mb-8 space-y-3">
                  {valueSplit.bullets.map((line) => (
                    <li key={line} className="flex gap-3 text-base text-foreground md:text-lg">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="rounded-xl font-bold">
                  <Link to={valueSplit.ctaPath} className="gap-2">
                    {valueSplit.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-lg">
                  <img
                    src={resolveImageKey(valueSplit.imageKey)}
                    alt={valueSplit.imageAlt}
                    className="aspect-[4/3] w-full object-cover"
                    width={960}
                    height={720}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story panels — alternating */}
        {storyPanels.map((panel, idx) => {
          const imgSrc = resolveImageKey(panel.imageKey);
          const imageOnLeft = panel.imagePosition === "left";
          return (
            <section
              key={panel.title}
              className={cn(
                "border-y border-border py-12 md:py-20",
                idx % 2 === 0 ? "bg-section-alt" : "bg-background"
              )}
            >
              <div className="container mx-auto px-4">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border border-border bg-card shadow-md",
                      !imageOnLeft && "lg:order-2"
                    )}
                  >
                    <img
                      src={imgSrc}
                      alt={panel.imageAlt}
                      className="aspect-[4/3] w-full object-cover"
                      width={960}
                      height={720}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={cn(!imageOnLeft && "lg:order-1")}>
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">{panel.badge}</p>
                    <h2 className="mb-4 font-display text-2xl font-black text-foreground md:text-3xl lg:text-4xl">
                      {panel.title}
                    </h2>
                    <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">{panel.body}</p>
                    <Button asChild variant="outline" size="lg" className="rounded-xl border-2 font-bold">
                      <Link to={panel.ctaPath} className="gap-2">
                        {panel.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Bento */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-3xl">
              <h2 className="mb-3 font-display text-2xl font-black text-foreground md:text-3xl lg:text-4xl">{bento.title}</h2>
              <p className="text-lg text-muted-foreground">{bento.subtitle}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:grid-rows-2">
              {bentoFeatured ? (
                <Link
                  to={bentoFeatured.ctaPath}
                  className="group relative flex min-h-[280px] overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-shadow hover:shadow-lg lg:row-span-2"
                >
                  <img
                    src={resolveImageKey(bentoFeatured.imageKey)}
                    alt={bentoFeatured.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/25" />
                  <div className="relative mt-auto flex flex-col gap-2 p-6 md:p-8">
                    <h3 className="font-display text-xl font-black text-primary-foreground md:text-2xl">{bentoFeatured.title}</h3>
                    <p className="text-sm text-primary-foreground/90 md:text-base">{bentoFeatured.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-accent">
                      {bentoFeatured.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ) : null}

              {bentoRest.map((card) => (
                <Link
                  key={card.title}
                  to={card.ctaPath}
                  className="group relative flex min-h-[200px] overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-shadow hover:shadow-lg"
                >
                  <img
                    src={resolveImageKey(card.imageKey)}
                    alt={card.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                  <div className="relative mt-auto p-5 md:p-6">
                    <h3 className="mb-1 font-display text-lg font-black text-foreground md:text-xl">{card.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{card.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-accent">
                      {card.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-border bg-muted/40 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-3 font-display text-2xl font-black text-foreground md:text-3xl lg:text-4xl">{process.title}</h2>
              <p className="text-lg text-muted-foreground">{process.subtitle}</p>
            </div>
            <ol className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
              {process.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-card p-6 pl-8 shadow-sm"
                >
                  <span
                    className="absolute left-0 top-6 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-accent font-display text-sm font-black text-accent-foreground"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <h3 className="mb-2 font-display text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex justify-center">
              <Button asChild size="lg" className="rounded-xl font-bold">
                <Link to="/get-quote">Book the right survey scope</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Objections */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center font-display text-2xl font-black text-foreground md:text-3xl">
              {objections.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {objections.items.map((item) => (
                <Card key={item.title} className="border-2 border-border bg-card shadow-sm">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <Shield className="h-5 w-5" />
                    </div>
                    <CardTitle className="font-display text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-t border-border bg-section-alt py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center font-display text-2xl font-black text-foreground md:text-3xl lg:text-4xl">
              {teamHeading}
            </h2>
            <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {teamRoles.map((item, i) => {
                const Icon = ROLE_ICONS[i] ?? Shield;
                return (
                  <Card
                    key={item.role}
                    className="border-2 border-border bg-card transition-shadow hover:shadow-md"
                  >
                    <CardHeader className="gap-3 sm:flex-row sm:items-start">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div className="min-w-0 space-y-2">
                        <CardTitle className="font-display text-lg text-card-foreground md:text-xl">{item.role}</CardTitle>
                        <CardDescription className="text-base text-muted-foreground">{item.detail}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="overflow-hidden rounded-2xl border border-border shadow-md">
                <img
                  src={resolveImageKey(partners.imageKey)}
                  alt={partners.imageAlt}
                  className="aspect-[4/3] w-full object-cover"
                  width={960}
                  height={720}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h2 className="mb-4 font-display text-2xl font-black text-foreground md:text-3xl">{partners.title}</h2>
                <p className="mb-4 text-lg text-muted-foreground">{partners.intro}</p>
                <p className="mb-8 text-base leading-relaxed text-foreground">{partners.body}</p>
                <div className="flex flex-wrap gap-2">
                  {partners.partnerNames.map((name) => (
                    <Badge
                      key={name}
                      variant="outline"
                      className="border-accent/40 bg-card px-3 py-1.5 text-sm font-semibold text-foreground"
                    >
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="border-y border-border bg-primary py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <QuoteIcon className="mx-auto mb-4 h-10 w-10 text-accent" aria-hidden />
              <blockquote className="mb-6 font-display text-xl font-medium leading-relaxed text-primary-foreground md:text-2xl">
                “{testimonial.quote}”
              </blockquote>
              <p className="mb-8 text-sm font-semibold text-primary-foreground/80">
                {testimonial.author}
                {testimonial.role ? <span className="text-primary-foreground/60"> · {testimonial.role}</span> : null}
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-primary-foreground/30 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to={testimonial.ctaPath}>{testimonial.ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ teaser */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-2 font-display text-2xl font-black text-foreground md:text-3xl">{faqTeaser.title}</h2>
              <p className="text-muted-foreground">{faqTeaser.subtitle}</p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {faqTeaser.items.map((item) => (
                <Card key={item.question} className="border-2 border-border text-left shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-display text-lg">{item.question}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">{item.answer}</CardDescription>
                    <Link
                      to={item.linkPath}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-accent hover:underline"
                    >
                      {item.linkText}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-border bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="space-y-6 text-base leading-relaxed text-foreground md:text-lg">
              {closing.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container mx-auto max-w-2xl px-4 text-center">
            <h2 className="mb-4 font-display text-2xl font-black text-primary-foreground md:text-3xl">{cta.title}</h2>
            <p className="mb-8 text-primary-foreground/85 md:text-lg">{cta.description}</p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90 sm:h-14"
              >
                <Link to="/get-quote">{cta.primaryText}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10 sm:h-14"
              >
                <Link to="/contact">{cta.secondaryText}</Link>
              </Button>
            </div>
            {ctaNoteParts && ctaNoteParts.length >= 2 ? (
              <p className="mt-6 text-sm text-primary-foreground/75">
                {ctaNoteParts[0]}
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="font-semibold text-accent underline-offset-4 hover:underline"
                >
                  {phoneDisplay}
                </a>
                {ctaNoteParts[1]}
              </p>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
