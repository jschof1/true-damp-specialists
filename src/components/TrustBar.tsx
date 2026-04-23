import { FileText, Search, ShieldCheck } from "lucide-react";
import GoogleIcon from "./GoogleIcon";
import { siteSettings } from "@/data/siteSettings";
import theme from "@/config/theme";

const TrustBar = () => {
  const trustItems = [
    {
      icon: GoogleIcon,
      value: siteSettings.googleRating ? siteSettings.googleRating.split("/")[0] : "Public",
      label: "Reviews",
      subtext: siteSettings.reviewCount ? `${siteSettings.reviewCount} approved reviews` : "View public profile",
    },
    {
      icon: ShieldCheck,
      value: "Independent",
      label: "Advice",
      subtext: "No treatment-led sales",
    },
    {
      icon: Search,
      value: "Evidence-led",
      label: "Diagnosis",
      subtext: "Moisture profiling and building analysis",
    },
    {
      icon: FileText,
      value: "Specialist",
      label: "Cases",
      subtext: "Often instructed after failed or unclear previous advice",
    },
  ];

  return (
    <section 
      className="py-12 md:py-16 relative overflow-hidden border-y-4 md:border-y-8"
      style={{ 
        backgroundColor: theme.colors.primary.DEFAULT,
        borderColor: theme.colors.accent.DEFAULT
      }}
    >
      {/* Dynamic Patterns from Theme */}
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

      {/* Glowing orbs */}
      <div 
        className="absolute top-1/2 left-0 w-64 h-64 -translate-y-1/2 rounded-full blur-[100px] -ml-32 pointer-events-none" 
        style={{ backgroundColor: theme.colors.accent.DEFAULT, opacity: 0.1 }} 
      />
      <div 
        className="absolute top-1/2 right-0 w-64 h-64 -translate-y-1/2 rounded-full blur-[100px] -mr-32 pointer-events-none" 
        style={{ backgroundColor: theme.colors.secondary[200], opacity: 0.05 }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10">
          
          {/* Left: Trust Points */}
          <div className="w-full xl:w-1/3 flex flex-col items-center xl:items-start animate-fade-in">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.15)'),
                borderColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.3)'),
                borderWidth: theme.borders.width.thin,
                color: theme.colors.accent.DEFAULT
              }}
            >
              <ShieldCheck className="w-3 h-3" />
              Why clients come to us
            </div>
            
            <div 
              className="flex flex-wrap justify-center xl:justify-start items-center gap-4 p-5 rounded-2xl w-full max-w-lg transition-all duration-300 hover:[box-shadow:var(--hover-shadow)]"
              style={{
                backgroundColor: theme.surfaces.card,
                border: `${theme.borders.width.medium} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.4)')}`,
                boxShadow: theme.effects.shadows.lg,
                '--hover-shadow': theme.effects.shadows.accentGlow
              } as React.CSSProperties}
            >
              <span className="text-sm font-bold text-foreground/90">Independent</span>
              <span className="text-accent">•</span>
              <span className="text-sm font-bold text-foreground/90">Evidence-led</span>
              <span className="text-accent">•</span>
              <span className="text-sm font-bold text-foreground/90">Clear reporting</span>
            </div>
          </div>

          {/* Right: Trust Metrics */}
          <div className="w-full xl:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
              {trustItems.map((item, index) => {
                const isGoogle = item.label === "Reviews";
                const Wrapper = isGoogle ? "a" : "div";
                const wrapperProps = isGoogle ? { href: siteSettings.googlePageUrl, target: "_blank" as const, rel: "noopener noreferrer" } : {};
                return (
                <Wrapper
                  key={index}
                  {...wrapperProps}
                  className="flex flex-row md:flex-col items-center md:text-center justify-center md:justify-start gap-2 md:gap-0 group p-2.5 md:p-4 rounded-xl md:rounded-2xl transition-all duration-500 animate-fade-in hover:[transform:var(--hover-transform)] hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)] w-full min-w-0"
                  style={{
                    animationDelay: `${0.1 * index}s`,
                    backgroundColor: theme.colors.primary[800].replace(')', ' / 0.6)'),
                    border: `${theme.borders.width.thin} solid ${theme.colors.primary[700]}`,
                    '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
                    '--hover-border': theme.colors.accent.DEFAULT,
                    '--hover-shadow': theme.effects.shadows.glowNavy
                  } as React.CSSProperties}
                >
                  <div 
                    className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-lg md:rounded-xl flex items-center justify-center md:mb-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      backgroundColor: theme.colors.primary[900],
                      border: `${theme.borders.width.thin} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.3)')}`,
                      boxShadow: theme.effects.shadows.md
                    }}
                  >
                    <item.icon 
                      className="w-5 h-5 md:w-7 md:h-7 transition-colors duration-300" 
                      style={{ color: theme.colors.accent.DEFAULT }} 
                      strokeWidth={2.5} 
                    />
                  </div>
                  
                  <div className="flex flex-col min-w-0 flex-1 md:flex-none text-left md:text-center">
                    <p 
                      className="font-display font-black text-base md:text-2xl leading-none mb-0.5 md:mb-1 transition-colors duration-300"
                      style={{ color: theme.surfaces.primaryForeground }}
                    >
                      {item.value}
                    </p>
                    <p 
                      className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: theme.colors.accent.DEFAULT }}
                    >
                      {item.label}
                    </p>
                    <p 
                      className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider mt-0.5 md:mt-1 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ color: theme.surfaces.primaryForeground }}
                    >
                      {item.subtext}
                    </p>
                  </div>
                </Wrapper>
              );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
