import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServicesContent, getSectionCtaLabel } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";
import { getServiceDestination } from "@/lib/serviceLinks";
import { Layers } from "lucide-react";

interface ServicesGridProps { areaName?: string; }
type ServiceCard = { title: string; description: string; slug: string; group?: string };

const serviceImages: Record<string, string> = {
  "independent-damp-mould-surveys": "/images/services/independent-survey-masonry.webp",
  "moisture-diagnostics-building-pathology": "/images/services/thermal-moisture-diagnostics.webp",
  "mould-remediation-condensation-control": "/images/services/mould-condensation-control.webp",
  "basement-below-ground-waterproofing": "/images/services/waterproofing-building-fabric.webp",
  "external-defects-drainage-weathering": "/images/services/external-defects-roof-junction.webp",
  "remedial-specifications-project-support": "/images/services/remedial-specifications-fabric.webp",
  "commercial-damp-surveys": "/images/services/remedial-specifications-fabric.webp",
  "ferro-reinforcement-scanning": "/images/services/thermal-moisture-diagnostics.webp",
};

const ServicesGrid = ({ areaName }: ServicesGridProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressRegion;
  const servicesContent = getServicesContent(displayArea) as ReturnType<typeof getServicesContent> & { items: ServiceCard[] };
  const groups = servicesContent.groups ?? [];

  return <section id="services" className="bg-white py-10 text-slate-900 md:py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-10 text-center md:mb-16">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-accent-gradient px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground shadow-sm sm:text-sm"><Layers className="size-3.5 shrink-0" aria-hidden />{servicesContent.subtitle}</span>
        <h2 className="mb-4 font-display text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">{servicesContent.title}</h2>
        <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-lg">{servicesContent.description}</p>
      </div>
      <div className="space-y-12">
        {groups.map((group) => {
          const cards = servicesContent.items.filter((item) => item.group === group.title);
          return <div key={group.title}>
            <h3 className="mb-5 border-b border-slate-200 pb-3 font-display text-xl font-black uppercase tracking-wide text-slate-900 md:text-2xl">{group.title}</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cards.map((service) => <Card key={`${group.title}-${service.title}`} className="group flex h-full flex-col overflow-hidden border-2 border-slate-200 bg-white shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20">
                <div className="relative h-40 shrink-0 overflow-hidden"><img src={serviceImages[service.slug] ?? serviceImages["independent-damp-mould-surveys"]} alt={service.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={600} height={400} decoding="async" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" aria-hidden /></div>
                <CardContent className="flex flex-1 flex-col border-t-4 border-accent bg-white p-5"><h4 className="mb-3 font-display text-lg font-bold leading-tight text-slate-900">{service.title}</h4><p className="mb-5 flex-1 text-sm font-medium leading-relaxed text-slate-600">{service.description}</p><Button asChild size="sm" className="bg-accent-gradient font-bold text-accent-foreground hover:opacity-90"><Link to={getServiceDestination(service.slug)}>Learn More</Link></Button></CardContent>
              </Card>)}
            </div>
          </div>;
        })}
      </div>
      <div className="mt-12 text-center"><p className="mb-4 font-medium text-slate-600">{servicesContent.footerText}</p><Button asChild size="lg" className="h-12 rounded-xl bg-accent-gradient px-6 font-bold text-accent-foreground shadow-xl shadow-accent/20 hover:opacity-90"><Link to="/contact">{getSectionCtaLabel()}</Link></Button></div>
    </div>
  </section>;
};
export default ServicesGrid;
