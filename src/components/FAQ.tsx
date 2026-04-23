import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteSettings } from "@/data/siteSettings";
import { getHomeFaqContent, getSectionCtaLabel } from "@/data/content";
import { HelpCircle } from "lucide-react";

interface FAQProps {
  areaName?: string;
}

const FAQ = ({ areaName }: FAQProps) => {
  const homeFaq = getHomeFaqContent() as {
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
  const faqs = homeFaq.items;

  return (
    <section id="faq" className="py-10 md:py-16 lg:py-24 bg-white text-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-accent-gradient text-accent-foreground font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 px-3 py-1 rounded-full shadow-sm">
            <HelpCircle className="size-3.5 shrink-0" aria-hidden="true" />
            FAQ
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 mb-4">
            {homeFaq.title}
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            {homeFaq.description}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-50 border-2 border-slate-200 rounded-xl px-4 md:px-6 data-[state=open]:shadow-xl data-[state=open]:border-accent transition-all hover:border-accent/50 relative overflow-hidden group shadow-sm"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent opacity-0 data-[state=open]:opacity-100 transition-opacity" />
                <AccordionTrigger className="text-left font-bold text-slate-900 hover:text-accent-text-on-light hover:no-underline py-4 md:py-5 group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <span className="flex-1 text-base md:text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4 md:pb-5 border-t-2 border-slate-200 mt-2 pt-3 md:pt-4 font-medium leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still Have Questions */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-accent-gradient hover:opacity-90 text-accent-foreground font-bold px-6 h-12 rounded-xl shadow-xl shadow-accent/20">
              <Link to="/get-quote">{getSectionCtaLabel()}</Link>
            </Button>
            <a
              href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
              className="text-slate-900 font-bold hover:text-accent-text-on-light transition-colors inline-flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              Call Now <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;