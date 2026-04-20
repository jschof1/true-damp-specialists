/**
 * Content loader - reads from content.json and provides interpolated content.
 * Use this instead of importing content.json directly in components.
 * Matches the pattern used in template-heavy-duty-industrial and template-robust-electrical-efficient.
 */
import contentJson from "../../data/content.json";
import { siteSettings } from "./siteSettings";

export type Content = typeof contentJson;

export const content: Content = contentJson as Content;

export function interpolate(
  template: string,
  vars: Record<string, string | number>
): string {
  return Object.entries(vars).reduce(
    (acc, [key, val]) =>
      acc.replace(new RegExp(`\\{${key}\\}`, "g"), String(val)),
    template
  );
}

const DEFAULT_AREA = siteSettings.addressDetails.addressLocality;

export function getSiteContent() {
  return content.site;
}

export function getSectionCtaLabel(): string {
  return (content as { sectionCta?: string }).sectionCta ?? "Request specialist advice";
}

export function getHeroContent(areaName?: string) {
  const area = areaName || DEFAULT_AREA;
  return {
    ...content.hero,
    title: interpolate(content.hero.title, { areaName: area }),
    description: interpolate(content.hero.description, { areaName: area }),
  };
}

export function getWhyChooseUsContent(areaName?: string) {
  const area = areaName || DEFAULT_AREA;
  const w = content.whyChooseUs as typeof content.whyChooseUs & {
    contentBlocks?: (
      | { kind: "paragraphs"; title?: string; items: string[] }
      | { kind: "bullets"; title?: string; items: string[] }
      | {
          kind: "features";
          items: { icon: string; title: string; description: string }[];
        }
    )[];
  };
  return {
    ...w,
    title: interpolate(w.title, { areaName: area }),
    description: interpolate(w.description, { areaName: area }),
    reasons: w.reasons.map((r) => ({
      ...r,
      description: interpolate(r.description, { areaName: area }),
    })),
    contentBlocks: w.contentBlocks?.map((block) => {
      if (block.kind === "features") {
        return {
          ...block,
          items: block.items.map((feat) => ({
            ...feat,
            description: interpolate(feat.description, { areaName: area }),
          })),
        };
      }
      return {
        ...block,
        items: (block.items as string[]).map((line) =>
          interpolate(line, { areaName: area })
        ),
      };
    }),
  };
}

export function getServicesContent(areaName?: string) {
  const area = areaName || DEFAULT_AREA;
  return {
    ...content.services,
    title: interpolate(content.services.title, { areaName: area }),
    description: interpolate(content.services.description, { areaName: area }),
    items: content.services.items.map((item) => ({
      ...item,
      description: interpolate(item.description, { areaName: area }),
    })),
  };
}

export function getTestimonialsContent(areaName?: string) {
  const area = areaName || DEFAULT_AREA;
  return {
    ...content.testimonials,
    title: interpolate(content.testimonials.title, { areaName: area }),
    description: interpolate(content.testimonials.description, {
      areaName: area,
    }),
  };
}

export function getFinalCtaContent(areaName?: string) {
  const area = areaName || DEFAULT_AREA;
  return {
    ...content.finalCTA,
    title: interpolate(content.finalCTA.title, { areaName: area }),
    description: content.finalCTA.description,
    emergencyBadge: interpolate(content.finalCTA.emergencyBadge, {
      areaName: area,
    }),
  };
}

export function getPortfolioPageContent() {
  return (content as unknown as { portfolioPage: Record<string, unknown> }).portfolioPage;
}

export function getAboutPageContent() {
  return (content as unknown as { aboutPage: Record<string, unknown> }).aboutPage;
}

export function getHeaderContent() {
  return content.header;
}

export function getTopBannerContent(areaName?: string) {
  const area = areaName || DEFAULT_AREA;
  return {
    ...content.topBanner,
    emergency: interpolate(content.topBanner.emergency, { areaName: area }),
  };
}

export function getFooterContent() {
  return content.footer;
}

export function getServicesPageContent() {
  return content.servicesPage;
}

export function getFaqPageContent() {
  return content.faqPage;
}

export function getContactPageContent() {
  return content.contactPage;
}

export function getFormServiceOptions() {
  return (content as { formServiceOptions?: { value: string; label: string }[] }).formServiceOptions ?? [];
}

export function getFormServicePlaceholder() {
  return (content as { formServicePlaceholder?: string }).formServicePlaceholder ?? "What issue do you need help with?";
}

export function getFormServiceLabel() {
  return (content as { formServiceLabel?: string }).formServiceLabel ?? "What do you need help with?";
}

type QuoteServiceOption = { id: string; label: string; description: string; icon?: string };
type QuoteUrgencyOption = { id: string; label: string; description: string; color: string };

export function getQuoteServiceOptions(): QuoteServiceOption[] {
  return (content as { quoteServiceOptions?: QuoteServiceOption[] }).quoteServiceOptions ?? [];
}

export function getQuoteUrgencyOptions(): QuoteUrgencyOption[] {
  return (content as { quoteUrgencyOptions?: QuoteUrgencyOption[] }).quoteUrgencyOptions ?? [];
}

export function getQuoteFormLabels() {
  const labels = (content as { quoteFormLabels?: Record<string, string> }).quoteFormLabels;
  return {
    step1Title: labels?.step1Title ?? "What issue are you dealing with?",
    urgencyTitle: labels?.urgencyTitle ?? "How soon do you need clarity?",
    step2Title: labels?.step2Title ?? "Tell us about the property",
    descriptionLabel: labels?.descriptionLabel ?? "Describe your project (optional)",
    descriptionPlaceholder:
      labels?.descriptionPlaceholder ??
      "E.g., mould in bedrooms, failed damp treatment, basement moisture...",
  };
}

export function getAreaPageContent(
  areaName?: string,
  postcodes?: string,
  emergencyTime?: string
) {
  const area = areaName || DEFAULT_AREA;
  const postcodesStr = postcodes || "";
  const time = emergencyTime || "60 minutes";
  const vars = { areaName: area, postcodes: postcodesStr, emergencyTime: time };
  return {
    ...content.areaPage,
    hero: {
      ...content.areaPage.hero,
      badge: interpolate(content.areaPage.hero.badge, vars),
      expertsSubtitle: interpolate(content.areaPage.hero.expertsSubtitle, vars),
    },
    localDifference: {
      ...content.areaPage.localDifference,
      title: interpolate(content.areaPage.localDifference.title, vars),
    },
    neighborhoodGuide: {
      ...content.areaPage.neighborhoodGuide,
      description: interpolate(content.areaPage.neighborhoodGuide.description, vars),
    },
    process: {
      ...content.areaPage.process,
      description: interpolate(content.areaPage.process.description, vars),
      steps: content.areaPage.process.steps.map((s) => ({
        ...s,
        desc: interpolate(s.desc, vars),
      })),
    },
    faq: {
      ...content.areaPage.faq,
      title: interpolate(content.areaPage.faq.title, vars),
      planningDescription: interpolate(
        content.areaPage.faq.planningDescription,
        vars
      ),
    },
    finalCTA: {
      ...content.areaPage.finalCTA,
      title: interpolate(content.areaPage.finalCTA.title, vars),
      description: interpolate(content.areaPage.finalCTA.description, vars),
    },
  };
}

export function getServiceDetailPageContent(serviceName?: string) {
  const name = serviceName || "";
  const vars = { serviceName: name };
  return {
    ...content.serviceDetailPage,
    hero: {
      ...content.serviceDetailPage.hero,
      badge: interpolate(content.serviceDetailPage.hero.badge, vars),
      title: interpolate(content.serviceDetailPage.hero.title, vars),
    },
    details: {
      ...content.serviceDetailPage.details,
      title: interpolate(content.serviceDetailPage.details.title, vars),
    },
    pricing: {
      ...content.serviceDetailPage.pricing,
      title: interpolate(content.serviceDetailPage.pricing.title, vars),
    },
    process: {
      ...content.serviceDetailPage.process,
      title: interpolate(content.serviceDetailPage.process.title, vars),
      description: interpolate(content.serviceDetailPage.process.description, vars),
    },
    coverage: {
      ...content.serviceDetailPage.coverage,
      title: interpolate(content.serviceDetailPage.coverage.title, vars),
    },
  };
}

export function getReviewsPageContent() {
  return content.reviewsPage;
}

export function getServiceAreasContent() {
  return content.serviceAreas;
}

export function getProjectGalleryContent(areaName?: string) {
  const area = areaName || DEFAULT_AREA;
  const vars = { areaName: area };
  return {
    ...content.projectGallery,
    description: interpolate(content.projectGallery.description, vars),
    cta: {
      ...content.projectGallery.cta,
      description: interpolate(content.projectGallery.cta.description, vars),
    },
  };
}
