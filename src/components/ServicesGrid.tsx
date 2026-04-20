import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getServicesContent, getSectionCtaLabel } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";
import { getServiceDestination } from "@/lib/serviceLinks";
import { Layers } from "lucide-react";

interface ServicesGridProps {
  areaName?: string;
}

const serviceSlugs: Record<string, string> = {
  "Damp & Mould, Thermal & Salt Analysis": "independent-damp-mould-surveys",
  "Residential Compliance – Awaab's Law": "moisture-diagnostics-building-pathology",
  "Commercial & Multi-Occupancy Surveys": "mould-remediation-condensation-control",
  "Complex Cases & Second Opinions": "basement-below-ground-waterproofing",
  "Invasive, CCTV & Drainage Investigations": "external-defects-drainage-weathering",
  "Pre-Purchase Surveys & Remediation Planning": "remedial-specifications-project-support",
};

const serviceImages = [
  "/assets/true-damp-service-survey.jpeg",
  "/assets/true-damp-service-diagnostics.jpeg",
  "/assets/true-damp-service-mould.jpeg",
  "/assets/true-damp-service-diagnostics.jpeg",
  "/assets/true-damp-service-external.jpeg",
  "/assets/true-damp-service-specifications.jpeg",
];

const ServicesGrid = ({ areaName }: ServicesGridProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressRegion;
  const servicesContent = getServicesContent(displayArea);

  const services = servicesContent.items.map((item, index) => ({
    ...item,
    image: serviceImages[index] ?? serviceImages[0],
    description: item.description,
    slug: serviceSlugs[item.title] ?? null,
  }));

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              to={getServiceDestination(service.slug)}
              className="block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
            >
              <Card
                className="group border-2 border-slate-200 overflow-hidden transition-all duration-500 cursor-pointer bg-white shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-accent/20 hover:border-accent/50 hover:-translate-y-2 h-full"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width={400}
                    height={300}
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"
                    aria-hidden
                  />
                  {/* Decorative Accent Corner */}
                  <div
                    className="absolute top-0 right-0 w-12 h-12 bg-accent/90 backdrop-blur-sm -mr-6 -mt-6 rotate-45 group-hover:bg-accent-gradient transition-colors border-b border-l border-white/20 shadow-sm"
                    aria-hidden
                  />
                </div>
                <CardContent className="p-6 border-t-4 border-accent relative bg-white">
                  <h3 className="font-display font-bold text-xl text-slate-900 leading-tight tracking-tight mb-3 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                    {service.description}
                  </p>
                  <div className="flex items-center text-accent-text-on-light text-sm font-black uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                    <span className="relative">
                      Find out more
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-text-on-light transition-all group-hover:w-full" />
                    </span>
                    <span className="ml-1 transition-transform group-hover:translate-x-2" aria-hidden>→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

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