import { useState } from "react";
import { Phone, Clock, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ctaBackground from "@/assets/general/damp-survey-thermal-imaging.webp";
import { toast } from "sonner";
import { siteSettings } from "@/data/siteSettings";
import { formEndpoints, postFormSubmission } from "@/lib/formApi";
import { normalizeUKPhone } from "@/lib/phoneUtils";

import { getFinalCtaContent, getFormServiceOptions, getFormServicePlaceholder } from "@/data/content";

interface FinalCTAProps {
  areaName?: string;
}

const FinalCTA = ({ areaName }: FinalCTAProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressRegion;
  const finalCTA = getFinalCtaContent(displayArea);
  
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
        source: "website_cta_form",
        area: displayArea,
      });

      toast.success("Thank you! We'll call you back within 15 minutes.");
      setFormData({ name: "", phone: "", issue: "", postcode: "" });
    } catch {
      toast.error("Something went wrong. Please Call Now directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 md:py-16 lg:py-24 relative overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={ctaBackground}
          alt={`Kitchen wrapping transformation in ${displayArea}`}
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
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-[10px] sm:text-xs font-semibold mb-4 md:mb-6">
              <Clock className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
              {finalCTA.emergencyBadge}
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4 md:mb-6 leading-tight">
              {finalCTA.title}
              <br />
              <span className="text-accent relative">
                {finalCTA.subtitle}
                <span className="absolute bottom-1 left-0 w-full h-2 bg-accent/20 -z-10" aria-hidden="true" />
              </span>
            </h2>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
              {finalCTA.description}
            </p>

            {/* Phone Number */}
            <div className="mb-6 md:mb-8 w-full md:w-auto">
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto h-auto px-4 py-2.5 md:px-6 md:py-3 bg-accent hover:bg-accent/90 text-accent-foreground text-lg sm:text-xl md:text-2xl font-display font-bold shadow-lg shadow-accent/20 transition-all active:scale-95"
              >
                <a
                  href={`tel:${siteSettings.phoneFormatted.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-foreground/20 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </div>
                  Call Now
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
              {finalCTA.points.map(
                (point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-primary-foreground/20"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    <span className="text-primary-foreground text-xs md:text-sm font-medium">
                      {point}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-card rounded-2xl p-5 md:p-8 shadow-2xl max-w-md mx-auto lg:ml-auto border border-accent/20 relative">
            <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-accent rounded-xl shadow-lg flex items-center justify-center -rotate-12 border-2 border-background">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent-foreground" strokeWidth={2.5} />
            </div>
            <h3 className="font-display font-bold text-xl md:text-2xl text-card-foreground mb-2">
              {finalCTA.formTitle}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mb-5 md:mb-6">
              {finalCTA.formSubtitle}
            </p>

            <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input
                  placeholder="Your Name"
                  className="h-11 md:h-12 bg-background border-0 focus-visible:ring-accent text-sm md:text-base"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="h-11 md:h-12 bg-background border-0 focus-visible:ring-accent text-sm md:text-base"
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
                  <SelectTrigger className="h-11 md:h-12 bg-background border-0 focus:ring-accent text-sm md:text-base">
                    <SelectValue placeholder={getFormServicePlaceholder()} />
                  </SelectTrigger>
                  <SelectContent>
                    {getFormServiceOptions().map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  placeholder="Postcode"
                  className="h-11 md:h-12 bg-background border-0 focus-visible:ring-accent text-sm md:text-base"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  maxLength={10}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 md:h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg font-bold shadow-lg shadow-accent/20 transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    {finalCTA.ctaText}
                    <ChevronRight className="w-5 h-5 ml-1" strokeWidth={3} />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-muted-foreground text-xs mt-4">
              🔒 Your details are secure and never shared
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;