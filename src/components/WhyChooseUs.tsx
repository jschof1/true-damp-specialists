import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ChevronRight,
  SearchCheck,
  Scale,
  FileCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { getWhyChooseUsContent, getSectionCtaLabel } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";

interface WhyChooseUsProps {
  areaName?: string;
}

type FeatureBlock = {
  kind: "features";
  items: { icon: string; title: string; description: string }[];
};
type ContentBlock = FeatureBlock;

const ICON_MAP: Record<string, LucideIcon> = {
  SearchCheck,
  Scale,
  FileCheck,
  ShieldCheck,
};

const WhyChooseUs = ({ areaName }: WhyChooseUsProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressLocality;
  const section = getWhyChooseUsContent(displayArea) as ReturnType<typeof getWhyChooseUsContent> & {
    contentBlocks?: ContentBlock[];
  };

  const blocks: ContentBlock[] = section.contentBlocks ?? [];
  const featureBlock = blocks.find((b): b is FeatureBlock => b.kind === "features");

  return (
    <section id="about" className="py-12 md:py-20 bg-slate-50 text-slate-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-text-on-light text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            {section.subtitle || "Independent investigations"}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-4 leading-tight">
            {section.title}
          </h2>
          {section.description ? (
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {section.description}
            </p>
          ) : null}
        </div>

        {featureBlock ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featureBlock.items.map((feat, i) => {
              const Icon = ICON_MAP[feat.icon] || ShieldCheck;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{feat.description}</p>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="bg-accent-gradient hover:opacity-90 text-accent-foreground font-bold px-6 sm:px-8 h-12 rounded-xl text-base shadow-xl shadow-accent/20"
          >
            <Link to="/get-quote" className="inline-flex items-center gap-2">
              {getSectionCtaLabel()}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
