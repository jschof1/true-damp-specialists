import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Phone, Quote, ShieldCheck } from "lucide-react";
import { siteSettings } from "@/data/siteSettings";
import { getAboutPageContent } from "@/data/content";

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

function resolveImageKey(key: string): string {
  return ABOUT_IMAGES[key] ?? imgThermal;
}

const AboutPage = () => {
  const about = getAboutPageContent() as {
    seo?: { description?: string };
    hero: {
      badge: string;
      title: string;
      description: string;
      additionalLine?: string;
      trustChips?: string[];
      ctaPrimary: string;
      ctaSecondary: string;
    };
    trustStrip: { items: { label: string; value: string; hint: string }[] };
    positioningStrip?: { label: string; text: string; supportingText: string };
    iconBoxes?: { title: string; description: string }[];
    valueSplit: {
      badge: string;
      title: string;
      paragraphs: string[];
      bullets: string[];
      imageKey: string;
      imageAlt: string;
      ctaLabel: string;
      ctaPath: string;
    };
    storyPanels: {
      badge: string;
      title: string;
      body: string;
      imageKey: string;
      imageAlt: string;
      ctaLabel: string;
      ctaPath: string;
      imagePosition: "left" | "right";
    }[];
    bento: {
      title: string;
      subtitle: string;
      closingLine?: string;
      cards: {
        title: string;
        description: string;
        imageKey: string;
        imageAlt: string;
        ctaLabel: string;
        ctaPath: string;
      }[];
    };
    process: { title: string; subtitle: string; steps: { title: string; description: string }[] };
    objections: { title: string; items: { title: string; description: string }[] };
    teamHeading: string;
    teamRoles: { role: string; detail: string }[];
    partners: {
      title: string;
      intro: string;
      body: string;
      partnerNames: string[];
      imageKey: string;
      imageAlt: string;
    };
    testimonial: {
      eyebrow?: string;
      quote: string;
      author: string;
      role: string;
      ctaLabel: string;
      ctaPath: string;
    };
    faqTeaser: {
      title: string;
      subtitle: string;
      items: { question: string; answer: string; linkText: string; linkPath: string }[];
    };
    closing: string[];
    cta: {
      title: string;
      description: string;
      primaryText: string;
      secondaryText: string;
    };
  };

  const pageDescription =
    about.seo?.description ??
    "Independent damp specialists with PCA-trained surveyors, engineers and waterproofing designers.";

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
        <section className="relative overflow-hidden bg-primary pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20">
          <div className="absolute inset-0 z-0">
            <img
              src={imgThermal}
              alt=""
              className="h-full w-full object-cover opacity-[0.35]"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/35 via-primary/70 to-primary" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground sm:px-4 sm:py-2 sm:text-sm">
                <ShieldCheck className="h-4 w-4" />
                {about.hero.badge}
              </div>
              <h1 className="mt-4 font-display text-3xl font-black leading-tight text-primary-foreground sm:text-4xl md:text-6xl">
                {about.hero.title}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg md:text-xl">
                {about.hero.description}
              </p>
              {about.hero.additionalLine ? (
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
                  {about.hero.additionalLine}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {about.hero.trustChips?.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground sm:text-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                  <Link to="/get-quote">{about.hero.ctaPrimary}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                  <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    {about.hero.ctaSecondary}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {about.positioningStrip ? (
          <section className="border-b border-border bg-card py-8">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                <p className="text-xs font-black uppercase tracking-widest text-accent">
                  {about.positioningStrip.label}
                </p>
                <h2 className="mt-3 font-display text-2xl font-black text-foreground md:text-4xl">
                  {about.positioningStrip.text}
                </h2>
                <p className="mt-3 text-base text-muted-foreground md:text-lg">
                  {about.positioningStrip.supportingText}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {about.iconBoxes?.length ? (
          <section className="py-8 md:py-10">
            <div className="container mx-auto px-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {about.iconBoxes.map((item) => (
                  <Card key={item.title} className="border-2 border-border bg-card shadow-sm">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-b border-border bg-card py-8 md:py-10">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {about.trustStrip.items.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-background p-4 shadow-sm">
                  <p className="font-display text-xl font-black text-foreground">{item.value}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-widest text-accent">
                  {about.valueSplit.badge}
                </p>
                <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                  {about.valueSplit.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {about.valueSplit.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <ul className="mt-6 space-y-3">
                  {about.valueSplit.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-foreground md:text-base">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
                <img
                  src={resolveImageKey(about.valueSplit.imageKey)}
                  alt={about.valueSplit.imageAlt}
                  className="aspect-[4/3] w-full object-cover"
                  width={960}
                  height={720}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {about.storyPanels.map((panel, index) => (
          <section key={panel.title} className={index % 2 === 0 ? "bg-muted py-12 md:py-20" : "py-12 md:py-20"}>
            <div className="container mx-auto px-4">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <div className={panel.imagePosition === "left" ? "lg:order-1" : "lg:order-2"}>
                  <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
                    <img
                      src={resolveImageKey(panel.imageKey)}
                      alt={panel.imageAlt}
                      className="aspect-[4/3] w-full object-cover"
                      width={960}
                      height={720}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className={panel.imagePosition === "left" ? "lg:order-2" : "lg:order-1"}>
                  <p className="text-xs font-black uppercase tracking-widest text-accent">{panel.badge}</p>
                  <h2 className="mt-3 font-display text-2xl font-black text-foreground md:text-4xl">
                    {panel.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {panel.body.split("\n\n").map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {about.bento.title}
              </h2>
              <div className="mt-4 space-y-4">
                {about.bento.subtitle.split("\n").map((line) => (
                  <p key={line} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {about.bento.cards.map((card) => (
                <Card key={card.title} className="border-2 border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 overflow-hidden rounded-2xl">
                      <img
                        src={resolveImageKey(card.imageKey)}
                        alt={card.imageAlt}
                        className="aspect-[4/3] w-full object-cover"
                        width={640}
                        height={480}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">{card.title}</h3>
                    <div className="mt-3 space-y-4">
                      {card.description.split("\n\n").map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {about.bento.closingLine ? (
              <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-foreground md:text-lg">
                {about.bento.closingLine}
              </p>
            ) : null}
          </div>
        </section>

        <section className="bg-muted py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {about.process.title}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                {about.process.subtitle}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {about.process.steps.map((step) => (
                <Card key={step.title} className="border-2 border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {about.objections.title}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {about.objections.items.map((item) => (
                <Card key={item.title} className="border-2 border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center font-display text-2xl font-black text-foreground md:text-4xl">
              {about.teamHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {about.teamRoles.map((role) => (
                <Card key={role.role} className="border-2 border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground">{role.role}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{role.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
                <img
                  src={resolveImageKey(about.partners.imageKey)}
                  alt={about.partners.imageAlt}
                  className="aspect-[4/3] w-full object-cover"
                  width={960}
                  height={720}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                  {about.partners.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {about.partners.intro.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {paragraph}
                    </p>
                  ))}
                  {about.partners.body.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {about.partners.partnerNames.map((name) => (
                    <span key={name} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-primary py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            {about.testimonial.eyebrow ? (
              <p className="mb-4 text-xs font-black uppercase tracking-widest text-accent">
                {about.testimonial.eyebrow}
              </p>
            ) : null}
            <Quote className="mx-auto h-10 w-10 text-accent" />
            <blockquote className="mx-auto mt-4 max-w-3xl font-display text-xl font-medium leading-relaxed text-primary-foreground md:text-2xl">
              “{about.testimonial.quote}”
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-primary-foreground/75">
              {about.testimonial.author}
              {about.testimonial.role ? <span className="text-primary-foreground/55"> · {about.testimonial.role}</span> : null}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {about.faqTeaser.title}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                {about.faqTeaser.subtitle}
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {about.faqTeaser.items.map((item) => (
                <Card key={item.question} className="border-2 border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground">{item.question}</h3>
                    <div className="mt-3 space-y-4">
                      {item.answer.split("\n\n").map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <Link to={item.linkPath} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline">
                      {item.linkText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="space-y-6 text-base leading-relaxed text-foreground md:text-lg">
              {about.closing.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl font-black text-primary-foreground md:text-4xl">
              {about.cta.title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {about.cta.description.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                <Link to="/get-quote">{about.cta.primaryText}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`tel:${siteSettings.phone}`}>{about.cta.secondaryText}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
