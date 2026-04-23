import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteSettings } from "@/data/siteSettings";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import heroBackground from "@/assets/general/damp-rising-damp-exterior.webp";
import { getLocationsPageContent } from "@/data/content";

const LocationsPage = () => {
  const page = getLocationsPageContent() as {
    hero: { title: string; subtitle: string; primaryText: string; secondaryText: string };
    intro: { title: string; body: string };
    problems: { title: string; body: string }[];
    approach: { title: string; body: string };
    clients: { title: string; items: string[]; closing: string };
    coverage: { title: string; items: string[]; closing: string };
    finalCta: { description: string; primaryText: string; secondaryText: string };
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.hero.title,
    description: page.intro.body,
    url: `${siteSettings.baseUrl}/locations`,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Damp Problems We Diagnose | ${siteSettings.businessName}`}
        description="Independent, evidence-led damp and moisture investigations across residential, heritage and complex buildings, focused on getting the diagnosis right."
        path="/locations"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ]}
        schema={schema}
      />

      <Header />

      <main>
        <section className="relative overflow-hidden bg-primary pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBackground}
              alt={`${siteSettings.businessName} diagnostic coverage background`}
              className="h-full w-full object-cover opacity-35"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/35 via-primary/75 to-primary" />
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground sm:px-4 sm:py-2 sm:text-sm">
              <MapPin className="h-4 w-4" />
              Diagnosis-led investigations
            </div>
            <h1 className="mx-auto mt-4 max-w-5xl font-display text-3xl font-black leading-tight text-primary-foreground sm:text-4xl md:text-6xl">
              {page.hero.title}
            </h1>
            <div className="mx-auto mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-primary-foreground/80 sm:text-lg md:text-xl">
              {page.hero.subtitle.split("\n").map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                <a href="/get-quote">{page.hero.primaryText}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`tel:${siteSettings.phone}`}>{page.hero.secondaryText}</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-display text-2xl font-black text-foreground md:text-4xl">
                {page.intro.title}
              </h2>
              <div className="mt-4 space-y-4">
                {page.intro.body.split("\n\n").map((paragraph) => (
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
                Damp Problems We Diagnose
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {page.problems.map((problem) => (
                <Card key={problem.title} className="border-2 border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-black text-foreground">{problem.title}</h3>
                    <div className="mt-4 space-y-4">
                      {problem.body.split("\n\n").map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-2 border-border bg-card shadow-sm lg:col-span-1">
                <CardContent className="p-6">
                  <h2 className="font-display text-2xl font-black text-foreground md:text-3xl">
                    {page.approach.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {page.approach.body.split("\n\n").map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border bg-card shadow-sm lg:col-span-1">
                <CardContent className="p-6">
                  <h2 className="font-display text-2xl font-black text-foreground md:text-3xl">
                    {page.clients.title}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {page.clients.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {page.clients.closing}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border bg-card shadow-sm lg:col-span-1">
                <CardContent className="p-6">
                  <h2 className="font-display text-2xl font-black text-foreground md:text-3xl">
                    {page.coverage.title}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {page.coverage.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 space-y-3">
                    {page.coverage.closing.split("\n").map((line) => (
                      <p key={line} className="text-sm leading-relaxed text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <div className="space-y-4 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {page.finalCta.description.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                <a href="/get-quote">{page.finalCta.primaryText}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-2">
                  {page.finalCta.secondaryText}
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

export default LocationsPage;
