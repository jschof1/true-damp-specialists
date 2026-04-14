import { MapPin, Phone, CheckCircle2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { areas } from "@/data/areas";
import { getServiceAreasContent, getSectionCtaLabel } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";
import { cn } from "@/lib/utils";
import theme from "@/config/theme";

const ServiceAreas = () => {
  const serviceAreas = getServiceAreasContent();

  // Group areas by region for display
  const regions = serviceAreas.regions.map(region => ({
    ...region,
    locations: areas.filter(a => a.region === region.id)
  }));

  return (
    <section
      id="areas" 
      className="py-10 md:py-16 lg:py-24 relative overflow-hidden border-y-8"
      style={{ 
        backgroundColor: theme.colors.primary.DEFAULT,
        borderColor: theme.colors.accent.DEFAULT
      }}
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px]" 
          style={{ backgroundColor: theme.colors.secondary[200], opacity: 0.05 }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full blur-[140px]" 
          style={{ backgroundColor: theme.colors.accent.DEFAULT, opacity: 0.15 }}
        />
        
        {/* Dynamic Pattern Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            backgroundImage: theme.patterns.noise.dataUrl, 
            opacity: theme.patterns.noise.opacity 
          }} 
        />
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(to right, ${theme.colors.secondary.DEFAULT.replace(')', ' / 0.03)')} 1px, transparent 1px), linear-gradient(to bottom, ${theme.colors.secondary.DEFAULT.replace(')', ' / 0.03)')} 1px, transparent 1px)`, 
            backgroundSize: theme.patterns.grid.size, 
          }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 md:mb-16">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 md:mb-6 animate-fade-in"
            style={{
              backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.15)'),
              borderColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.3)'),
              borderWidth: theme.borders.width.thin,
              color: theme.colors.accent.DEFAULT
            }}
          >
            <Navigation className="w-3.5 h-3.5" />
            {serviceAreas.badge}
          </div>
          <h2 
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 leading-tight animate-fade-in"
            style={{ color: theme.surfaces.primaryForeground }}
          >
            {serviceAreas.title}
          </h2>
          <p 
            className="text-base md:text-xl leading-relaxed max-w-2xl animate-fade-in"
            style={{ color: theme.colors.secondary[400], animationDelay: "0.1s" }}
          >
            {serviceAreas.description}
          </p>
        </div>

        {/* Map + Areas Grid */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left - Map Visualization */}
          <div className="lg:col-span-6 relative group animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div 
              className="relative rounded-2xl overflow-hidden transition-all duration-500 h-[300px] md:h-[400px] lg:h-[550px] hover:[box-shadow:var(--hover-shadow)] hover:[border-color:var(--hover-border)]"
              style={{
                backgroundColor: theme.colors.primary[800],
                border: `${theme.borders.width.medium} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.5)')}`,
                boxShadow: theme.effects.shadows.xl,
                '--hover-shadow': theme.effects.shadows.accentGlow,
                '--hover-border': theme.colors.accent.DEFAULT
              } as React.CSSProperties}
            >
              <iframe 
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteSettings.address)}&z=9&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="eager" 
                referrerPolicy="no-referrer-when-downgrade"
                title={serviceAreas.mapTitle}
                allow="fullscreen"
                className="opacity-70 group-hover:opacity-90 transition-opacity duration-500 contrast-125 brightness-[0.85] grayscale-[0.2]"
              />
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  background: `linear-gradient(to top, ${theme.colors.primary.DEFAULT} 0%, transparent 60%)`
                }}
              />
              
              {/* Glassmorphism Info Box */}
              <div 
                className="absolute bottom-4 left-4 right-4 p-5 md:p-6 rounded-xl backdrop-blur-md transition-transform duration-500 group-hover:translate-y-[-4px]"
                style={{
                  backgroundColor: theme.colors.primary[800].replace(')', ' / 0.85)'),
                  border: `${theme.borders.width.thin} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.4)')}`,
                  boxShadow: theme.effects.shadows.lg
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                        boxShadow: theme.effects.shadows.accentGlow
                      }}
                    >
                      <MapPin className="w-6 h-6" style={{ color: theme.surfaces.accentForeground }} />
                    </div>
                    <div>
                      <h3 
                        className="font-display font-black text-xl leading-tight mb-1"
                        style={{ color: theme.surfaces.primaryForeground }}
                      >
                        {serviceAreas.infoBox.title}
                      </h3>
                      <p 
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: theme.colors.accent.DEFAULT }}
                      >
                        {serviceAreas.infoBox.subtitle}
                      </p>
                    </div>
                  </div>
                  <div 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{
                      backgroundColor: theme.colors.primary[900].replace(')', ' / 0.5)'),
                      border: `${theme.borders.width.thin} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.3)')}`
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4" style={{ color: theme.colors.accent.DEFAULT }} />
                    <span 
                      className="text-xs font-bold whitespace-nowrap uppercase tracking-wide"
                      style={{ color: theme.surfaces.primaryForeground }}
                    >
                      {serviceAreas.infoBox.arrivalText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Areas List */}
          <div className="lg:col-span-6 space-y-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="grid sm:grid-cols-2 gap-4">
            {regions.map((region, index) => (
                <div 
                  key={index} 
                  className="rounded-xl p-5 transition-all duration-300 group hover:[transform:var(--hover-transform)] hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)]"
                  style={{
                    backgroundColor: theme.colors.primary[800].replace(')', ' / 0.6)'),
                    border: `${theme.borders.width.thin} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.3)')}`,
                    '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
                    '--hover-border': theme.colors.accent.DEFAULT,
                    '--hover-shadow': theme.effects.shadows.accentGlow
                  } as React.CSSProperties}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 group-hover:[background-color:var(--hover-bg)]"
                      style={{
                        backgroundColor: theme.colors.primary[900],
                        border: `${theme.borders.width.thin} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.3)')}`,
                        '--hover-bg': theme.colors.accent.DEFAULT
                      } as React.CSSProperties}
                    >
                      <Navigation 
                        className="w-5 h-5 transition-colors group-hover:[color:var(--hover-icon)]" 
                        style={{ 
                          color: theme.colors.accent.DEFAULT,
                          '--hover-icon': theme.surfaces.accentForeground
                        } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <h3 
                        className="font-display font-black text-lg leading-tight"
                        style={{ color: theme.surfaces.primaryForeground }}
                      >
                        {region.label}
                      </h3>
                      <p 
                        className="text-[10px] font-bold uppercase tracking-widest mt-0.5"
                        style={{ color: theme.colors.accent.DEFAULT }}
                      >
                        {region.id}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {region.locations.map((area, locIndex) => (
                      <Link
                        key={locIndex}
                        to={`/locations/${area.slug}`}
                        className="px-2.5 py-1.5 transition-all rounded-md font-bold text-xs uppercase tracking-wider hover:[background-color:var(--hover-bg)] hover:[color:var(--hover-text)] hover:[border-color:var(--hover-border)]"
                        style={{
                          backgroundColor: theme.colors.primary[900],
                          color: theme.colors.secondary[200],
                          border: `${theme.borders.width.thin} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.2)')}`,
                          '--hover-bg': theme.colors.accent.DEFAULT,
                          '--hover-text': theme.surfaces.accentForeground,
                          '--hover-border': theme.colors.accent.DEFAULT
                        } as React.CSSProperties}
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>
            ))}
            </div>

            {/* Premium CTA Box */}
            <div 
              className="rounded-xl p-8 relative overflow-hidden group hover:[box-shadow:var(--hover-shadow)] transition-all duration-500 hover:[border-color:var(--hover-border)]"
              style={{
                backgroundColor: theme.colors.primary[800],
                border: `${theme.borders.width.medium} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.5)')}`,
                '--hover-shadow': theme.effects.shadows.glowNavy,
                '--hover-border': theme.colors.accent.DEFAULT
              } as React.CSSProperties}
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" 
                style={{ backgroundColor: theme.colors.accent.DEFAULT, opacity: 0.15 }}
              />
              
              <div className="relative z-10">
                <h3 
                  className="font-display font-black text-2xl mb-2"
                  style={{ color: theme.surfaces.primaryForeground }}
                >
                  {serviceAreas.cta.title}
                </h3>
                <p 
                  className="text-base font-medium mb-6"
                  style={{ color: theme.colors.secondary[300] }}
                >
                  {serviceAreas.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild 
                    size="default" 
                    className="font-black text-base h-14 uppercase tracking-wider shadow-lg group w-full sm:w-auto transition-all duration-300 hover:[transform:var(--hover-transform)] hover:[box-shadow:var(--hover-shadow)]"
                    style={{
                      background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                      color: theme.surfaces.accentForeground,
                      '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
                      '--hover-shadow': theme.effects.shadows.accentGlow
                    } as React.CSSProperties}
                  >
                    <Link to="/get-quote" className="flex items-center justify-center gap-2">
                      {getSectionCtaLabel()}
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline"
                    size="default" 
                    className="font-black text-base h-14 uppercase tracking-wider w-full sm:w-auto border-2 transition-all duration-300 hover:[transform:var(--hover-transform)]"
                    style={{
                      borderColor: theme.surfaces.primaryForeground,
                      color: theme.surfaces.primaryForeground,
                      '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`
                    } as React.CSSProperties}
                  >
                    <a href={`tel:${serviceAreas.cta.phone.replace(/\s+/g, '')}`} className="flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" strokeWidth={3} />
                      {serviceAreas.cta.ctaText ?? "Call Now"}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
