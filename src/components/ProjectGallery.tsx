import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowUpRight, MapPin, Maximize2, Flame } from "lucide-react";
import { getProjectGalleryContent } from "@/data/content";
import { PROJECT_GALLERY_IMAGES } from "@/data/projectGalleryImages";
import { siteSettings } from "@/data/siteSettings";
import { getServiceDestination } from "@/lib/serviceLinks";
import theme from "@/config/theme";

interface ProjectGalleryProps {
  areaName?: string;
}

const ProjectGallery = ({ areaName }: ProjectGalleryProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressRegion;
  const galleryContent = getProjectGalleryContent(displayArea);

  const projects = galleryContent.projects.map((project) => ({
    ...project,
    image: PROJECT_GALLERY_IMAGES[project.imageKey] ?? "",
    location: `${project.location}, ${displayArea}`,
  }));

  return (
    <section 
      id="gallery" 
      className="py-10 md:py-16 lg:py-32 relative overflow-hidden bg-section-alt text-foreground"
    >
      {/* Dynamic Patterns from Theme */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: theme.patterns.noise.dataUrl, 
          opacity: 0.03 // Slightly higher opacity for light mode noise
        }} 
      />
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, ${theme.colors.primary.DEFAULT.replace(')', ' / 0.03)')} 1px, transparent 1px), linear-gradient(to bottom, ${theme.colors.primary.DEFAULT.replace(')', ' / 0.03)')} 1px, transparent 1px)`, 
          backgroundSize: theme.patterns.gridAccent.size, 
        }} 
      />
      
      {/* Glowing orbs */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] -mr-64 -mt-64 pointer-events-none" 
        style={{ backgroundColor: theme.colors.accent[500], opacity: 0.05 }} 
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] -ml-64 -mb-64 pointer-events-none" 
        style={{ backgroundColor: theme.colors.secondary[300], opacity: 0.2 }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 animate-fade-in"
              style={{
                backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.1)'),
                borderColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.2)'),
                borderWidth: theme.borders.width.thin,
                color: theme.surfaces.accentTextOnLight
              }}
            >
              <Flame className="w-3 h-3" />
              {galleryContent.badge}
            </div>
            <h2 
              className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 leading-tight animate-fade-in"
              style={{ color: theme.surfaces.foreground }}
            >
              {galleryContent.title} <br />
              <span style={{ color: theme.surfaces.accentTextOnLight }}>in {displayArea}</span>
            </h2>
            <p 
              className="text-base md:text-lg lg:text-xl leading-relaxed animate-fade-in max-w-xl" 
              style={{ color: theme.surfaces.mutedForeground, animationDelay: "0.1s" }}
            >
              {galleryContent.description}
            </p>
          </div>
          
          <div className="hidden md:block animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button 
              asChild 
              className="font-bold rounded-lg px-8 h-12 group transition-all duration-300 hover:opacity-90"
              style={{
                background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                color: theme.surfaces.accentForeground
              }}
            >
              <Link to="/get-quote" className="flex items-center gap-2 text-sm uppercase tracking-wider">
                {galleryContent.cta.primaryText}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={getServiceDestination(project.slug)}
              className="block no-underline"
            >
              <div
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 animate-fade-in cursor-pointer hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)] hover:[transform:var(--hover-transform)]"
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
              {/* Image Container */}
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
                
                {/* Dynamic Overlay - Kept dark so white text remains readable */}
                <div 
                  className="absolute inset-0 opacity-80 group-hover:opacity-95 transition-opacity duration-500" 
                  style={{
                    background: `linear-gradient(to top, ${theme.colors.primary[900]} 10%, ${theme.colors.primary.DEFAULT.replace(')', ' / 0.3)')} 60%, transparent)`
                  }}
                />
                
                {/* Floating Tags */}
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

                {/* Bottom Content (Overlay) */}
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

                {/* Hover Icon */}
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

        {/* CTA */}
        <div className="mt-20 lg:mt-24 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div 
            className="rounded-3xl text-center max-w-4xl mx-auto relative group overflow-hidden"
            style={{
              backgroundColor: theme.surfaces.card,
              border: `${theme.borders.width.medium} solid ${theme.surfaces.border}`,
              boxShadow: theme.effects.shadows.lg
            }}
          >
            {/* Dynamic decorative bar */}
            <div 
              className="absolute top-0 left-0 h-full transition-all duration-500 group-hover:[width:var(--hover-width)]" 
              style={{ 
                background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                width: theme.metrics.accents.barWidth,
                '--hover-width': theme.metrics.accents.barOffsetX
              } as React.CSSProperties} 
            />
            
            {/* Subtle background noise for CTA */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ 
                backgroundImage: theme.patterns.noise.dataUrl, 
                opacity: 0.02
              }} 
            />

            <div className="relative z-10 px-6 py-8 md:py-12 lg:py-16">
              <h3 
                className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4"
                style={{ color: theme.surfaces.foreground }}
              >
                {galleryContent.cta.title}
              </h3>
              <p 
                className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-2xl mx-auto"
                style={{ color: theme.surfaces.mutedForeground }}
              >
                {galleryContent.cta.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <Button 
                  asChild 
                  className="font-bold h-12 md:h-14 px-6 md:px-8 rounded-xl group w-full sm:w-auto transition-all duration-300 hover:[transform:var(--hover-transform)] hover:[box-shadow:var(--hover-shadow)]"
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
                  <Link to="/get-quote" className="flex items-center gap-2 text-sm md:text-base uppercase tracking-wider">
                    {galleryContent.cta.primaryText}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="font-bold h-12 md:h-14 px-6 md:px-8 rounded-xl w-full sm:w-auto transition-all duration-300 hover:[transform:var(--hover-transform)] hover:[background-color:var(--hover-bg)] hover:[color:var(--hover-text)] hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)]"
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
                  <a href={`tel:${galleryContent.cta.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-sm md:text-base uppercase tracking-wider">
                    {galleryContent.cta.secondaryText}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
