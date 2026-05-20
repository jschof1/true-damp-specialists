import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { reportCategories, reportResources, reportsPageContent } from "@/data/reports";
import { siteSettings } from "@/data/siteSettings";
import { BookOpen, Download, FileText, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/general/damp-consultation-report-review.webp";

const featuredReports = reportResources.filter((report) => report.featured);

const ReportsPage = () => {
  const pageDescription = reportsPageContent.seoDescription;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title={`${reportsPageContent.seoTitle} | ${siteSettings.businessName}`}
        description={pageDescription}
        path="/reports"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: reportsPageContent.breadcrumbLabel, path: "/reports" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${reportsPageContent.breadcrumbLabel} | ${siteSettings.businessName}`,
          description: pageDescription,
          url: `${siteSettings.baseUrl}/reports`,
          mainEntity: reportResources.map((report) => ({
            "@type": "CreativeWork",
            name: report.title,
            description: report.description,
            about: report.category,
            ...(report.href ? { url: `${siteSettings.baseUrl}${report.href}`, encodingFormat: "application/pdf" } : {}),
          })),
        }}
      />

      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-primary py-20 md:py-28">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={reportsPageContent.hero.imageAlt}
              className="h-full w-full object-cover opacity-35"
              width={1600}
              height={1000}
              decoding="async"
            />
            <div className="absolute inset-0 bg-primary/60" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-accent">
                <FileText className="h-4 w-4" />
                {reportsPageContent.hero.eyebrow}
              </div>
              <h1 className="font-display text-4xl font-black leading-tight text-primary-foreground md:text-6xl">
                {reportsPageContent.hero.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
                {reportsPageContent.hero.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-black">
                  <a href="#report-library">{reportsPageContent.hero.primaryCta}</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-black"
                  style={{ backgroundColor: "transparent" }}
                >
                  <Link to="/get-quote">{reportsPageContent.hero.secondaryCta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-5 md:grid-cols-3">
              {reportsPageContent.trustCards.map((card) => (
                <Card key={card.title} className="border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <ShieldCheck className="mb-4 h-7 w-7 text-accent" />
                    <h2 className="font-display text-xl font-black text-foreground">{card.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-accent">{reportsPageContent.featured.eyebrow}</p>
                <h2 className="font-display text-3xl font-black text-foreground md:text-5xl">{reportsPageContent.featured.title}</h2>
              </div>
              <p className="max-w-xl text-muted-foreground">
                {reportsPageContent.featured.description}
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {featuredReports.map((report) => (
                <article
                  key={report.title}
                  className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-xl"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent">
                      {report.category}
                    </span>
                    <FileText className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-black leading-tight text-foreground group-hover:text-accent">
                    {report.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{report.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <p className="text-xs font-black uppercase tracking-widest text-foreground">{report.status}</p>
                    {report.href ? (
                      <Button asChild size="sm" variant="outline" className="h-9 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        <a href={report.href} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          PDF
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="report-library" className="bg-background py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <BookOpen className="h-7 w-7" />
              </div>
              <h2 className="font-display text-3xl font-black text-foreground md:text-5xl">{reportsPageContent.library.title}</h2>
              <p className="mt-4 text-muted-foreground">
                {reportsPageContent.library.description}
              </p>
            </div>

            <div className="space-y-12">
              {reportCategories.map((category) => {
                const reports = reportResources.filter((report) => report.category === category);
                return (
                  <div key={category}>
                    <h3 className="mb-5 font-display text-2xl font-black text-foreground">{category}</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {reports.map((report) => (
                        <article
                          key={report.title}
                          className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-md"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-accent group-hover:bg-accent group-hover:text-accent-foreground">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="font-display text-lg font-black leading-tight text-foreground group-hover:text-accent">
                                {report.title}
                              </h4>
                              <span className="mt-1 shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-accent">
                                {report.href ? "PDF" : "Soon"}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{report.description}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{report.status}</p>
                              {report.href ? (
                                <a
                                  href={report.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-accent hover:text-foreground"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  Open PDF
                                </a>
                              ) : null}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-black text-primary-foreground md:text-5xl">
                {reportsPageContent.cta.title}
              </h2>
              <p className="mt-4 text-primary-foreground/75">
                {reportsPageContent.cta.description}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-black">
                  <Link to="/get-quote">{reportsPageContent.cta.primaryText}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-black"
                  style={{ backgroundColor: "transparent" }}
                >
                  <a href={`tel:${siteSettings.phone}`}>{reportsPageContent.cta.secondaryPrefix} {siteSettings.phoneFormatted}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReportsPage;
