import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { siteSettings } from "@/data/siteSettings";
import { getSectionCtaLabel } from "@/data/content";
import { HelpCircle } from "lucide-react";

interface FAQProps {
  areaName?: string;
}

const FAQ = ({ areaName }: FAQProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressLocality;
  
  const faqs = [
    {
      question: "Do you charge for an initial enquiry?",
      answer:
        `We will always explain the likely scope first. Survey fees depend on the property and level of investigation needed, and any remedial work is quoted separately so you know exactly what is being recommended.`,
    },
    {
      question: `How quickly can you get to ${displayArea}?`,
      answer:
        `For urgent moisture or mould concerns in ${displayArea}, we aim to arrange the earliest practical appointment. Most standard survey bookings can be scheduled within a few working days depending on access and property size.`,
    },
    {
      question: "Are you independent?",
      answer:
        "Yes. Our surveys are diagnosis-led and focused on identifying the root cause, not selling a pre-selected treatment. That helps clients compare options and avoid unnecessary work.",
    },
    {
      question: "What does a damp survey include?",
      answer:
        "Typical surveys include a visual inspection, moisture profiling, assessment of ventilation and building defects, and a written report with clear findings and recommendations. The exact scope depends on the issue and property type.",
    },
    {
      question: "Can you specify remedial works?",
      answer:
        "Yes. We can produce a remedial specification, review contractor proposals, and help clients understand whether suggested waterproofing, ventilation, joinery or masonry works actually match the diagnosis.",
    },
    {
      question: "What areas do you cover?",
      answer:
        `We cover ${displayArea}, London, Hertfordshire, Buckinghamshire, Bedfordshire and Oxfordshire, and we can support specialist projects further afield when the brief is a good fit.`,
    },
    {
      question: "Can you help with mould and condensation issues?",
      answer:
        "Yes. We investigate whether mould is being driven by condensation, hidden leaks, thermal bridging, poor ventilation or another underlying defect, then outline the right next steps instead of treating it as a one-size-fits-all problem.",
    },
    {
      question: "Do you work with homeowners only?",
      answer:
        "No. We also support landlords, buyers, surveyors, property managers and contractors who need an independent view before committing to repairs or waterproofing work.",
    },
  ];

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
            Common Questions
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. Here are the most common things our customers ask.
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