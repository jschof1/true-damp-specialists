import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getServicesContent, getSectionCtaLabel } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";
import { Layers, CheckCircle2 } from "lucide-react";

interface ServicesGridProps {
  areaName?: string;
}

const ServicesGrid = ({ areaName }: ServicesGridProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressRegion;
  const servicesContent = getServicesContent(displayArea) as ReturnType<typeof getServicesContent> & {
    groups?: { title: string; items: string[] }[];
    projectSupportNote?: string;
  };
  const groups = servicesContent.groups ?? [];

  return (
    <section id="services" className="py-10 md:py-16 lg:py-24 bg-white text-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-accent-gradient text-accent-foreground font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 px-3 py-1 rounded-full shadow-sm">
            <Layers className="size-3.5 shrink-0" aria-hidden />
            {servicesContent.subtitle}
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 mb-4">
            {servicesContent.title}
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            {servicesContent.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {groups.map((group) => (
            <Card
              key={group.title}
              className="border-2 border-slate-200 bg-white shadow-sm h-full"
            >
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {servicesContent.projectSupportNote ? (
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
            <p className="text-sm md:text-base leading-relaxed text-slate-700">
              {servicesContent.projectSupportNote}
            </p>
          </div>
        ) : null}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4 font-medium">
            {servicesContent.footerText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-accent-gradient hover:opacity-90 text-accent-foreground font-bold px-6 h-12 rounded-xl shadow-xl shadow-accent/20">
              <Link to="/get-quote">{getSectionCtaLabel()}</Link>
            </Button>
            <a
              href={`tel:${siteSettings.phoneFormatted}`}
              className="text-slate-900 font-bold hover:text-accent-text-on-light transition-colors inline-flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            >
              {servicesContent.footerCTA}{" "}
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;