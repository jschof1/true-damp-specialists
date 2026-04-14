import { Link } from "react-router-dom";
import logoIcon from "@/assets/general/damp-survey-equipment-flatlay.webp";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import TopBanner from "@/components/TopBanner";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MapPin, Maximize2, Flame } from "lucide-react";
import { siteSettings } from "@/data/siteSettings";
import { getPortfolioPageContent, getProjectGalleryContent } from "@/data/content";
import { PROJECT_GALLERY_IMAGES } from "@/data/projectGalleryImages";
import { getServiceDestination } from "@/lib/serviceLinks";
import theme from "@/config/theme";

import ctaBackground from "@/assets/general/damp-survey-thermal-imaging.webp";

const PortfolioPage = () => {
  const portfolioPage = getPortfolioPageContent();
  const galleryContent = getProjectGalleryContent();

  const projects = galleryContent.projects.map((project) => ({
    ...project,
    image: PROJECT_GALLERY_IMAGES[project.imageKey] ?? "",
    location: `${project.location}, ${siteSettings.addressDetails.addressRegion}`,
  }));

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Case Studies | ${siteSettings.businessName}`}
        description={portfolioPage.hero.description}
        path="/portfolio"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ]}
      />

      {/* <TopBanner /> */}
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img 
              src={ctaBackground} 
              alt={`${siteSettings.businessName} case studies background`}
              className="w-full h-full object-cover opacity-40"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>
        
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 animate-fade-in shrink-0">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden />
              {portfolioPage.hero.badge}
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in inline-flex flex-wrap items-center justify-center gap-3">
              {portfolioPage.hero.title}
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
              {portfolioPage.hero.description}
            </p>
            
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg shadow-xl shadow-accent/25">
                <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {portfolioPage.hero.ctaPrimary}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg">
                <a href="#gallery">{portfolioPage.hero.ctaSecondary}</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-12 sm:py-16 md:py-24 bg-section-alt relative overflow-hidden">
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              backgroundImage: theme.patterns.noise.dataUrl, 
              opacity: 0.03
            }} 
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-6">
                {portfolioPage.gallery.title}
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl">
                {portfolioPage.gallery.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <Link
                  key={index}
                  to={getServiceDestination(project.slug)}
                  className="block no-underline"
                >
                  <div
                    className="group relative rounded-2xl overflow-hidden transition-all duration-500 animate-fade-in cursor-pointer hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)] hover:[transform:var(--hover-transform)] h-full"
                    style={{ 
                      animationDelay: `${0.1 * index}s`,
                      backgroundColor: theme.surfaces.card,
                      borderColor: theme.surfaces.border,
                      borderWidth: theme.borders.width.medium,
                      borderStyle: 'solid',
                      boxShadow: theme.effects.shadows.md,
                      '--hover-border': theme.colors.accent.DEFAULT,
                      '--hover-shadow': theme.effects.shadows.xl,
                      '--hover-transform': `translateY(-${theme.metrics.hover.liftSm})`
                    } as React.CSSProperties}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                        width={400}
                        height={500}
                        decoding="async"
                      />
                      
                      <div 
                        className="absolute inset-0 opacity-80 group-hover:opacity-95 transition-opacity duration-500" 
                        style={{
                          background: `linear-gradient(to top, ${theme.colors.primary[900]} 10%, ${theme.colors.primary.DEFAULT.replace(')', ' / 0.3)')} 60%, transparent)`
                        }}
                      />
                      
                      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        {project.type === "before-after" && (
                          <span 
                            className="inline-flex text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-sm"
                            style={{
                              background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                              color: theme.surfaces.accentForeground,
                              border: `${theme.borders.width.hairline} solid ${theme.colors.accent[400]}`
                            }}
                          >
                            Before & After
                          </span>
                        )}
                        <span 
                          className="inline-flex backdrop-blur-md text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-sm"
                          style={{
                            backgroundColor: theme.colors.primary[800].replace(')', ' / 0.85)'),
                            color: theme.surfaces.primaryForeground,
                            border: `${theme.borders.width.hairline} solid ${theme.colors.primary[600]}`
                          }}
                        >
                          {project.tag}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
                        <div 
                          className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider mb-2"
                          style={{ color: theme.colors.accent.DEFAULT }}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          {project.location.split(',')[0]}
                        </div>
                        <h3 
                          className="font-display font-black text-xl mb-3 leading-tight transition-colors duration-300 hover:[color:var(--hover-text)] group-hover:[color:var(--hover-text)]"
                          style={{ 
                            color: theme.surfaces.primaryForeground,
                            '--hover-text': theme.colors.accent.DEFAULT
                          } as React.CSSProperties}
                        >
                          {project.title}
                        </h3>
                        <p 
                          className="text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                          style={{ color: theme.colors.secondary[300] }}
                        >
                          {project.description}
                        </p>
                      </div>

                      <div 
                        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 z-10"
                        style={{
                          background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                          color: theme.surfaces.accentForeground,
                          boxShadow: theme.effects.shadows.accentGlow
                        }}
                      >
                        <Maximize2 className="w-5 h-5 ml-0.5 mt-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-card relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div 
              className="rounded-3xl text-center max-w-4xl mx-auto relative group overflow-hidden"
              style={{
                backgroundColor: theme.surfaces.card,
                border: `${theme.borders.width.medium} solid ${theme.surfaces.border}`,
                boxShadow: theme.effects.shadows.lg
              }}
            >
              <div 
                className="absolute top-0 left-0 h-full transition-all duration-500 group-hover:[width:var(--hover-width)]" 
                style={{ 
                  background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                  width: theme.metrics.accents.barWidth,
                  '--hover-width': theme.metrics.accents.barOffsetX
                } as React.CSSProperties} 
              />
              
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ 
                  backgroundImage: theme.patterns.noise.dataUrl, 
                  opacity: 0.02
                }} 
              />

              <div className="relative z-10 px-6 py-12 md:py-16 lg:py-20">
                <h3 
                  className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6"
                  style={{ color: theme.surfaces.foreground }}
                >
                  {portfolioPage.cta.title}
                </h3>
                <p 
                  className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto"
                  style={{ color: theme.surfaces.mutedForeground }}
                >
                  {portfolioPage.cta.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                  <Button 
                    asChild 
                    className="font-bold h-14 md:h-16 px-8 md:px-10 rounded-xl group w-full sm:w-auto text-base md:text-lg transition-all duration-300 hover:[transform:var(--hover-transform)] hover:[box-shadow:var(--hover-shadow)]"
                    style={{
                      background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                      color: theme.surfaces.accentForeground,
                      borderWidth: theme.borders.width.medium,
                      borderStyle: 'solid',
                      borderColor: theme.colors.primary.DEFAULT,
                      '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
                      '--hover-shadow': theme.effects.shadows.accentGlow
                    } as React.CSSProperties}
                  >
                    <a href="#contact" className="flex items-center gap-2 uppercase tracking-wider">
                      {portfolioPage.cta.primaryText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="outline" 
                    className="font-bold h-14 md:h-16 px-8 md:px-10 rounded-xl w-full sm:w-auto text-base md:text-lg transition-all duration-300 hover:[transform:var(--hover-transform)] hover:[background-color:var(--hover-bg)] hover:[color:var(--hover-text)] hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)]"
                    style={{
                      backgroundColor: theme.surfaces.card,
                      borderColor: theme.surfaces.border,
                      borderWidth: theme.borders.width.medium,
                      color: theme.surfaces.foreground,
                      '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
                      '--hover-bg': theme.surfaces.card,
                      '--hover-text': theme.surfaces.accentTextOnLight,
                      '--hover-border': theme.colors.accent.DEFAULT,
                      '--hover-shadow': theme.effects.shadows.md
                    } as React.CSSProperties}
                  >
                    <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center gap-2 uppercase tracking-wider">
                      {portfolioPage.cta.secondaryText}
                    </a>
                  </Button>
                </div>
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

export default PortfolioPage;
