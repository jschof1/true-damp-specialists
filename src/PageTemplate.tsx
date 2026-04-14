import React from "react";
import { siteSettings } from "@/data/siteSettings";

interface PageMetaData {
  url: string;
  bundleEntryPoint: string;
  title: string;
  description: string;
  ogImage?: string;
}

const buildAbsoluteUrl = (path: string): string => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return new URL(path, siteSettings.baseUrl).toString();
};

const PageTemplate: React.FC<PageMetaData> = ({
  title,
  description,
  url,
  ogImage,
}) => {
  const canonicalUrl = buildAbsoluteUrl(url.replace(".html", ""));
  const ogImageUrl = ogImage
    ? buildAbsoluteUrl(ogImage)
    : buildAbsoluteUrl(siteSettings.primaryImagePath);

  const { addressDetails, geo, sameAs, areaServed } = siteSettings;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteSettings.baseUrl}/#organization`,
    name: siteSettings.businessName,
    legalName: siteSettings.legalName,
    url: siteSettings.baseUrl,
    image: ogImageUrl,
    logo: buildAbsoluteUrl(siteSettings.logoPath),
    telephone: siteSettings.phoneFormatted,
    email: siteSettings.email,
    priceRange: siteSettings.priceRange,
    address: addressDetails
      ? {
          "@type": "PostalAddress",
          streetAddress: addressDetails.streetAddress,
          addressLocality: addressDetails.addressLocality,
          addressRegion: addressDetails.addressRegion,
          postalCode: addressDetails.postalCode,
          addressCountry: addressDetails.addressCountry,
        }
      : undefined,
    ...(geo && { geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } }),
    areaServed: {
      "@type": "Place",
      name: areaServed,
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
    ...(Array.isArray(sameAs) && sameAs.length > 0 ? { sameAs } : {}),
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteSettings.baseUrl}/#website`,
    name: siteSettings.businessName,
    url: siteSettings.baseUrl,
    inLanguage: "en-GB",
    publisher: {
      "@id": `${siteSettings.baseUrl}/#organization`,
    },
  };

  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en-GB" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={siteSettings.businessName} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={ogImageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />

        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webSiteSchema)}
        </script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  );
};

export default PageTemplate;
