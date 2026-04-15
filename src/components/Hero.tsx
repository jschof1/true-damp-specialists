import { useState } from "react";
import { Phone, ShieldCheck, ChevronRight, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { siteSettings } from "@/data/siteSettings";
import { formEndpoints, postFormSubmission } from "@/lib/formApi";
import { normalizeUKPhone } from "@/lib/phoneUtils";
import { getHeroContent, getFormServiceOptions, getFormServicePlaceholder } from "@/data/content";
import checkatradeLogo from "@/assets/icons/certifications/checkatrade.webp";
import pcaLogo from "@/assets/icons/certifications/pca-logo.png";

interface HeroProps {
  areaName?: string;
  description?: string;
}

const Hero = ({ areaName, description }: HeroProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressLocality;
  const hero = getHeroContent(displayArea);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    issue: "",
    postcode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Please fill in your name and phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      await postFormSubmission(formEndpoints.contact, {
        name: formData.name.trim(),
        phone: normalizeUKPhone(formData.phone.trim()),
        issue: formData.issue,
        postcode: formData.postcode.trim(),
        source: "website_hero_form",
        area: displayArea,
      });

      toast.success("Thank you! We'll call you back shortly.");
      setFormData({ name: "", phone: "", issue: "", postcode: "" });
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayDescription = description || hero.description;

  return (
    <section className="relative min-h-[min(72vh,780px)] flex items-center overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/true-damp-hero-building.jpeg"
          alt={`Damp and moisture investigation in ${displayArea}`}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          decoding="async"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/45 md:from-primary md:via-primary/80 md:to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-12 xl:px-24 relative z-10 py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.5fr_1fr] gap-6 sm:gap-8 lg:gap-16 xl:gap-24 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in lg:pr-8 xl:pr-16">
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/90 font-medium text-sm sm:text-base">
                <span>5 stars rated on</span>
                <img src={checkatradeLogo} alt="Checkatrade" className="h-6 w-auto object-contain" />
              </div>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground leading-[1.05] mb-5 sm:mb-6 drop-shadow-sm">
              Independent Specialists in{" "}
              <span className="text-accent">Damp, Mould &amp; Waterproofing</span>{" "}
              Investigation
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {displayDescription}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              {hero.badges.slice(0, 3).map((badge: { text: string }, i: number) => {
                const isPCA = badge.text.toLowerCase().includes("pca");
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground/90 font-medium backdrop-blur-sm"
                  >
                    {isPCA ? (
                      <img src={pcaLogo} alt="PCA Logo" className="w-4 h-auto object-contain shrink-0" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                    )}
                    {badge.text}
                  </span>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 h-12 rounded-xl shadow-xl shadow-accent/20">
                <a href={`tel:${siteSettings.phone}`} className="inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {siteSettings.phoneFormatted}
                </a>
              </Button>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="animate-slide-in-right w-full opacity-0" style={{ animationDelay: "0.5s" }}>
            <div className="relative w-full max-w-xl mx-auto lg:ml-auto shadow-2xl shadow-black/50">
              <div
                className="absolute inset-0 bg-accent rounded-xl"
                style={{ clipPath: "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)" }}
              />
              <div
                className="absolute inset-[2px] bg-primary rounded-xl"
                style={{ clipPath: "polygon(0 0, calc(100% - 46px) 0, 100% 46px, 100% 100%, 0 100%)" }}
              />

              <div className="relative z-10 p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-primary-foreground mb-2 leading-tight tracking-tight">
                    {hero.formTitle}
                  </h2>
                  <p className="text-primary-foreground/80 text-base sm:text-lg font-medium">
                    {hero.formSubtitle}
                  </p>
                </div>

                <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-6 h-6 text-primary-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <Input
                      placeholder="First & Last Name"
                      className="h-14 pl-12 text-lg bg-white/5 border border-white/10 focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent transition-all text-primary-foreground placeholder:text-primary-foreground/50 rounded-md"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-6 h-6 text-primary-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      className="h-14 pl-12 text-lg bg-white/5 border border-white/10 focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent transition-all text-primary-foreground placeholder:text-primary-foreground/50 rounded-md"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      maxLength={20}
                      required
                    />
                  </div>
                  <div>
                    <Select
                      value={formData.issue}
                      onValueChange={(value) => setFormData({ ...formData, issue: value })}
                    >
                      <SelectTrigger className="h-14 text-lg bg-white/5 border border-white/10 focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent transition-all text-primary-foreground text-left rounded-md">
                        <SelectValue placeholder={getFormServicePlaceholder()} />
                      </SelectTrigger>
                      <SelectContent className="border border-border bg-popover text-popover-foreground">
                        {getFormServiceOptions().map((opt) => (
                          <SelectItem key={opt.value} value={opt.value} className="text-lg py-3 cursor-pointer">
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 mt-4 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold transition-all uppercase tracking-wide group rounded-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        {hero.ctaText}
                        <ChevronRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" strokeWidth={3} aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
