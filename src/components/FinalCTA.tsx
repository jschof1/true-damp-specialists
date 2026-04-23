import { Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaBackground from "@/assets/general/damp-survey-thermal-imaging.webp";
import { Link } from "react-router-dom";
import { siteSettings } from "@/data/siteSettings";

import { getFinalCtaContent } from "@/data/content";

interface FinalCTAProps {
  areaName?: string;
}

const FinalCTA = ({ areaName }: FinalCTAProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressRegion;
  const finalCTA = getFinalCtaContent(displayArea);

  return (
    <section id="contact" className="py-10 md:py-16 lg:py-24 relative overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={ctaBackground}
          alt={`Damp and moisture investigation background in ${displayArea}`}
          className="w-full h-full object-cover opacity-20 grayscale"
          width={1920}
          height={1080}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/90 to-primary" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 z-[1]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-[10px] sm:text-xs font-semibold mb-4 md:mb-6">
            <Clock className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
            {finalCTA.emergencyBadge}
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4 md:mb-6 leading-tight">
            {finalCTA.title}
          </h2>

          <div className="mx-auto mb-8 max-w-2xl text-lg md:text-xl text-primary-foreground/80 leading-relaxed space-y-4">
            {String(finalCTA.description)
              .split("\n\n")
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-accent px-6 text-base font-bold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90 sm:h-14 sm:px-8"
            >
              <Link to="/get-quote">{finalCTA.ctaText}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-primary-foreground/25 bg-transparent px-6 text-base font-bold text-primary-foreground hover:bg-primary-foreground/10 sm:h-14 sm:px-8"
            >
              <a
                href={`tel:${siteSettings.phoneFormatted.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" strokeWidth={2.5} />
                {finalCTA.secondaryCtaText ?? "Call Now"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;