import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import TopBanner from "@/components/TopBanner";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import GoogleIcon from "@/components/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";
import { siteSettings } from "@/data/siteSettings";
import { 
  Phone, 
  CheckCircle2, 
  Shield, 
  Award,
  Star,
  ArrowRight,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  ThumbsUp,
  Settings
} from "lucide-react";

import ctaBackground from "@/assets/general/damp-survey-thermal-imaging.webp";
import teamPortrait from "@/assets/general/damp-consultation-report-review.webp";

import { getServicesPageContent } from "@/data/content";

// Map service slugs to images
const serviceImages: Record<string, string> = {
  "independent-damp-mould-surveys": "/assets/true-damp-service-survey.jpeg",
  "moisture-diagnostics-building-pathology": "/assets/true-damp-service-diagnostics.jpeg",
  "mould-remediation-condensation-control": "/assets/true-damp-service-mould.jpeg",
  "basement-below-ground-waterproofing": "/assets/true-damp-service-waterproofing.jpeg",
  "external-defects-drainage-weathering": "/assets/true-damp-service-external.jpeg",
  "remedial-specifications-project-support": "/assets/true-damp-service-specifications.jpeg",
};

const ServicesPage = () => {
  const servicesPage = getServicesPageContent();
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${siteSettings.baseUrl}/services/${service.slug}`,
    })),
  };

  const trustStatsIcons = [Award, CheckCircle2, GoogleIcon, ShieldCheck];
  const trustStats = servicesPage.trustStats.map((stat, index) => ({
    ...stat,
    icon: trustStatsIcons[index],
  }));

  const stepIcons = [Phone, Settings, ShieldCheck];
  const steps = servicesPage.process.steps.map((step, index) => ({
    ...step,
    icon: stepIcons[index],
  }));

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Damp & Building Pathology Services | ${siteSettings.businessName}`}
        description="Independent damp surveys, moisture diagnostics, mould investigations, waterproofing advice and remedial project support."
        path="/services"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        schema={servicesSchema}
      />

      {/* <TopBanner /> */}
      <Header />
      
      <main>
      {/* Hero Section - matches portfolio */}
        <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img 
              src={ctaBackground} 
              alt={`${siteSettings.businessName} services background`}
              className="w-full h-full object-cover opacity-40"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 animate-fade-in shrink-0">
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden />
              {servicesPage.hero.subtitle}
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in inline-flex flex-wrap items-center justify-center gap-3">
              Independent{" "}
              <span className="text-accent relative inline-block">
                Damp Services
                <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/30 -z-10 -rotate-1" />
              </span>{" "}
              for Complex Property Issues
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
              {servicesPage.hero.description}
            </p>
            
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg shadow-xl shadow-accent/25">
                <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {servicesPage.hero.ctaPrimary}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg">
                <a href="#services-grid">{servicesPage.hero.ctaSecondary}</a>
              </Button>
          </div>
        </div>
      </section>

        {/* Quick Trust Stats */}
        <section className="-mt-8 sm:-mt-12 relative z-20 pb-12 sm:pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8">
            {trustStats.map((stat, index) => (
                <Card key={index} className="border-2 border-accent/20 hover:border-accent/50 shadow-2xl shadow-primary/10 overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8 flex items-center gap-2 sm:gap-3 md:gap-6">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-all text-accent">
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

        {/* Services Grid Section */}
        <section id="services-grid" className="py-12 sm:py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-6">
                {servicesPage.coreServices.title}
            </h2>
              <div className="w-16 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl">
                {servicesPage.coreServices.description}
            </p>
          </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.slug} className="group border-2 border-accent/20 bg-muted hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/15 flex flex-col h-full overflow-hidden">
                    {/* Accent bar at top */}
                    <div className="h-1.5 bg-accent/60 group-hover:bg-accent transition-colors" />
                    <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/10 transition-colors z-10" />
                      <img 
                        src={serviceImages[service.slug]} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={640}
                        height={480}
                        decoding="async"
                      />
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
                        <div className="bg-primary p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg border border-accent/30">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    </div>
                  </div>
                  
                    <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow text-primary-foreground">
                      <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-primary-foreground mb-2 sm:mb-3 group-hover:text-accent transition-colors leading-tight">
                        {service.title}
                  </h3>
                      {/* Accent line under title */}
                      <div className="w-12 h-0.5 bg-accent/80 mb-3 sm:mb-4" />
                      <p className="text-primary-foreground/75 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 md:mb-5 flex-grow line-clamp-3 sm:line-clamp-none">
                    {service.shortDesc}
                  </p>
                  
                      {/* Accent divider before features */}
                      <div className="border-t border-accent/30 pt-3 sm:pt-4 mb-3 sm:mb-4 md:mb-5">
                        <div className="space-y-2 sm:space-y-2.5">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <div key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent mt-0.5 shrink-0" />
                              <span className="text-primary-foreground/90 font-medium line-clamp-2">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-3 sm:pt-4 border-t-2 border-accent/40 mt-auto flex items-center justify-between gap-2">
                        <Link 
                          to={`/services/${service.slug}`} 
                          className="inline-flex items-center gap-1.5 sm:gap-2 text-accent font-bold hover:text-primary-foreground hover:gap-3 transition-all text-sm sm:text-base min-w-0"
                        >
                          View Details
                          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      </Link>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-accent-foreground bg-accent/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0">
                          {service.pricing[0]?.price || "Call for Quote"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-6">
                <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {servicesPage.process.subtitle}
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-primary-foreground mb-3 sm:mb-6">
                {servicesPage.process.title}
              </h2>
              <p className="text-primary-foreground/70 text-sm sm:text-base md:text-lg lg:text-xl">
                {servicesPage.process.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 relative">
              {/* Connector lines (visible on desktop) */}
              <div className="hidden lg:block absolute top-1/3 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent z-0" />
              
              {steps.map((step, i) => (
                <div key={i} className="relative z-10 group text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl md:rounded-[2rem] bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all duration-500 shadow-2xl">
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="bg-accent text-accent-foreground w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-sm sm:text-base mx-auto -mt-8 sm:-mt-10 md:-mt-14 mb-4 sm:mb-6 md:mb-10 relative z-20 border-2 sm:border-4 border-primary">
                    {i + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-foreground mb-2 sm:mb-4">{step.title}</h3>
                  <p className="text-primary-foreground/60 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

        {/* Certification / Trust Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-card relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 border-2 border-primary/10">
              <div className="max-w-xl w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-6">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {servicesPage.accreditation.subtitle}
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-6">
                  {servicesPage.accreditation.title}
            </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                  {servicesPage.accreditation.description}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                  {servicesPage.accreditation.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
                      <span className="font-bold text-foreground text-sm sm:text-base">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full lg:w-auto">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-4 sm:border-8 border-primary/20 group">
                  <img src={teamPortrait} alt={`${siteSettings.businessName} site inspection team`} className="w-full max-w-sm h-auto grayscale group-hover:grayscale-0 transition-all duration-700" width={800} height={1000} decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                    <div className="bg-card/95 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-primary/10">
                      <div className="flex items-center gap-1 mb-1 sm:mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-accent text-accent" />
            ))}
          </div>
                      <p className="text-xs sm:text-sm font-medium italic text-foreground mb-1 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                        "{servicesPage.accreditation.featuredReview.text}"
                      </p>
                      <p className="text-[10px] sm:text-xs font-bold text-accent uppercase tracking-widest">— {servicesPage.accreditation.featuredReview.author}</p>
            </div>
          </div>
        </div>
                {/* Floating experience badge */}
                <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 bg-accent text-accent-foreground p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl shadow-accent/25 text-center border-2 sm:border-4 border-primary animate-bounce-slow">
                  <div className="text-xl sm:text-3xl font-black mb-0.5 leading-none">15+</div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest leading-none">Years of<br />Expertise</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Snippet */}
        <section className="py-12 sm:py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
              <div className="max-w-2xl">
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-6">
                  Trusted by <span className="text-accent">Homeowners</span>
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                  Clients come to us when they need a clearer diagnosis, a credible second opinion or a sensible remedial brief.
                </p>
              </div>
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold h-10 sm:h-12 px-4 sm:px-6 rounded-xl transition-all shrink-0">
                <Link to="/reviews" className="flex items-center gap-2 text-sm sm:text-base">
                  Read More Reviews
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </Button>
          </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                { name: "Robert F.", loc: "Harpenden", text: "Incredibly expert installation. The kitchen transformation is a work of art and the finish is flawless. Highly recommend." },
                { name: "Michael T.", loc: "Redbourn", text: "The furniture revitalization was handled perfectly from survey to finish. Spotless work and very professional team." },
                { name: "Emma W.", loc: "St Albans", text: "Transformed my tired kitchen into a modern masterpiece. Professional, thorough, and left the house perfectly tidy." }
              ].map((t, i) => (
                <Card key={i} className="bg-card border-2 border-primary/10 hover:border-accent/30 hover:shadow-xl transition-all">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex gap-1 mb-3 sm:mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                    ))}
                  </div>
                    <p className="text-foreground text-sm sm:text-base italic mb-4 sm:mb-6 md:mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none">"{t.text}"</p>
                    <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-primary/10">
                      <span className="font-bold text-foreground text-sm sm:text-base">{t.name}</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-widest">{t.loc}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
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
