import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, ShieldCheck, Clock, CreditCard, CheckCircle2, Search, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import { getFaqPageContent } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";
import theme from "@/config/theme";
import heroBackground from "@/assets/general/damp-survey-thermal-imaging.webp";

const CATEGORY_ICONS: Record<string, typeof HelpCircle> = {
  general: HelpCircle,
  pricing: CreditCard,
  services: ShieldCheck,
  process: Clock,
};

const FAQPage = () => {
  const faqPage = getFaqPageContent();
  const [searchQuery, setSearchQuery] = useState("");

  const categoryList = (faqPage as { categoryList?: { id: string; name: string; faqs: { question: string; answer: string }[] }[] }).categoryList ?? [];
  const faqCategories = categoryList.map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: CATEGORY_ICONS[cat.id] ?? HelpCircle,
    faqs: cat.faqs,
  }));
  
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(cat => cat.faqs).map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`Damp Survey FAQ | ${siteSettings.businessName}`}
        description="Answers on damp surveys, mould, condensation, waterproofing, report scope and remedial recommendations."
        path="/faq"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
        schema={jsonLd}
      />

      <Header />

      <main className="flex-grow">
        {/* Hero Section - matches portfolio */}
        <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-14 md:pb-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBackground}
              alt="Damp and mould survey background"
              className="w-full h-full object-cover opacity-40"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/75 to-primary" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-8 animate-fade-in shrink-0">
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden />
              {faqPage.hero.badge ?? "Frequently Asked Questions"}
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 sm:mb-8 leading-tight max-w-4xl mx-auto animate-fade-in">
              How Can We{" "}
              <span className="text-accent relative inline-block">
                Help You?
                <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/20 -z-10 -rotate-1" aria-hidden="true" />
              </span>
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-12 animate-fade-in">
              {faqPage.hero.description}
            </p>

            <div className="relative max-w-2xl w-full mx-auto animate-fade-in group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-accent transition-colors" />
              <Input
                type="text"
                placeholder={faqPage.hero.searchPlaceholder}
                className="w-full h-14 md:h-16 pl-14 pr-6 rounded-xl text-base md:text-lg font-medium bg-card border-2 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 md:py-24" style={{ backgroundColor: theme.surfaces.background }}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* Sidebar Navigation (Desktop) */}
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-28 space-y-3">
                  <p 
                    className="font-display font-black text-xl mb-6 pl-4 uppercase tracking-widest border-l-4"
                    style={{ color: theme.surfaces.foreground, borderColor: theme.colors.accent.DEFAULT }}
                  >
                    Categories
                  </p>
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        const element = document.getElementById(category.id);
                        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl transition-all duration-300 text-left group hover:[background-color:var(--hover-bg)] hover:[transform:var(--hover-transform)] hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)]"
                      style={{
                        backgroundColor: theme.surfaces.card,
                        border: `${theme.borders.width.thin} solid ${theme.surfaces.border}`,
                        borderLeft: `3px solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.4)')}`,
                        '--hover-bg': theme.colors.primary[800],
                        '--hover-transform': `translateX(${theme.metrics.hover.nudgeSm})`,
                        '--hover-border': theme.colors.accent.DEFAULT,
                        '--hover-shadow': theme.effects.shadows.lg
                      } as React.CSSProperties}
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:[background-color:var(--icon-bg)] group-hover:[box-shadow:var(--icon-shadow)] group-hover:[border-color:var(--icon-border)]"
                        style={{
                          backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.18)'),
                          border: `1px solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.35)')}`,
                          '--icon-bg': theme.colors.accent.DEFAULT.replace(')', ' / 0.25)'),
                          '--icon-shadow': theme.effects.shadows.accentGlow,
                          '--icon-border': theme.colors.accent.DEFAULT
                        } as React.CSSProperties}
                      >
                        <category.icon 
                          className="w-5 h-5 transition-colors duration-300 group-hover:[color:var(--icon-color)]" 
                          style={{ 
                            color: theme.colors.accent[700],
                            '--icon-color': theme.colors.accent.DEFAULT
                          } as React.CSSProperties} 
                        />
                      </div>
                      <span 
                        className="font-bold text-lg transition-colors duration-300 group-hover:[color:var(--text-color)]"
                        style={{ 
                          color: theme.surfaces.foreground,
                          '--text-color': theme.surfaces.primaryForeground
                        } as React.CSSProperties}
                      >
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>
              </aside>

              {/* FAQ Accordions */}
              <div className="lg:col-span-9 space-y-16">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div key={category.id} id={category.id} className="scroll-mt-36">
                      <div className="flex items-center gap-4 mb-8">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{
                            backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.28)'),
                            border: `2px solid ${theme.colors.accent.DEFAULT}`,
                            boxShadow: theme.effects.shadows.accentGlow
                          }}
                        >
                          <category.icon className="w-7 h-7" style={{ color: theme.colors.primary.DEFAULT }} strokeWidth={2.5} />
                        </div>
                        <h2 
                          className="text-3xl md:text-4xl lg:text-5xl font-display font-black pb-2"
                          style={{ color: theme.surfaces.foreground, borderBottom: `4px solid ${theme.colors.accent.DEFAULT}` }}
                        >
                          {category.name}
                        </h2>
                      </div>
                      
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`${category.id}-${index}`}
                            className="px-6 transition-all duration-300 hover:[border-color:var(--active-border)] data-[state=open]:[border-color:var(--active-border)] data-[state=open]:[box-shadow:var(--active-shadow)] data-[state=open]:[transform:var(--active-transform)] group overflow-hidden"
                            style={{
                              backgroundColor: theme.surfaces.card,
                              border: `${theme.borders.width.medium} solid ${theme.surfaces.border}`,
                              borderLeft: `4px solid ${theme.colors.accent.DEFAULT}`,
                              borderRadius: theme.borderRadius.xl,
                              '--active-border': theme.colors.accent.DEFAULT,
                              '--active-shadow': theme.effects.shadows.lg,
                              '--active-transform': `translateY(-${theme.metrics.hover.nudgeSm})`
                            } as React.CSSProperties}
                          >
                            <AccordionTrigger 
                              className="text-left font-bold text-lg md:text-xl py-6 hover:no-underline transition-colors group-data-[state=open]:[color:var(--active-color)] hover:[color:var(--active-color)]"
                              style={{ 
                                color: theme.surfaces.foreground,
                                '--active-color': theme.colors.accent.DEFAULT 
                              } as React.CSSProperties}
                            >
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent 
                              className="text-lg leading-relaxed pb-8 pt-4"
                              style={{ 
                                color: theme.surfaces.mutedForeground,
                                borderTop: `${theme.borders.width.thin} solid ${theme.surfaces.border}`
                              }}
                            >
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))
                ) : (
                  <div 
                    className="text-center py-24 rounded-3xl"
                    style={{
                      backgroundColor: theme.surfaces.card,
                      border: `${theme.borders.width.thin} solid ${theme.surfaces.border}`
                    }}
                  >
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ 
                        backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.2)'),
                        border: `2px solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.5)')}`
                      }}
                    >
                      <Search className="w-10 h-10" style={{ color: theme.colors.accent[700] }} />
                    </div>
                    <h3 className="text-3xl font-display font-black mb-3" style={{ color: theme.surfaces.foreground }}>No results found</h3>
                    <p className="text-lg mb-8" style={{ color: theme.surfaces.mutedForeground }}>
                      We couldn't find any questions matching "{searchQuery}".
                    </p>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setSearchQuery("")}
                      className="font-bold border-2 hover:border-accent hover:text-accent transition-colors"
                      style={{ 
                        borderColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.6)'),
                        color: theme.surfaces.foreground
                      }}
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="py-12 md:py-24" style={{ backgroundColor: theme.surfaces.background }}>
          <div className="container mx-auto px-4">
            <div 
              className="rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-12 lg:p-16 relative overflow-hidden group hover:[box-shadow:var(--hover-shadow)] transition-all duration-500 hover:[border-color:var(--hover-border)]"
              style={{
                backgroundColor: theme.colors.primary[800],
                border: `${theme.borders.width.medium} solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.5)')}`,
                '--hover-shadow': theme.effects.shadows.glowNavy,
                '--hover-border': theme.colors.accent.DEFAULT
              } as React.CSSProperties}
            >
              {/* Decorative Orbs - accent glow stronger */}
              <div 
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 transition-transform duration-700 group-hover:scale-110 pointer-events-none" 
                style={{ backgroundColor: theme.colors.accent.DEFAULT, opacity: 0.28 }}
              />
              <div 
                className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" 
                style={{ backgroundColor: theme.colors.accent.DEFAULT, opacity: 0.1 }}
              />
              
              {/* Dynamic Pattern */}
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay" 
                style={{ 
                  backgroundImage: theme.patterns.noise.dataUrl, 
                  opacity: theme.patterns.noise.opacity 
                }} 
              />

              <div className="relative z-10 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
                <div>
                  <h2 
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black mb-3 sm:mb-6 leading-tight"
                    style={{ color: theme.surfaces.primaryForeground }}
                  >
                    {faqPage.supportCTA.title}
                  </h2>
                  <p 
                    className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10"
                    style={{ color: theme.colors.secondary[300] }}
                  >
                    {faqPage.supportCTA.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      asChild 
                      size="lg" 
                      className="font-black text-base md:text-lg h-14 md:h-16 px-8 rounded-xl shadow-lg group/btn w-full sm:w-auto transition-all duration-300 hover:[transform:var(--hover-transform)] hover:[box-shadow:var(--hover-shadow)]"
                      style={{
                        backgroundColor: theme.colors.accent.DEFAULT,
                        color: theme.surfaces.accentForeground,
                        '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
                        '--hover-shadow': theme.effects.shadows.accentGlow
                      } as React.CSSProperties}
                    >
                      <a href={`tel:${siteSettings.phoneFormatted}`} className="flex items-center justify-center gap-3 uppercase tracking-wider">
                        <Phone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                        {faqPage.supportCTA.ctaPrimary}
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      size="lg" 
                      variant="outline" 
                      className="font-black text-base md:text-lg h-14 md:h-16 px-8 rounded-xl w-full sm:w-auto transition-all duration-300 hover:[transform:var(--hover-transform)] hover:[background-color:var(--hover-bg)] hover:[color:var(--hover-text)] hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)]"
                      style={{
                        backgroundColor: theme.colors.primary[900],
                        borderColor: theme.colors.primary[600],
                        borderWidth: theme.borders.width.medium,
                        color: theme.surfaces.primaryForeground,
                        '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
                        '--hover-bg': theme.colors.primary[700],
                        '--hover-text': theme.colors.accent.DEFAULT,
                        '--hover-border': theme.colors.accent.DEFAULT,
                        '--hover-shadow': theme.effects.shadows.md
                      } as React.CSSProperties}
                    >
                      <Link to="/get-quote" className="flex items-center justify-center gap-3 uppercase tracking-wider">
                        <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                        {faqPage.supportCTA.ctaSecondary}
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6">
                  {((faqPage as { supportBadges?: { label: string; desc: string }[] }).supportBadges ?? [
                    { label: "Fast Turnaround", desc: "1–3 days typical" },
                    { label: "Fully Insured", desc: "For your peace of mind" },
                    { label: "Quality Guarantee", desc: "Backed by our promise" },
                    { label: "No Sales Pitch", desc: "Advice only" },
                  ]).map((item, i) => {
                    const icons = [Clock, ShieldCheck, CheckCircle2, CheckCircle2];
                    const Icon = icons[i] ?? CheckCircle2;
                    return (
                    <div 
                      key={i} 
                      className="p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 hover:[transform:var(--hover-transform)] hover:[border-color:var(--hover-border)] hover:[box-shadow:var(--hover-shadow)]"
                      style={{
                        backgroundColor: theme.colors.primary[800].replace(')', ' / 0.6)'),
                        border: `2px solid ${theme.colors.accent.DEFAULT.replace(')', ' / 0.5)')}`,
                        '--hover-transform': `translateY(-${theme.metrics.hover.nudgeSm})`,
                        '--hover-border': theme.colors.accent.DEFAULT,
                        '--hover-shadow': theme.effects.shadows.accentGlow
                      } as React.CSSProperties}
                    >
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4"
                        style={{
                          backgroundColor: theme.colors.accent.DEFAULT.replace(')', ' / 0.25)'),
                          border: `2px solid ${theme.colors.accent.DEFAULT}`
                        }}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: theme.colors.accent.DEFAULT }} />
                      </div>
                      <p 
                        className="font-display font-black text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 leading-tight"
                        style={{ color: theme.surfaces.primaryForeground }}
                      >
                        {item.label}
                      </p>
                      <p 
                        className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider"
                        style={{ color: theme.colors.accent.DEFAULT }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  );})}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
