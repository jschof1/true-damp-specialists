import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { siteSettings } from "@/data/siteSettings";

export function BlogCTA() {
  return (
    <section className="mt-20 rounded-2xl md:rounded-[2.5rem] bg-primary p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-primary/20 group">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-accent/10 transition-colors duration-500" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <Phone className="w-3 h-3 fill-accent" />
          Independent Advice
        </div>
        
        <h2 className="font-display text-3xl md:text-5xl font-black text-primary-foreground mb-6 leading-tight">
          Need help with a <span className="text-accent">damp or mould problem?</span>
        </h2>
        
        <p className="text-primary-foreground/70 mb-10 text-base md:text-xl leading-relaxed font-medium">
          Book an independent survey, get a clear diagnosis and understand the right remedial path before you spend money on the wrong fix.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-black px-8 h-14 rounded-xl text-lg shadow-xl shadow-accent/20 transition-transform hover:scale-105 active:scale-95">
            <Link to="/get-quote" className="flex items-center gap-2">
              Book a survey <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-black px-8 h-14 rounded-xl text-lg transition-transform hover:scale-105 active:scale-95"
          >
            <a href={`tel:${siteSettings.phoneFormatted.replace(/\s/g, "")}`} className="flex items-center gap-2">
              <Phone className="h-5 w-5" /> Call now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
