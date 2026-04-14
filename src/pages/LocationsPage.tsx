import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import TopBanner from "@/components/TopBanner";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { areas, getAreaImage } from "@/data/areas";
import { siteSettings } from "@/data/siteSettings";
import { Phone, MapPin, ArrowRight, Navigation } from "lucide-react";
import theme from "@/config/theme";
import heroBackground from "@/assets/general/damp-rising-damp-exterior.webp";

const LocationsPage = () => {
  // Group areas by region
  const areasByRegion = areas.reduce((acc, area) => {
    if (!acc[area.region]) {
      acc[area.region] = [];
    }
    acc[area.region].push(area);
    return acc;
  }, {} as Record<string, typeof areas>);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: areas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: area.name,
      url: `${siteSettings.baseUrl}/locations/${area.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Areas We Cover | ${siteSettings.businessName}`}
        description="Independent damp, mould and waterproofing consultancy across London, Hertfordshire, Buckinghamshire, Bedfordshire and Oxfordshire."
        path="/locations"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ]}
        schema={schema}
      />

      {/* <TopBanner /> */}
      <Header />
      
      <main>
        {/* Hero Section - matches portfolio */}
        <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBackground}
              alt={`${siteSettings.businessName} coverage area background`}
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
              Service Areas
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in">
              Areas We Cover
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
              We provide independent surveys, moisture diagnostics and remedial guidance across our main service regions.
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg shadow-xl shadow-accent/25">
                <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg">
                <a href="#locations-grid">View All Locations</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Locations Grid Section */}
        <section id="locations-grid" className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="space-y-16">
              {Object.entries(areasByRegion).map(([region, regionAreas]) => (
                <div key={region} className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <h2 
                      className="font-display font-black text-3xl md:text-4xl"
                      style={{ color: theme.surfaces.foreground }}
                    >
                      {region}
                    </h2>
                    <div 
                      className="h-px flex-grow" 
                      style={{ backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.3)') }}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regionAreas.map((area) => (
                      <Card 
                        key={area.slug} 
                        className="group transition-all duration-300 flex flex-col h-full hover:[transform:var(--hover-transform)] hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)] overflow-hidden"
                        style={{
                          backgroundColor: theme.surfaces.card,
                          border: `${theme.borders.width.thin} solid ${theme.surfaces.border}`,
                          '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
                          '--hover-border': theme.colors.accent.DEFAULT,
                          '--hover-shadow': theme.effects.shadows.lg
                        } as React.CSSProperties}
                      >
                        {getAreaImage(area.slug) && (
                          <div className="h-48 overflow-hidden relative shrink-0">
                            <img 
                              src={getAreaImage(area.slug)} 
                              alt={`${siteSettings.businessName} in ${area.name}`}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              width={640}
                              height={480}
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                          </div>
                        )}
                        <CardContent className="p-6 flex flex-col h-full relative">
                          {/* Accent line on hover */}
                          <div 
                            className="absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                            style={{ background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT }}
                          />
                          
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 
                                className="font-display font-black text-2xl transition-colors"
                                style={{ color: theme.surfaces.foreground }}
                              >
                                {area.name}
                              </h3>
                              <p 
                                className="text-[11px] font-bold uppercase tracking-widest mt-1"
                                style={{ color: theme.colors.accent.DEFAULT }}
                              >
                                {area.postcodes.join(", ")}
                              </p>
                            </div>
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 group-hover:[background-color:var(--hover-bg)] group-hover:[box-shadow:var(--hover-shadow)] group-hover:scale-110"
                              style={{
                                backgroundColor: theme.surfaces.border,
                                '--hover-bg': theme.colors.accent.DEFAULT,
                                '--hover-shadow': theme.effects.shadows.accentGlow
                              } as React.CSSProperties}
                            >
                              <MapPin 
                                className="w-5 h-5 transition-colors group-hover:[color:var(--hover-icon)]" 
                                style={{ 
                                  color: theme.colors.accent.DEFAULT,
                                  '--hover-icon': theme.surfaces.accentForeground
                                } as React.CSSProperties}
                              />
                            </div>
                          </div>
                          
                          <p 
                            className="leading-relaxed mb-6 flex-grow text-sm"
                            style={{ color: theme.surfaces.mutedForeground }}
                          >
                            {area.description || `Independent damp and mould support in ${area.name} and surrounding areas.`}
                          </p>
                          
                          <div 
                            className="pt-5 border-t mt-auto flex items-center justify-between"
                            style={{ borderColor: theme.surfaces.border }}
                          >
                            <Link 
                              to={`/locations/${area.slug}`} 
                              className="inline-flex items-center gap-2 font-bold hover:gap-3 transition-all text-sm"
                              style={{ color: theme.colors.accent.DEFAULT }}
                            >
                              View Area
                              <ArrowRight className="w-4 h-4" style={{ color: theme.colors.accent.DEFAULT }} />
                            </Link>
                            <span 
                              className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md"
                              style={{
                                backgroundColor: theme.surfaces.border,
                                color: theme.surfaces.mutedForeground
                              }}
                            >
                              Survey Coverage
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
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

export default LocationsPage;
