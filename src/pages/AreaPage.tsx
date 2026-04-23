import { useParams, Navigate, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { getAreaBySlug, areas, getAreaImage } from "@/data/areas";
import { siteSettings } from "@/data/siteSettings";
import { reviewStats } from "@/data/reviews";
import Header from "@/components/Header";
import TopBanner from "@/components/TopBanner";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import ReviewShowcase from "@/components/ReviewShowcase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { 
  MapPin, 
  CheckCircle2, 
  Navigation, 
  Phone, 
  Clock, 
  Shield, 
  Star, 
  ArrowRight,
  Droplets,
  Flame,
  Wrench,
  Hammer,
  FileText,
  BadgeCheck,
  Truck,
  MessageCircle,
  Construction,
  Zap
} from "lucide-react";

import brandedVan from "@/assets/general/damp-rising-damp-exterior.webp";
import ctaBackground from "@/assets/general/damp-survey-thermal-imaging.webp";
import GoogleIcon from "@/components/GoogleIcon";

import { getAreaPageContent } from "@/data/content";

const AreaPage = () => {
  const { areaSlug } = useParams<{ areaSlug: string }>();
  const area = areaSlug ? getAreaBySlug(areaSlug) : null;

  if (!area) {
    return <Navigate to="/404" replace />;
  }

  const areaPage = getAreaPageContent(
    area.name,
    area.postcodes.join(", "),
    area.emergencyTime
  );

  const localServicesIcons = [Droplets, Zap, FileText, Construction];
  const localServices = [
    { icon: localServicesIcons[0], title: "Independent Surveys", desc: "Diagnosis-led damp and mould investigations" },
    { icon: localServicesIcons[1], title: "Moisture Diagnostics", desc: "Technical assessment of damp mechanisms and building defects" },
    { icon: localServicesIcons[2], title: "Remedial Specifications", desc: "Clear written recommendations for the right next steps" },
    { icon: localServicesIcons[3], title: "Project Support", desc: "Guidance for homeowners, buyers, landlords and property professionals" }
  ];

  const areaServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Independent Damp Survey in ${area.name}`,
    description:
      area.description ||
      `Independent damp, mould and moisture diagnostics in ${area.name}.`,
    provider: {
      "@id": `${siteSettings.baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "Place",
      name: area.name,
      containsPlace: area.postcodes.map((postcode) => ({
        "@type": "Place",
        name: postcode,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title={
          area.metaTitle ||
          `Independent Damp Surveys in ${area.name} | ${siteSettings.businessName}`
        }
        description={
          area.metaDescription ||
          `Independent damp, mould and moisture diagnostics in ${area.name}. Call ${siteSettings.phone}.`
        }
        path={`/locations/${area.slug}`}
        image={getAreaImage(area.slug) || brandedVan}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: area.name, path: `/locations/${area.slug}` },
        ]}
        schema={areaServiceSchema}
      />
      {/* <TopBanner areaName={area.name} /> */}
      <Header />
      
      <main>
        {/* Hero Section - matches portfolio */}
        <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img 
              src={getAreaImage(area.slug) || ctaBackground} 
              alt={`${siteSettings.businessName} coverage in ${area.name}`} 
              className="w-full h-full object-cover opacity-40"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 animate-fade-in shrink-0">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden />
              {areaPage.hero.badge}
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in inline-flex flex-wrap items-center justify-center gap-3">
              {areaPage.hero.title}{" "}
              <span className="text-accent relative inline-block">
                in {area.name}
                <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/20 -z-10 -rotate-1" aria-hidden="true" />
              </span>
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
              {area.description || `Independent damp, mould and moisture support for ${area.name} and the surrounding area.`}
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg shadow-xl shadow-accent/25">
                <Link to="/get-quote">Request Advice</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg">
                <a href="#process">Understand the approach</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Trust Stats - Matched to ServicesPage */}
        <section className="-mt-8 sm:-mt-12 relative z-20 pb-12 sm:pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8">
              {[
                { label: "Approach", value: "Independent", icon: Clock },
                { label: "Method", value: "Evidence-led", icon: Shield },
                { label: "Reporting", value: "Clear", icon: GoogleIcon },
                { label: "Coverage", value: area.name, icon: MapPin }
              ].map((stat, index) => (
                <Card key={index} className="border-none shadow-2xl shadow-primary/10 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8 flex items-center gap-2 sm:gap-3 md:gap-6">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-black text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground leading-none truncate">{stat.value}</div>
                      <div className="text-muted-foreground font-bold uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs leading-none truncate">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Review Showcase */}
        <div id="reviews">
          <ReviewShowcase />
        </div>

        {/* SECTION 3: BLUE - The Local Difference */}
        <section className="py-12 md:py-24 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="lg:col-span-7">
                <Badge className="bg-accent-gradient text-accent-foreground border-none mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-sm font-bold shadow-lg shadow-accent/10 uppercase tracking-wider">{areaPage.localDifference.badge}</Badge>
<h2 className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground mb-6 md:mb-8 leading-tight">
                {areaPage.localDifference.title}
                </h2>
                
                <div className="space-y-6 md:space-y-8">
                  <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
                    {area.localContext || `From the historic properties in ${area.name} to the latest modern developments, our team understands the surfaces and architectural styles common in the area.`}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    {localServices.map((service, i) => (
                      <div key={i} className="group bg-primary-foreground/10 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-primary-foreground/25 shadow-sm hover:border-accent/50 hover:bg-primary-foreground/15 transition-all">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-accent-gradient rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 text-accent-foreground shadow-lg shadow-accent/10">
                          <service.icon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <h3 className="font-bold text-base md:text-lg mb-1.5 md:mb-2 text-primary-foreground group-hover:text-accent transition-colors">{service.title}</h3>
                        <p className="text-xs md:text-sm text-primary-foreground/80">{service.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative mt-8 md:mt-0">
                <div className="relative z-10 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 border-4 border-primary-foreground/10 group">
                  <img src={brandedVan} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" alt={`${siteSettings.businessName} survey team in ${area.name}`} width={960} height={1200} decoding="async" />
                </div>
                <div className="absolute inset-0 bg-accent-gradient rounded-2xl md:rounded-[2.5rem] -rotate-2 z-0 opacity-20" />
                
                <div className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 bg-card p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl z-20 max-w-[220px] md:max-w-[280px] border border-accent/20">
                  <div className="flex items-center gap-0.5 mb-2 md:mb-3">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 md:w-5 md:h-5 fill-accent text-accent" />)}
                  </div>
                    <p className="text-xs md:text-sm italic text-muted-foreground mb-3 md:mb-4 font-medium leading-relaxed">
                    "They gave us a much clearer explanation of the moisture problem than any previous advice had managed."
                  </p>
                  <p className="text-[10px] md:text-xs font-bold text-foreground uppercase tracking-wider">— Independent review theme</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DARK - Neighborhood Guide */}
        <section className="py-12 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6">
              <div className="max-w-2xl">
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-3 md:mb-4">{areaPage.neighborhoodGuide.title}</h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  {areaPage.neighborhoodGuide.description}
                </p>
              </div>
              <Button asChild variant="outline" className="w-fit border-accent text-accent hover:bg-accent-gradient hover:text-accent-foreground rounded-xl h-11 md:h-12 px-5 md:px-6 text-sm">
                <Link to="/locations" className="flex items-center gap-2">
                  {areaPage.neighborhoodGuide.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 md:gap-6">
                {(area.landmarks || ["High Street", "Train Station", "Local Parks"]).map((landmark, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-muted rounded-xl md:rounded-2xl border-2 border-border hover:border-accent/30 hover:bg-muted hover:shadow-xl transition-all group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-card flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform border border-border group-hover:border-accent/20">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-foreground">{landmark}</h3>
                      <p className="text-[10px] md:text-xs text-muted-foreground font-medium">{areaPage.neighborhoodGuide.landmarkSubtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="bg-card text-card-foreground border-2 border-border rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl shadow-primary/15 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardContent className="p-6 md:p-8 relative z-10">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <Navigation className="text-accent w-5 h-5 md:w-6 md:h-6" />
                    <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">{areaPage.neighborhoodGuide.hubsTitle}</h3>
                  </div>
                  <ul className="space-y-3 md:space-y-4">
                    {(area.neighborhoods || area.postcodes).map((n, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground/90 pb-3 md:pb-4 border-b border-border last:border-0 last:pb-0 text-sm md:text-base font-medium group cursor-default">
                        <CheckCircle2 className="text-accent w-4 h-4 md:w-5 md:h-5 shrink-0 group-hover:scale-110 transition-transform" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="process" className="py-12 md:py-24 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <Badge className="bg-accent-gradient text-accent-foreground border-none mb-3 md:mb-4 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-sm font-bold uppercase tracking-wider">{areaPage.process.badge}</Badge>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground mb-3 md:mb-4">{areaPage.process.title}</h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-base md:text-lg">{areaPage.process.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary-foreground/10 -translate-y-1/2 z-0" />
              {areaPage.process.steps.map((item, i) => {
                const stepIcons = [Phone, Truck, BadgeCheck];
                const Icon = stepIcons[i];
                return (
                  <div key={i} className="relative z-10 bg-primary-foreground/5 backdrop-blur-md p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-primary-foreground/10 text-center hover:bg-primary-foreground/10 transition-all hover:border-accent/30 group">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-accent-gradient text-accent-foreground rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl md:text-2xl font-bold shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 md:w-10 md:h-10" />
                    </div>
                    <p className="text-accent font-black text-[10px] md:text-sm uppercase tracking-widest mb-1.5 md:mb-2">Step {item.step}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-3 md:mb-4 group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
              <div className="min-w-0">
                <Badge className="bg-accent-gradient text-accent-foreground border-none mb-3 md:mb-4 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-sm font-bold uppercase tracking-widest">{areaPage.faq.badge}</Badge>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-6 md:mb-8">{areaPage.faq.title}</h2>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { q: `Do you cover ${area.name}?`, a: `Yes. We support ${area.name} and surrounding areas as part of our wider London, Home Counties and Midlands consultancy coverage.` },
                    { q: "How do you approach diagnosis here?", a: "The same way we do everywhere else: by understanding the building, gathering the right evidence, and explaining the correct next step without a sales agenda." },
                    { q: "Do you offer fixed prices?", a: "Survey fees depend on the property, the issue and the level of reporting required. We explain scope clearly before any booking is confirmed." }
                  ].map((faq, i) => (
                    <div key={i} className="p-4 md:p-6 bg-primary/5 rounded-xl md:rounded-2xl border border-transparent hover:border-accent/30 hover:bg-primary/10 hover:shadow-md transition-all group min-w-0">
                      <h3 className="font-bold text-sm md:text-base text-foreground mb-2 md:mb-3 flex items-center gap-2 md:gap-3 group-hover:text-accent transition-colors">
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                        {faq.q}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-6 md:pl-8">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-w-0 mt-8 lg:mt-0">
                <div className="bg-primary rounded-2xl lg:rounded-[3rem] p-6 md:p-12 text-primary-foreground h-full flex flex-col justify-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-4 md:p-8 opacity-10 rotate-12 text-accent pointer-events-none">
                    <Construction className="w-32 h-32 md:w-64 md:h-64" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-accent" />
                  <h3 className="text-xl md:text-4xl font-display font-bold mb-4 md:mb-6 relative z-10">
                    {areaPage.faq.planningTitle}
                  </h3>
                  <p className="text-base md:text-xl text-primary-foreground/70 mb-6 md:mb-10 leading-relaxed relative z-10">{areaPage.faq.planningDescription}</p>
                  <Button asChild size="lg" className="bg-accent-gradient hover:opacity-90 text-accent-foreground w-fit rounded-xl md:rounded-2xl h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-bold shadow-xl shadow-accent/20 relative z-10 transition-transform hover:scale-105 active:scale-95">
                    <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center gap-2 md:gap-3">
                      <FileText className="w-4 h-4 md:w-5 md:h-5" />
                      {areaPage.faq.planningCTA}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16 bg-primary border-y border-primary-foreground/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 opacity-30" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <p className="text-primary-foreground/60 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-[10px] md:text-xs">{areaPage.trustRow}</p>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-accent-gradient text-accent-foreground relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-primary-foreground/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="font-display font-extrabold text-3xl md:text-6xl mb-4 md:mb-8">
                {areaPage.finalCTA.title}
            </h2>
            <p className="text-lg md:text-3xl mb-8 md:mb-12 opacity-90 font-medium max-w-3xl mx-auto leading-relaxed">
              {areaPage.finalCTA.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
              <a 
                href={`tel:${siteSettings.phoneFormatted}`}
                className="group flex items-center gap-4 md:gap-6 bg-primary text-primary-foreground px-8 py-4 md:px-10 md:py-6 rounded-2xl md:rounded-[2rem] text-xl md:text-3xl font-display font-extrabold hover:scale-105 transition-all shadow-2xl shadow-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-accent-gradient rounded-full flex items-center justify-center text-accent-foreground group-hover:rotate-12 transition-transform">
                  <Phone className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                {siteSettings.phone}
              </a>
              <div className="text-left hidden md:block space-y-2">
                {areaPage.finalCTA.points.map((point, i) => (
                  <p key={i} className="font-black text-xl flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent" /> {point}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <MobileCallButton />
    </div>
  );
};

export default AreaPage;
