import { useState } from "react";
import SEO from "@/components/SEO";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  getContactPageContent,
  getFormServiceLabel,
  getFormServiceOptions,
  getFormServicePlaceholder,
} from "@/data/content";
import heroBackground from "@/assets/general/damp-inspection-report-writing.webp";

const ContactPage = () => {
  const contactPage = getContactPageContent() as {
    hero: { badge: string; title: string; accentPhrase?: string; description: string };
    form: {
      emergencyTab: string;
      quoteTab: string;
      emergencyTitle: string;
      quoteTitle: string;
      emergencySubtitle: string;
      quoteSubtitle: string;
      ctaEmergency: string;
      ctaQuote: string;
      previousAdviceLabel: string;
      previousAdvicePlaceholder: string;
    };
    whereWeWork: { title: string; description: string };
    positioning: { title: string; description: string };
    preEnquiry: { title: string; description: string; items: string[]; closing: string };
    trust: { title: string; description: string };
    finalCta: { title: string; description: string; primaryText: string; secondaryText: string };
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    issue: "",
    previousAdvice: "",
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
        previousAdvice: formData.previousAdvice.trim(),
        postcode: formData.postcode.trim(),
        source: "website_contact_page_v3",
      });

      toast.success("Thanks — we’ll review your enquiry and point you in the right direction.");
      setFormData({ name: "", phone: "", issue: "", previousAdvice: "", postcode: "" });
    } catch {
      toast.error("Something went wrong. Please call or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={`Contact ${siteSettings.businessName} | Independent Damp Specialists`}
        description="Speak to a damp and moisture specialist for independent advice, diagnosis-led surveys, second opinions, and clear next-step guidance."
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

      <main className="min-h-screen overflow-x-hidden bg-background">
        <section className="relative overflow-hidden bg-primary pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBackground}
              alt={`${siteSettings.businessName} contact page background`}
              className="h-full w-full object-cover opacity-40"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground sm:px-4 sm:py-2 sm:text-sm">
              <MessageSquare className="h-4 w-4" />
              {contactPage.hero.badge}
            </div>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-3xl font-black leading-tight text-primary-foreground sm:text-4xl md:text-6xl">
              {contactPage.hero.title}
            </h1>
            <div className="mx-auto mt-4 max-w-2xl space-y-4 text-base leading-relaxed text-primary-foreground/80 sm:text-lg md:text-xl">
              {contactPage.hero.description.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                <a href="#contact-form">{contactPage.form.emergencyTab}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`tel:${siteSettings.phone}`}>Call the Survey Team</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="contact-form" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="flex border-b border-border">
                  <button
                    onClick={() => setActiveTab("emergency")}
                    className={cn(
                      "flex-1 px-4 py-5 text-sm font-bold uppercase tracking-wider transition-colors",
                      activeTab === "emergency"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {contactPage.form.emergencyTab}
                  </button>
                  <button
                    onClick={() => setActiveTab("quote")}
                    className={cn(
                      "flex-1 px-4 py-5 text-sm font-bold uppercase tracking-wider transition-colors",
                      activeTab === "quote"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {contactPage.form.quoteTab}
                  </button>
                </div>

                <div className="p-6 md:p-8">
                  <h2 className="font-display text-2xl font-black text-foreground md:text-3xl">
                    {activeTab === "emergency"
                      ? contactPage.form.emergencyTitle
                      : contactPage.form.quoteTitle}
                  </h2>
                  <p className="mt-3 text-base text-muted-foreground">
                    {activeTab === "emergency"
                      ? contactPage.form.emergencySubtitle
                      : contactPage.form.quoteSubtitle}
                  </p>

                  <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          Name
                        </label>
                        <Input
                          placeholder="John Smith"
                          className="h-12 rounded-xl border-2"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          placeholder="07123 456789"
                          className="h-12 rounded-xl border-2"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          {getFormServiceLabel()}
                        </label>
                        <Select
                          value={formData.issue}
                          onValueChange={(value) => setFormData({ ...formData, issue: value })}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-2">
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
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                          Postcode
                        </label>
                        <Input
                          placeholder="SE15 2NG"
                          className="h-12 rounded-xl border-2"
                          value={formData.postcode}
                          onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        {contactPage.form.previousAdviceLabel}
                      </label>
                      <Textarea
                        placeholder={contactPage.form.previousAdvicePlaceholder}
                        className="min-h-[120px] rounded-xl border-2 resize-none"
                        value={formData.previousAdvice}
                        onChange={(e) =>
                          setFormData({ ...formData, previousAdvice: e.target.value })
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 h-14 w-full rounded-xl bg-accent text-base font-black text-accent-foreground hover:bg-accent/90"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          {activeTab === "emergency"
                            ? contactPage.form.ctaEmergency
                            : contactPage.form.ctaQuote}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-2xl font-black text-foreground">
                    {contactPage.whereWeWork.title}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {contactPage.whereWeWork.description.split("\n\n").map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-2xl font-black text-foreground">
                    {contactPage.positioning.title}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {contactPage.positioning.description.split("\n\n").map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-primary p-6 text-primary-foreground shadow-sm">
                  <p className="text-xs font-black uppercase tracking-widest text-accent">
                    Direct contact
                  </p>
                  <div className="mt-4 space-y-4">
                    <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-3 text-primary-foreground hover:text-accent">
                      <Phone className="h-5 w-5" />
                      <span className="font-semibold">{siteSettings.phoneFormatted}</span>
                    </a>
                    <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-3 text-primary-foreground hover:text-accent">
                      <Mail className="h-5 w-5" />
                      <span className="font-semibold">{siteSettings.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-display text-2xl font-black text-foreground">
                  {contactPage.preEnquiry.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {contactPage.preEnquiry.description}
                </p>
                <ul className="mt-5 space-y-3">
                  {contactPage.preEnquiry.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {contactPage.preEnquiry.closing}
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-display text-2xl font-black text-foreground">
                  {contactPage.trust.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {contactPage.trust.description}
                </p>
                <div className="mt-6 grid gap-4">
                  {[
                    "They explained the damp problem properly, ruled out the wrong treatment and gave us a report we could actually use.",
                    "Finally someone who looked at ventilation, moisture patterns and defects together instead of jumping straight to damp proofing.",
                    "We needed an independent second opinion before spending money on remedial works, and the report gave us exactly that clarity.",
                  ].map((quote) => (
                    <div key={quote} className="rounded-2xl border border-border bg-muted p-4">
                      <p className="text-sm italic leading-relaxed text-foreground">“{quote}”</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl font-black text-primary-foreground md:text-4xl">
              {contactPage.finalCta.title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              {contactPage.finalCta.description.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl bg-accent font-bold text-accent-foreground hover:bg-accent/90">
                <a href="#contact-form">{contactPage.finalCta.primaryText}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/25 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`tel:${siteSettings.phone}`}>{contactPage.finalCta.secondaryText}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
