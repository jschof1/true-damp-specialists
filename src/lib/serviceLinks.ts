import { services } from "@/data/services";
import { getQuoteServiceOptions } from "@/data/content";

const servicePageSlugs = new Set(services.map((service) => service.slug));
const quoteOnlySlugs = new Set(
  getQuoteServiceOptions()
    .map((option) => option.id)
    .filter((id) => id && !servicePageSlugs.has(id) && id !== "other")
);

export const getServiceDestination = (slug?: string | null) => {
  if (!slug) {
    return "/services";
  }

  if (servicePageSlugs.has(slug)) {
    return `/services/${slug}`;
  }

  if (quoteOnlySlugs.has(slug)) {
    return `/get-quote?service=${slug}`;
  }

  return "/services";
};
