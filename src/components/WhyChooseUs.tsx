import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  SearchCheck,
  Scale,
  Handshake,
  FileCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { getWhyChooseUsContent, getSectionCtaLabel } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";
import pcaLogo from "@/assets/icons/certifications/pca-logo.png";

interface WhyChooseUsProps {
  areaName?: string;
}

type ParagraphBlock = { kind: "paragraphs"; items: string[] };
type BulletBlock = { kind: "bullets"; title?: string; items: string[] };
type FeatureBlock = {
  kind: "features";
  items: { icon: string; title: string; description: string }[];
};
type ContentBlock = ParagraphBlock | BulletBlock | FeatureBlock;

const ICON_MAP: Record<string, LucideIcon> = {
  SearchCheck,
  Scale,
  Handshake,
  FileCheck,
  ShieldCheck,
};

const WhyChooseUs = ({ areaName }: WhyChooseUsProps) => {
  const displayArea = areaName || siteSettings.addressDetails.addressLocality;
  const section = getWhyChooseUsContent(displayArea) as ReturnType<typeof getWhyChooseUsContent> & {
    contentBlocks?: ContentBlock[];
  };

  const blocks: ContentBlock[] = section.contentBlocks ?? [];

  const introBlock = blocks.find((b): b is ParagraphBlock => b.kind === "paragraphs");
  const bulletBlock = blocks.find((b): b is BulletBlock => b.kind === "bullets");

  const part2Blocks = blocks.filter((b) => b !== introBlock && b !== bulletBlock);
  const featureBlock = part2Blocks.find((b): b is FeatureBlock => b.kind === "features");
  const leadProse = part2Blocks.find(
    (b): b is ParagraphBlock => b.kind === "paragraphs" && b !== part2Blocks[part2Blocks.length - 1]
  );
  const closingProse = part2Blocks.filter(
    (b): b is ParagraphBlock => b.kind === "paragraphs" && b !== leadProse
  );

  return (
    <>
      {/* Part 1 — Intro + Bullets (light bg) */}
      <section id="about" className="py-12 md:py-20 bg-slate-50 text-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="/assets/true-damp-hero-survey.jpeg"
                  alt="Damp surveyor using moisture meter on a residential wall"
                  className="w-full h-auto object-cover aspect-[4/3]"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-xl px-5 py-3 shadow-lg font-display font-bold text-sm flex items-center gap-2">
                <img src={pcaLogo} alt="PCA Logo" className="w-8 h-auto object-contain" />
                PCA-Trained Surveyors
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-text-on-light text-xs font-bold uppercase tracking-widest mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                {section.subtitle || "Independent investigations"}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 mb-6 leading-tight">
                {section.title}
              </h2>

              {introBlock ? (
                <div className="space-y-4 mb-8">
                  {introBlock.items.map((p, i) => (
                    <p key={i} className="text-slate-600 text-base md:text-lg leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              ) : null}

              {bulletBlock ? (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  {bulletBlock.title ? (
                    <p className="font-display font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">
                      {bulletBlock.title}
                    </p>
                  ) : null}
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {bulletBlock.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Part 2 — Our Approach (dark bg, visual layout) */}
      {part2Blocks.length > 0 ? (
        <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="/assets/true-damp-about-building.jpeg"
              alt="Building exterior detail"
              className="w-full h-full object-cover opacity-[0.07] grayscale"
              width={1920}
              height={1080}
              decoding="async"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header + lead text */}
            <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-foreground/20 text-primary-foreground/70 text-xs font-bold uppercase tracking-widest mb-5">
                Our Approach
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground mb-6 leading-tight">
                Independence, Clarity, Accuracy
              </h2>
              {leadProse
                ? leadProse.items.map((p, i) => (
                    <p key={i} className="text-primary-foreground/75 text-base md:text-lg leading-relaxed">
                      {p}
                    </p>
                  ))
                : null}
            </div>

            {/* Feature cards */}
            {featureBlock ? (
              <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto mb-12 md:mb-16">
                {featureBlock.items.map((feat, i) => {
                  const Icon = ICON_MAP[feat.icon] || ShieldCheck;
                  return (
                    <div
                      key={i}
                      className="group rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-6 md:p-8 transition-colors hover:bg-primary-foreground/[0.07]"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-primary-foreground mb-2">
                        {feat.title}
                      </h3>
                      <p className="text-primary-foreground/70 text-sm leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* Closing + CTA */}
            <div className="max-w-2xl mx-auto text-center">
              {closingProse.map((block, bi) =>
                block.items.map((p, pi) => (
                  <p
                    key={`${bi}-${pi}`}
                    className="text-primary-foreground/75 text-base md:text-lg leading-relaxed mb-4"
                  >
                    {p}
                  </p>
                ))
              )}

              <div className="mt-8">
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
          </div>
        </section>
      ) : null}
    </>
  );
};

export default WhyChooseUs;
