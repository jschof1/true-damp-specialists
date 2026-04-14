import { useState, useEffect, useRef, useMemo } from "react";
import SEO from "@/components/SEO";
import { Link, useSearchParams } from "react-router-dom";
import { Phone, Clock, Shield, CheckCircle2, ChevronRight, ChevronLeft, Loader2, LayoutGrid, Package, Square, Box, Building2, Home, Armchair, MessageCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteSettings } from "@/data/siteSettings";
import { formEndpoints, postFormSubmission } from "@/lib/formApi";
import { normalizeUKPhone } from "@/lib/phoneUtils";
import { getQuoteServiceOptions, getQuoteUrgencyOptions, getQuoteFormLabels } from "@/data/content";
import GoogleIcon from "@/components/GoogleIcon";
import heroBackground from "@/assets/general/damp-survey-equipment-flatlay.webp";

const ICON_MAP: Record<string, LucideIcon> = {
  layout: LayoutGrid,
  package: Package,
  square: Square,
  box: Box,
  building: Building2,
  home: Home,
  armchair: Armchair,
  "message-circle": MessageCircle,
};

const propertyOptions = [
  { id: "house", label: "House" },
  { id: "flat", label: "Flat/Apartment" },
  { id: "commercial", label: "Commercial" },
];

const GetQuotePage = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(() => {
    const validServices = getQuoteServiceOptions().map(s => s.id);
    const validUrgencies = getQuoteUrgencyOptions().map(u => u.id);
    const validProperties = propertyOptions.map(p => p.id);
    
    const serviceParam = searchParams.get("service") || "";
    const urgencyParam = searchParams.get("urgency") || "";
    const propertyParam = searchParams.get("property") || "";
    
    const hasValidService = validServices.includes(serviceParam);
    const hasValidUrgency = validUrgencies.includes(urgencyParam);
    const hasValidProperty = validProperties.includes(propertyParam);
    
    if (hasValidService && hasValidUrgency && hasValidProperty) return 3;
    if (hasValidService && hasValidUrgency) return 2;
    return 1;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const quoteLabels = getQuoteFormLabels();
  const serviceOptions = useMemo(() => {
    return getQuoteServiceOptions().map((opt) => ({
      ...opt,
      icon: ICON_MAP[opt.icon ?? "layout"] ?? LayoutGrid,
    }));
  }, []);
  const urgencyOptions = getQuoteUrgencyOptions();
  
  // Initialize form data from query parameters
  const [formData, setFormData] = useState(() => {
    const validServices = getQuoteServiceOptions().map(s => s.id);
    const validUrgencies = getQuoteUrgencyOptions().map(u => u.id);
    const validProperties = propertyOptions.map(p => p.id);
    
    const serviceParam = searchParams.get("service") || "";
    const urgencyParam = searchParams.get("urgency") || "";
    const propertyParam = searchParams.get("property") || "";
    
    return {
      service: validServices.includes(serviceParam) ? serviceParam : "",
      urgency: validUrgencies.includes(urgencyParam) ? urgencyParam : "",
      propertyType: validProperties.includes(propertyParam) ? propertyParam : "",
      description: searchParams.get("description") || "",
      name: searchParams.get("name") || "",
      phone: searchParams.get("phone") || "",
      email: searchParams.get("email") || "",
      postcode: searchParams.get("postcode") || "",
    };
  });


  const totalSteps = 3;

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.service && formData.urgency;
      case 2:
        return formData.propertyType;
      case 3:
        return formData.name && formData.phone && formData.postcode;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.postcode.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await postFormSubmission(formEndpoints.quote, {
        name: formData.name.trim(),
        phone: normalizeUKPhone(formData.phone.trim()),
        email: formData.email.trim(),
        postcode: formData.postcode.trim(),
        service: formData.service,
        urgency: formData.urgency,
        propertyType: formData.propertyType,
        description: formData.description.trim(),
        source: "website_quote_page",
      });

      setStep(4); // Success step
    } catch {
      toast.error("Something went wrong. Please Call Now directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={`Request a Survey | ${siteSettings.businessName}`}
        description={`Request an independent damp, mould or waterproofing survey in under 2 minutes. Fast response across ${siteSettings.addressDetails.addressLocality} and ${siteSettings.addressDetails.addressRegion}.`}
        path="/get-quote"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Get a Quote", path: "/get-quote" },
        ]}
      />

      <Header />

      <main className="min-h-screen bg-background relative">
        {/* Hero Section - matches portfolio */}
        <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBackground}
              alt={`${siteSettings.businessName} survey request background`}
              className="w-full h-full object-cover opacity-40"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 animate-fade-in shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden />
              Takes less than 2 minutes
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in">
              Get Your Free Quote
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
              Request an independent survey or second opinion. Fast response across our core coverage areas and specialist support nationwide.
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in">
              <a
                href="#quote-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg shadow-xl shadow-accent/25 transition-colors"
              >
                Start your quote
              </a>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="quote-form" ref={formRef} className="pb-12 md:pb-20 pt-12 md:pt-16 scroll-mt-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                  {/* Progress Bar - compact */}
                  {step <= totalSteps && (
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                        <span>Step {step} of {totalSteps}</span>
                        <span>{Math.round((step / totalSteps) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-accent-gradient transition-all duration-500 ease-out shadow-[0_0_12px_hsl(var(--accent)/0.3)]"
                          style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Form Card */}
                  <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden relative">
                {/* Step 1: Service & Urgency */}
                {step === 1 && (
                  <div className="p-5 md:p-8">
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
                      {quoteLabels.step1Title}
                    </h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                      {serviceOptions.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => updateField("service", service.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] group relative overflow-hidden ${
                            formData.service === service.id
                              ? "border-accent bg-accent/5 shadow-md"
                              : "border-border bg-background hover:border-accent/30 hover:bg-accent/5"
                          }`}
                        >
                          {formData.service === service.id && (
                            <div className="absolute top-3 right-3 text-accent animate-in fade-in zoom-in duration-200">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          )}
                          <service.icon className={`w-6 h-6 mb-2 transition-colors ${formData.service === service.id ? "text-accent" : "text-muted-foreground group-hover:text-accent/70"}`} />
                          <div className="font-bold text-sm text-foreground mb-1 pr-6">{service.label}</div>
                          <div className="text-[11px] leading-snug text-muted-foreground line-clamp-2">{service.description}</div>
                        </button>
                      ))}
                    </div>

                    <h3 className="font-display text-lg font-bold text-foreground mb-4">
                      {quoteLabels.urgencyTitle}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {urgencyOptions.map((urgency) => (
                        <button
                          key={urgency.id}
                          onClick={() => updateField("urgency", urgency.id)}
                          className={`p-4 rounded-xl border-2 text-center transition-all active:scale-[0.98] group relative overflow-hidden ${
                            formData.urgency === urgency.id
                              ? "border-accent bg-accent/5 shadow-md"
                              : "border-border bg-background hover:border-accent/30 hover:bg-accent/5"
                          }`}
                        >
                          {formData.urgency === urgency.id && (
                            <div className="absolute top-2 right-2 text-accent animate-in fade-in zoom-in duration-200">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          )}
                          <div className={`w-3 h-3 rounded-full ${urgency.color} mx-auto mb-2 shadow-sm`} />
                          <div className="font-bold text-sm text-foreground mb-1">{urgency.label}</div>
                          <div className="text-[10px] leading-tight text-muted-foreground">{urgency.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Property & Description */}
                {step === 2 && (
                  <div className="p-5 md:p-8">
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
                      {quoteLabels.step2Title}
                    </h2>
                    
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {propertyOptions.map((property) => (
                        <button
                          key={property.id}
                          onClick={() => updateField("propertyType", property.id)}
                          className={`p-4 rounded-xl border-2 text-center transition-all active:scale-[0.98] relative overflow-hidden ${
                            formData.propertyType === property.id
                              ? "border-accent bg-accent/5 shadow-md"
                              : "border-border bg-background hover:border-accent/30 hover:bg-accent/5"
                          }`}
                        >
                          {formData.propertyType === property.id && (
                            <div className="absolute top-2 right-2 text-accent animate-in fade-in zoom-in duration-200">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          )}
                          <div className="font-bold text-sm text-foreground">{property.label}</div>
                        </button>
                      ))}
                    </div>

                    <h3 className="font-display text-lg font-bold text-foreground mb-4">
                      {quoteLabels.descriptionLabel}
                    </h3>
                    
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateField("description", e.target.value)}
                      placeholder={quoteLabels.descriptionPlaceholder}
                      className="w-full h-32 p-4 rounded-xl border-2 border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none shadow-sm"
                    />
                  </div>
                )}

                {/* Step 3: Contact Details */}
                {step === 3 && (
                  <div className="p-5 md:p-8">
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                      How can we reach you?
                    </h2>
                    <p className="text-sm font-medium text-muted-foreground mb-6 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      We'll call you back within 15 minutes.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider group-focus-within:text-accent transition-colors">Your Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder="John Smith"
                          className="w-full p-4 rounded-xl border-2 border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors shadow-sm"
                        />
                      </div>
                      
                      <div className="group">
                        <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider group-focus-within:text-accent transition-colors">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="07123 456789"
                          className="w-full p-4 rounded-xl border-2 border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors shadow-sm"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider group-focus-within:text-accent transition-colors">Email (optional)</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="john@email.com"
                          className="w-full p-4 rounded-xl border-2 border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors shadow-sm"
                        />
                      </div>
                      
                      <div className="group">
                        <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider group-focus-within:text-accent transition-colors">Postcode *</label>
                        <input
                          type="text"
                          value={formData.postcode}
                          onChange={(e) => updateField("postcode", e.target.value)}
                          placeholder="AL3 5TD"
                          className="w-full p-4 rounded-xl border-2 border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <div className="p-8 md:p-12 text-center">
                    <div className="w-20 h-20 bg-accent-gradient text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <CheckCircle2 className="w-10 h-10 text-accent" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Request Received!
                    </h2>
                    <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                      Thanks <span className="text-foreground font-bold">{formData.name.split(" ")[0]}</span>! We've received your request and will call you back within 15 minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button asChild className="bg-accent-gradient hover:opacity-90 text-accent-foreground font-bold h-14 px-8 text-lg rounded-xl shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <a href={`tel:${siteSettings.phoneFormatted.replace(/\s/g, "")}`}>
                          <Phone className="w-5 h-5 mr-3" />
                          Call Now
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="h-14 px-8 rounded-xl border-2 font-bold hover:bg-accent/5 hover:text-accent hover:border-accent/30 transition-all">
                        <Link to="/">Back to Home</Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {step <= totalSteps && (
                  <div className="px-5 md:px-8 py-5 bg-neutral-50 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(prev => prev - 1)}
                      disabled={step === 1}
                      className={`font-bold transition-all w-full sm:w-auto ${step === 1 ? "invisible" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      Back
                    </Button>

                    {step < totalSteps ? (
                      <Button
                        onClick={() => setStep(prev => prev + 1)}
                        disabled={!canProceed()}
                        className={`w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-8 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${canProceed() ? 'animate-pulse-subtle shadow-[0_0_15px_hsl(var(--primary)/0.3)]' : ''}`}
                      >
                        Continue
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    ) : (
                      <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
                        <Button
                          onClick={handleSubmit}
                          disabled={!canProceed() || isSubmitting}
                          className="w-full sm:w-auto bg-accent-gradient hover:opacity-90 text-accent-foreground font-bold h-14 px-8 rounded-xl shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Get My Free Quote"
                          )}
                        </Button>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 flex items-center gap-1">
                          <Shield className="w-3 h-3 text-accent" />
                          100% Free & No Obligation
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Emergency Banner - compact */}
              {step <= totalSteps && (
                <div className="mt-6 p-4 bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-border text-center shadow-sm">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Prefer to speak now?</span>{" "}
                    <a
                      href={`tel:${siteSettings.phoneFormatted.replace(/\s/g, "")}`}
                      className="text-accent font-black hover:text-accent/80 transition-colors inline-flex items-center gap-1.5 ml-1"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Trust & Social Proof */}
            <div className="lg:col-span-4 space-y-6 hidden lg:block">
              {/* Trust Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-display font-bold text-lg mb-4">Why choose us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Fast, Free Quotes</div>
                      <div className="text-xs text-muted-foreground">No obligation, transparent pricing.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">12-Month Guarantee</div>
                      <div className="text-xs text-muted-foreground">We stand by our premium workmanship.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Quick Turnaround</div>
                      <div className="text-xs text-muted-foreground">Most projects completed in 1-2 days.</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Testimonial Card */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full -z-10" />
                <div className="flex gap-1 text-accent mb-3">
                  {[1, 2, 3, 4, 5].map((s) => <GoogleIcon key={s} className="w-4 h-4" />)}
                </div>
                <p className="text-sm font-medium italic mb-4 leading-relaxed">
                  "The survey gave us clarity on the actual cause of the problem and stopped us paying for the wrong remedial work."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                    SJ
                  </div>
                  <div>
                    <div className="font-bold text-sm">Client review</div>
                    <div className="text-xs text-primary-foreground/70">Independent diagnosis-first feedback</div>
                  </div>
                </div>
              </div>
              
              {/* Privacy Note */}
              <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                Your information is 100% secure.
              </div>
            </div>
          </div>
        </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default GetQuotePage;
