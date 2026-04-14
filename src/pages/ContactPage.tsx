import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  ChevronRight, 
  Loader2, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  Award,
  ThumbsUp,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviewStats } from "@/data/reviews";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteSettings } from "@/data/siteSettings";
import { formEndpoints, postFormSubmission } from "@/lib/formApi";
import { normalizeUKPhone } from "@/lib/phoneUtils";
import { cn } from "@/lib/utils";

import GoogleIcon from "@/components/GoogleIcon";
import { getContactPageContent, getFormServiceOptions, getFormServicePlaceholder, getFormServiceLabel } from "@/data/content";
import heroBackground from "@/assets/general/damp-inspection-report-writing.webp";

const ContactPage = () => {
  const contactPage = getContactPageContent();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    issue: "",
    postcode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"emergency" | "quote">("emergency");

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
        source: "website_contact_page_v2",
      });

      toast.success("Thank you! We'll call you back within 15 minutes.");
      setFormData({ name: "", phone: "", issue: "", postcode: "" });
    } catch {
      toast.error("Something went wrong. Please Call Now directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { label: "Response", value: "Fast", icon: Clock },
    { label: "Google Rating", value: "5/5", icon: GoogleIcon },
    { label: "Survey Focus", value: "Independent", icon: CheckCircle2 },
    { label: "Years Exp", value: "15+", icon: Award },
  ];

  return (
    <>
      <SEO
        title={`Contact ${siteSettings.businessName} | Independent Damp Specialists`}
        description={`Speak to ${siteSettings.businessName} about damp surveys, mould, condensation, waterproofing and remedial project support.`}
        path="/contact"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${siteSettings.businessName}`,
          url: `${siteSettings.baseUrl}/contact`,
          mainEntity: {
            "@id": `${siteSettings.baseUrl}/#organization`,
          },
        }}
      />

      <Header />

      <main className="min-h-screen bg-background selection:bg-accent/30 overflow-x-hidden">
        {/* Hero Section - matches portfolio */}
        <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBackground}
              alt={`${siteSettings.businessName} contact page background`}
              className="w-full h-full object-cover opacity-40"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 animate-fade-in shrink-0">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden />
              {contactPage.hero.badge || "Independent Survey Support"}
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in inline-flex flex-wrap items-center justify-center gap-3">
              {contactPage.hero.accentPhrase ? (() => {
                const parts = contactPage.hero.title.split(contactPage.hero.accentPhrase);
                return (
                  <>
                    {parts[0]}
                    <span className="text-accent relative inline-block">
                      {contactPage.hero.accentPhrase}
                      <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/20 -z-10 -rotate-1" aria-hidden="true" />
                    </span>
                    {parts[1]}
                  </>
                );
              })() : (
                contactPage.hero.title
              )}
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
              {contactPage.hero.description}
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg shadow-xl shadow-accent/25">
                <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-6 sm:px-8 h-12 sm:h-14 rounded-xl text-base sm:text-lg">
                <a href="#contact">Send a message</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Contact Hub */}
        <section id="contact" className="relative z-20 pt-12 md:pt-16 pb-36 md:pb-24">
          <div className="container mx-auto px-4 max-w-full overflow-x-hidden">
            <div className="max-w-6xl mx-auto min-w-0">
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left Column: The "Brains" (Form) */}
                <div className="lg:col-span-7 min-w-0">
                  <div className="bg-card rounded-2xl md:rounded-[2.5rem] shadow-xl border border-border overflow-hidden">
                    <div className="flex border-b border-border">
                      <button 
                        onClick={() => setActiveTab("emergency")}
                        className={cn(
                          "flex-1 py-4 sm:py-6 px-3 sm:px-4 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                          activeTab === "emergency" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <Zap className={cn("w-4 h-4", activeTab === "emergency" ? "text-accent" : "")} />
                        {contactPage.form.emergencyTab}
                      </button>
                      <button 
                        onClick={() => setActiveTab("quote")}
                        className={cn(
                          "flex-1 py-4 sm:py-6 px-3 sm:px-4 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                          activeTab === "quote" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <MessageSquare className={cn("w-4 h-4", activeTab === "quote" ? "text-accent" : "")} />
                        {contactPage.form.quoteTab}
                      </button>
                    </div>

                    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                      <div className="mb-6 md:mb-10">
                        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-4 text-card-foreground">
                          {activeTab === "emergency" ? contactPage.form.emergencyTitle : contactPage.form.quoteTitle}
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg">
                          {activeTab === "emergency" 
                            ? contactPage.form.emergencySubtitle 
                            : contactPage.form.quoteSubtitle}
                        </p>
                      </div>

                      <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Your Full Name</label>
                            <Input
                              placeholder="John Smith"
                              className="h-12 sm:h-14 bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 transition-all rounded-xl sm:rounded-2xl px-4 sm:px-6 text-base sm:text-lg text-foreground"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                            <Input
                              type="tel"
                              placeholder="07123 456789"
                              className="h-12 sm:h-14 bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 transition-all rounded-xl sm:rounded-2xl px-4 sm:px-6 text-base sm:text-lg text-foreground"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{getFormServiceLabel()}</label>
                            <Select
                              value={formData.issue}
                              onValueChange={(value) => setFormData({ ...formData, issue: value })}
                            >
                              <SelectTrigger className="h-12 sm:h-14 bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 transition-all rounded-xl sm:rounded-2xl px-4 sm:px-6 text-base sm:text-lg w-full min-w-0 text-foreground">
                                <SelectValue placeholder={getFormServicePlaceholder()} />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-2 max-w-[calc(100vw-2rem)] bg-popover text-popover-foreground" position="popper">
                                {getFormServiceOptions().map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Postcode</label>
                            <Input
                              placeholder="SE15 2NG"
                              className="h-12 sm:h-14 bg-background border-2 border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 transition-all rounded-xl sm:rounded-2xl px-4 sm:px-6 text-base sm:text-lg text-foreground"
                              value={formData.postcode}
                              onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 sm:h-16 bg-accent hover:bg-accent/90 text-accent-foreground text-lg sm:text-xl font-black rounded-xl sm:rounded-2xl shadow-xl shadow-accent/20 hover:shadow-none hover:translate-y-1 transition-all mt-4 group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <>
                              {activeTab === "emergency" ? (contactPage.form?.ctaEmergency || "REQUEST RAPID CALLBACK") : (contactPage.form?.ctaQuote || "GET MY FREE QUOTATION")}
                              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </>
                          )}
                        </Button>
                      </form>

                      <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-50 grayscale hover:grayscale-0 transition-all" aria-hidden="true">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          <span className="text-sm font-bold uppercase tracking-tighter">Professional Installers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm font-bold uppercase tracking-tighter">Fully Insured</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-5 h-5" />
                          <span className="text-sm font-bold uppercase tracking-tighter">12-Month Guarantee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: The "Heart" (Info & Map) */}
                <div className="lg:col-span-5 space-y-6 sm:space-y-8 min-w-0">
                  {/* Direct Contact Cards */}
                  <div className="grid gap-2 sm:gap-4">
                    <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="group flex items-center gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-5 lg:p-6 bg-primary text-primary-foreground rounded-xl sm:rounded-2xl md:rounded-[2rem] transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shrink-0 group-hover:bg-accent/90 transition-all">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary-foreground/60 mb-0.5 sm:mb-1">Call the survey team</div>
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-black break-words leading-tight">{siteSettings.phone}</div>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground group-hover:text-primary transition-all">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      </div>
                    </a>

                    <a href={`mailto:${siteSettings.email}`} className="group flex items-center gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-5 lg:p-6 bg-card border border-border rounded-xl sm:rounded-2xl md:rounded-[2rem] transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shrink-0 group-hover:bg-accent/90 transition-all">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground mb-0.5 sm:mb-1">Email Enquiries</div>
                        <div className="text-sm sm:text-base md:text-xl font-bold break-all leading-tight text-card-foreground">{siteSettings.email}</div>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      </div>
                    </a>
                  </div>

                  {/* Map Card */}
                  <div className="bg-card rounded-2xl md:rounded-[2.5rem] border border-border overflow-hidden shadow-xl group">
                    <div className="p-6 border-b border-border flex flex-wrap items-center gap-4 justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-black text-card-foreground">Base Location</div>
                          <div className="text-xs text-muted-foreground">{siteSettings.address}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="rounded-full w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-ring">
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(siteSettings.address)}`} target="_blank" rel="noopener noreferrer">
                          Directions <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                    <div className="h-[220px] sm:h-[280px] md:h-[300px] relative grayscale group-hover:grayscale-0 transition-all duration-700">
                      <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(siteSettings.address)}&z=10&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${siteSettings.businessName} Office Location`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-24 bg-secondary/30 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display font-black text-4xl md:text-5xl mb-4">Trusted by Hundreds of <br className="md:hidden" /> Local Homeowners</h2>
              <div className="flex items-center justify-center gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
                <span className="ml-2 text-xl font-bold text-primary">{reviewStats.averageRating}/5 <a href={siteSettings.googlePageUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Rating</a></span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  text: "They explained the damp problem properly, ruled out the wrong treatment and gave us a report we could actually use.",
                  author: "James W.",
                  area: "Watford"
                },
                {
                  text: "Finally someone who looked at ventilation, moisture patterns and defects together instead of jumping straight to damp proofing.",
                  author: "Sarah L.",
                  area: "St Albans"
                },
                {
                  text: "We needed an independent second opinion before spending money on remedial works, and the report gave us exactly that clarity.",
                  author: "Robert M.",
                  area: "High Wycombe"
                }
              ].map((review, i) => (
                <div key={i} className="bg-card p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-xl transition-all">
                  <div className="flex gap-1 text-accent mb-4">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-lg font-medium mb-6 italic">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="font-bold">{review.author}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest">{review.area}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Floating CTA for Mobile */}
        <div className="fixed bottom-6 left-6 right-6 z-[100] md:hidden">
          <Button asChild size="lg" className="w-full h-16 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-black rounded-2xl shadow-2xl animate-bounce-subtle focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="flex items-center justify-center gap-3">
              <Phone className="w-6 h-6" />
              Call Now
            </a>
          </Button>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
