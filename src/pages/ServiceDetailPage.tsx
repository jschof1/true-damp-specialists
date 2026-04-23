import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import TopBanner from "@/components/TopBanner";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import TrustBar from "@/components/TrustBar";
import FinalCTA from "@/components/FinalCTA";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Phone, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Award,
  MapPin,
  ArrowRight,
  PoundSterling,
  ChevronRight,
  Zap,
  Info,
  MessageCircle,
  ShieldCheck,
  Map,
  Star
} from "lucide-react";

import { getServiceBySlug, getRelatedServices } from "@/data/services";
import { areas } from "@/data/areas";
import { siteSettings } from "@/data/siteSettings";

import ctaBackground from "@/assets/general/damp-survey-thermal-imaging.webp";
import GoogleIcon from "@/components/GoogleIcon";

const serviceImages: Record<string, string> = {
  "independent-damp-mould-surveys": "/assets/true-damp-service-survey.jpeg",
  "moisture-diagnostics-building-pathology": "/assets/true-damp-service-diagnostics.jpeg",
  "mould-remediation-condensation-control": "/assets/true-damp-service-mould.jpeg",
  "basement-below-ground-waterproofing": "/assets/true-damp-service-diagnostics.jpeg",
  "external-defects-drainage-weathering": "/assets/true-damp-service-external.jpeg",
  "remedial-specifications-project-support": "/assets/true-damp-service-specifications.jpeg",
};

import { getServiceDetailPageContent } from "@/data/content";

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const serviceDetailPage = getServiceDetailPageContent(
    service.title.replace(" London", "")
  );
  const relatedServices = getRelatedServices(service.relatedServices);
  const heroImage = serviceImages[service.slug] || "/assets/true-damp-service-survey.jpeg";
  const ServiceIcon = service.icon;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    provider: {
      "@id": `${siteSettings.baseUrl}/#organization`,
    },
    areaServed: service.areas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const trustStatsIcons = [GoogleIcon, Award, Clock, Shield];
  const trustStats = [
    { value: "Independent", label: serviceDetailPage.stats.rating, icon: trustStatsIcons[0] },
    { value: "Evidence-led", label: serviceDetailPage.stats.experience, icon: trustStatsIcons[1] },
    { value: "Specialist", label: serviceDetailPage.stats.availability, icon: trustStatsIcons[2] },
    { value: "Clear", label: serviceDetailPage.stats.insured, icon: trustStatsIcons[3] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
        image={heroImage}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        schema={[serviceSchema, faqSchema]}
      />

      {/* <TopBanner /> */}
      <Header />
      
      <main>
      {/* Hero Section - matches portfolio */}
        <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt={`${service.title} by ${siteSettings.businessName}`} 
              className="w-full h-full object-cover opacity-40"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 animate-fade-in shrink-0">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden />
              {serviceDetailPage.hero.badge}
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in">
              {serviceDetailPage.hero.title}
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
              {service.heroDescription}
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg shadow-xl shadow-accent/25">
                <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call the Survey Team
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg">
                <a href="#pricing">{serviceDetailPage.hero.ctaSecondary}</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats Bar */}
        <section className="bg-card py-6 sm:py-8 md:py-12 border-b border-border relative z-20">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {trustStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                  <div className="font-display font-black text-lg sm:text-xl md:text-2xl text-foreground mb-0.5 sm:mb-1 leading-none">{stat.value}</div>
                  <div className="text-muted-foreground font-bold uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs leading-none">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Service Details Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="relative">
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                 <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6 md:mb-8 leading-tight">
                    {serviceDetailPage.details.title}
                 </h2>
                 <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-10">
                    {service.fullDescription.map((p, i) => (
                      <p key={i}>{p}</p>
                ))}
              </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 sm:gap-3 bg-primary/5 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-border/50 group hover:border-accent/30 transition-all">
                         <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-card flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                         </div>
                         <span className="font-bold text-foreground text-xs sm:text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Card className="border-none shadow-2xl overflow-hidden rounded-2xl sm:rounded-[2.5rem]">
                   <CardContent className="p-0">
                      <div className="bg-primary p-5 sm:p-6 md:p-10 text-primary-foreground">
                         <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-4 italic">{serviceDetailPage.details.guaranteeTitle}</h3>
                         <p className="text-primary-foreground/70 text-sm sm:text-base mb-4 sm:mb-6 md:mb-8">{serviceDetailPage.details.guaranteeDescription}</p>
                         <div className="space-y-2 sm:space-y-4">
                            {serviceDetailPage.details.guaranteePoints.map((text, i) => (
                               <div key={i} className="flex items-center gap-2 sm:gap-3">
                                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
                                  <span className="font-bold text-sm sm:text-base">{text}</span>
                               </div>
                            ))}
                  </div>
                </div>
                      <div className="bg-accent p-4 sm:p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                         <div>
                            <p className="text-accent-foreground/80 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-0.5 sm:mb-1">{serviceDetailPage.details.responseTimeLabel}</p>
                            <p className="text-accent-foreground font-black text-2xl sm:text-3xl">{serviceDetailPage.details.responseTimeValue}</p>
                         </div>
                         <div className="hidden sm:block h-12 w-px bg-accent-foreground/10" />
                         <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-6 sm:px-8 h-12 sm:h-14 rounded-xl w-full sm:w-auto">
                            <a href={`tel:${siteSettings.phoneFormatted.replace(/\s/g, "")}`}>{serviceDetailPage.details.ctaCall}</a>
                         </Button>
                      </div>
                   </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-secondary/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gradient text-accent-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-6">
                <PoundSterling className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {serviceDetailPage.pricing.badge}
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-6">
                {serviceDetailPage.pricing.title}
                </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                {serviceDetailPage.pricing.description}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-xl sm:rounded-2xl md:rounded-[2.5rem] shadow-xl border border-border overflow-hidden">
                <div className="grid divide-y divide-border">
                  {service.pricing.map((item, i) => (
                    <div key={i} className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 hover:bg-primary/5 transition-colors group">
                       <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                             <ServiceIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          </div>
                          <div className="min-w-0">
                             <h3 className="font-black text-base sm:text-lg md:text-xl text-foreground mb-0.5 sm:mb-1">{item.service}</h3>
                             <p className="text-xs sm:text-sm text-muted-foreground">{item.note || "Scope depends on the property, the issue, and the reporting brief."}</p>
                          </div>
                       </div>
                       <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 shrink-0">
                          <div className="text-right">
                             <div className="text-accent font-black text-xl sm:text-2xl md:text-3xl">{item.price}</div>
                             <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{serviceDetailPage.pricing.rateLabel}</div>
                          </div>
                          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm sm:text-base px-4 sm:px-6">
                             <a href={`tel:${siteSettings.phoneFormatted.replace(/\s/g, "")}`}>{serviceDetailPage.pricing.cta}</a>
                          </Button>
                       </div>
                    </div>
                  ))}
                </div>
                <div className="bg-primary p-4 sm:p-6 text-center">
                   <p className="text-primary-foreground/50 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                      {serviceDetailPage.pricing.note}
                   </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-primary relative overflow-hidden">
           <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(hsl(var(--primary-foreground)/0.15)_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>

           <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                 <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-primary-foreground mb-3 sm:mb-6">
                    {serviceDetailPage.process.title}
                 </h2>
                 <p className="text-primary-foreground/60 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
                    {serviceDetailPage.process.description}
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                 {service.process.map((step, i) => (
                    <div key={i} className="bg-primary-foreground/5 border border-primary-foreground/10 p-5 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] text-center hover:bg-primary-foreground/10 transition-all group shadow-2xl">
                       <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl md:rounded-[2rem] bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                          <step.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                       </div>
                       <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent text-accent-foreground text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-6">
                          Step 0{i + 1}
                       </div>
                       <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-foreground mb-2 sm:mb-4 group-hover:text-accent transition-colors">{step.title}</h3>
                       <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">{step.description}</p>
                    </div>
                 ))}
              </div>
                  </div>
        </section>

        {/* Local Coverage Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
               <div className="relative">
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-border border">
                     <img src={ctaBackground} alt={`Coverage area for ${siteSettings.businessName}`} className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover grayscale opacity-50" width={1600} height={900} decoding="async" />
                     <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 to-primary/40 flex items-center justify-center p-6 sm:p-8 md:p-12">
                        <div className="text-center">
                           <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-accent rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-6 text-accent-foreground shadow-2xl">
                              <Map className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                           </div>
                           <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-primary-foreground mb-2 sm:mb-4 italic leading-tight">{serviceDetailPage.coverage.hubTitle}</h3>
                           <p className="text-primary-foreground/70 font-bold uppercase tracking-widest text-xs sm:text-sm">{serviceDetailPage.coverage.hubSubtitle}</p>
                        </div>
                      </div>
                  </div>
                  </div>

               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gradient text-accent-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-6">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {serviceDetailPage.coverage.badge}
                  </div>
                  <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6 md:mb-8 leading-tight">
                    {serviceDetailPage.coverage.title}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                    {serviceDetailPage.coverage.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                     {areas.slice(0, 12).map((area, i) => (
                       <Link 
                         key={i} 
                         to={`/locations/${area.slug}`}
                         className="bg-primary/5 hover:bg-primary/10 border border-border hover:border-accent/30 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-foreground transition-all hover:scale-105"
                      >
                        {area.name}
                       </Link>
                    ))}
                  </div>
                  </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gradient text-accent-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-6">
                  <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {serviceDetailPage.faq.badge}
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
                  {serviceDetailPage.faq.title}
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {service.faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="bg-card rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 border border-border overflow-hidden group data-[state=open]:border-accent/50 transition-all shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-black text-base sm:text-lg md:text-xl text-foreground hover:no-underline py-4 sm:py-5 md:py-6 group-hover:text-accent transition-colors">
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                         <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-primary/10 flex items-center justify-center text-accent group-data-[state=open]:bg-accent group-data-[state=open]:text-accent-foreground transition-all shrink-0">
                            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                         </div>
                         <span className="text-left">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed pb-4 sm:pb-6 md:pb-8 pl-8 sm:pl-10 md:pl-12">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>


      {/* Related Services */}
      {relatedServices.length > 0 && (
          <section className="py-12 sm:py-16 md:py-24 bg-background border-t border-border">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 sm:mb-8 md:mb-12">
                 {serviceDetailPage.related.title}
            </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              {relatedServices.map((related) => {
                const RelatedIcon = related.icon;
                return (
                  <Link 
                    key={related.slug}
                    to={`/services/${related.slug}`}
                    className="group"
                  >
                      <Card className="h-full border-border/40 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden rounded-2xl sm:rounded-3xl text-left bg-muted">
                        <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                        <img 
                            src={serviceImages[related.slug] || kitchenWrapping} 
                          alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 grayscale"
                            width={640}
                            height={480}
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6">
                             <div className="bg-card/95 backdrop-blur-sm p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl">
                                <RelatedIcon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                             </div>
                          </div>
                      </div>
                        <CardContent className="p-4 sm:p-6 md:p-8">
                          <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-foreground mb-2 sm:mb-4 group-hover:text-accent transition-colors leading-tight">
                            {related.title}
                          </h3>
                          <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {related.shortDesc}
                        </p>
                          <span className="text-accent font-black text-xs sm:text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          {serviceDetailPage.related.cta} <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

        <FinalCTA />
      </main>

      <Footer />
      <MobileCallButton />
    </div>
  );
};

export default ServiceDetailPage;
