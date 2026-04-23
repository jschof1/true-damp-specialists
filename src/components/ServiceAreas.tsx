import { MapPin, Phone, CheckCircle2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { areas } from "@/data/areas";
import { getServiceAreasContent, getSectionCtaLabel } from "@/data/content";
import theme from "@/config/theme";

const ServiceAreas = () => {
  const serviceAreas = getServiceAreasContent();
  const regions = serviceAreas.regions.map((region) => ({
    ...region,
    locations: areas.filter((a) => a.region === region.id),
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

        {/* Text-led coverage block */}
        <div className="mx-auto max-w-4xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              backgroundColor: theme.colors.primary[800].replace(')', ' / 0.65)'),
              border: `${theme.borders.width.medium} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.35)')}`,
              boxShadow: theme.effects.shadows.xl
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT
                }}
              >
                <MapPin className="h-6 w-6" style={{ color: theme.surfaces.accentForeground }} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-black" style={{ color: theme.surfaces.primaryForeground }}>
                  {serviceAreas.infoBox.title}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.colors.accent.DEFAULT }}>
                  {serviceAreas.infoBox.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {String(serviceAreas.description)
                .split("\n\n")
                .map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: theme.colors.secondary[300] }}
                  >
                    {paragraph}
                  </p>
                ))}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl px-4 py-3" style={{
              backgroundColor: theme.colors.primary[900].replace(')', ' / 0.45)'),
              border: `${theme.borders.width.thin} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.25)')}`
            }}>
              <CheckCircle2 className="w-4 h-4" style={{ color: theme.colors.accent.DEFAULT }} />
              <span className="text-sm font-semibold" style={{ color: theme.surfaces.primaryForeground }}>
                {serviceAreas.infoBox.arrivalText}
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="default"
                className="font-black text-base h-14 uppercase tracking-wider shadow-lg w-full sm:w-auto"
                style={{
                  background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                  color: theme.surfaces.accentForeground
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
                className="font-black text-base h-14 uppercase tracking-wider w-full sm:w-auto border-2"
                style={{
                  borderColor: theme.surfaces.primaryForeground,
                  color: theme.surfaces.primaryForeground
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

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {regions.map((region) => (
            <Card
              key={region.id}
              className="border bg-transparent shadow-none"
              style={{
                backgroundColor: theme.colors.primary[800].replace(')', ' / 0.45)'),
                borderColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.25)')
              }}
            >
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: theme.colors.primary[900] }}
                  >
                    <Navigation className="h-5 w-5" style={{ color: theme.colors.accent.DEFAULT }} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-black" style={{ color: theme.surfaces.primaryForeground }}>
                      {region.label}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.colors.accent.DEFAULT }}>
                      {region.id}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {region.locations.map((area) => (
                    <Link
                      key={area.slug}
                      to={`/locations/${area.slug}`}
                      className="rounded-md px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
                      style={{
                        backgroundColor: theme.colors.primary[900],
                        color: theme.colors.secondary[200],
                        border: `${theme.borders.width.thin} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.2)')}`
                      }}
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
