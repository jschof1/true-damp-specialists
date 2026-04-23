import { Helmet } from "react-helmet-async";
import { siteSettings } from "@/data/siteSettings";
const defaultOgImage = siteSettings.primaryImagePath;

type BreadcrumbItem = {
  name: string;
  path?: string;
};

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  breadcrumbs?: BreadcrumbItem[];
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const buildAbsoluteUrl = (value: string) => {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return new URL(value, siteSettings.baseUrl).toString();
};

const parseRatingValue = (value: string) => {
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : undefined;
};

const parseReviewCount = (value: string) => {
  const parsed = Number.parseInt(value.replace(/\D/g, ""), 10);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const buildLocalBusinessSchema = (imageUrl: string) => {
  const ratingValue = siteSettings.googleRating
    ? parseRatingValue(siteSettings.googleRating)
    : undefined;
  const reviewCount = siteSettings.reviewCount
    ? parseReviewCount(siteSettings.reviewCount)
    : undefined;
  const hasAddressDetails =
    typeof siteSettings.addressDetails === "object" && siteSettings.addressDetails !== null;
  const hasGeo =
    typeof siteSettings.geo?.latitude !== "undefined" &&
    typeof siteSettings.geo?.longitude !== "undefined";

  const aggregateRating =
    ratingValue && reviewCount
      ? {
          "@type": "AggregateRating",
          ratingValue,
          reviewCount,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteSettings.baseUrl}/#organization`,
    name: siteSettings.businessName,
    legalName: siteSettings.legalName,
    url: siteSettings.baseUrl,
    image: imageUrl,
    logo: buildAbsoluteUrl(siteSettings.logoPath),
    telephone: siteSettings.phoneFormatted,
    email: siteSettings.email,
    ...(siteSettings.priceRange ? { priceRange: siteSettings.priceRange } : {}),
    ...(hasAddressDetails
      ? {
          address: {
            "@type": "PostalAddress",
            ...siteSettings.addressDetails,
          },
        }
      : {}),
    ...(hasGeo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: siteSettings.geo!.latitude,
            longitude: siteSettings.geo!.longitude,
          },
        }
      : {}),
    areaServed: {
      "@type": "Place",
      name: siteSettings.areaServed,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    ...(Array.isArray(siteSettings.sameAs) && siteSettings.sameAs.length
      ? { sameAs: siteSettings.sameAs }
      : {}),
    ...(aggregateRating ? { aggregateRating } : {}),
  };
};

const buildWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteSettings.baseUrl}/#website`,
  name: siteSettings.businessName,
  url: siteSettings.baseUrl,
  inLanguage: "en-GB",
  publisher: {
    "@id": `${siteSettings.baseUrl}/#organization`,
  },
});

const buildWebPageSchema = (title: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  name: title,
  description,
  url,
  inLanguage: "en-GB",
  isPartOf: {
    "@id": `${siteSettings.baseUrl}/#website`,
  },
  about: {
    "@id": `${siteSettings.baseUrl}/#organization`,
  },
});

const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.path ? buildAbsoluteUrl(item.path) : undefined,
  })),
});

const SEO = ({
  title,
  description,
  path,
  image,
  noindex = false,
  ogType = "website",
  breadcrumbs,
  schema,
}: SeoProps) => {
  const canonicalUrl = buildAbsoluteUrl(path);
  const ogImage = buildAbsoluteUrl(image || defaultOgImage);

  const baseSchemas = [
    buildLocalBusinessSchema(ogImage),
    buildWebSiteSchema(),
    buildWebPageSchema(title, description, canonicalUrl),
    breadcrumbs ? buildBreadcrumbSchema(breadcrumbs) : undefined,
  ].filter(Boolean) as Record<string, unknown>[];

  const extraSchemas = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  const schemas = [...baseSchemas, ...extraSchemas];

  const robotsValue = noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsValue} />
      <meta name="googlebot" content={robotsValue} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-GB" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteSettings.businessName} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
