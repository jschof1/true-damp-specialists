import { Phone, Mail, MapPin, Clock, Linkedin, Instagram } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { areas } from "@/data/areas";
import TrustBar from "@/components/TrustBar";

import { getFooterContent, getSiteContent } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";

const SOCIAL_FALLBACK = [
  {
    name: "Google",
    href: siteSettings.googlePageUrl,
    icon: FaGoogle,
    color: "text-accent",
  },
] as const;

const Footer = () => {
  const footer = getFooterContent() as ReturnType<typeof getFooterContent> & {
    tagline?: string;
    specialistLine?: string;
    servingLine?: string;
    connectHeading?: string;
    socialLinks?: { label: string; href: string }[];
  };
  const site = getSiteContent();
  const services = footer.services || [];

  // Pick some popular areas for the footer
  const popularAreaNames = footer.popularAreas || [];
  const popularAreas = areas.filter(a => 
    popularAreaNames.includes(a.name)
  );

  return (
    <>
      <TrustBar />
      <footer className="bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative Accent Top Border */}
        <div className="h-1.5 bg-accent w-full" aria-hidden="true" />
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
        
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              aria-label={`${site.name} home`}
              className="flex min-w-0 items-center gap-3 sm:gap-4 mb-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
            >
              <img
                src={siteSettings.logoPath}
                alt=""
                className="h-16 w-auto shrink-0 object-contain sm:h-[4.5rem] md:h-24"
                width={120}
                height={200}
                decoding="async"
              />
              <span className="flex min-w-0 flex-col leading-[1.08]">
                <span className="font-display text-xl font-bold tracking-tight text-primary-foreground sm:text-2xl md:text-3xl">
                  {siteSettings.logoWordmarkLine1}
                </span>
                <span className="font-display text-base font-semibold tracking-wide text-accent sm:text-lg md:text-xl">
                  {siteSettings.logoWordmarkLine2}
                </span>
              </span>
            </Link>
            {footer.tagline ? (
              <p className="text-accent font-display font-bold text-sm mb-2">{footer.tagline}</p>
            ) : null}
            {footer.specialistLine ? (
              <p className="text-primary-foreground/90 text-sm font-medium mb-3">{footer.specialistLine}</p>
            ) : null}
            <p className="text-primary-foreground/70 mb-4 text-sm">{footer.description}</p>
            {footer.servingLine ? (
              <p className="text-primary-foreground/60 text-xs mb-6">{footer.servingLine}</p>
            ) : null}
            <div className="space-y-3">
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 text-primary-foreground hover:text-accent transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
              >
                <div
                  className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center group-hover:bg-accent/90 transition-colors"
                >
                  <Phone className="w-4 h-4" strokeWidth={2.5} />
                </div>
                {(site as { phoneDisplay?: string }).phoneDisplay ?? "Call Now"}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-primary-foreground hover:text-accent transition-colors text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
              >
                <div
                  className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center group-hover:bg-accent/90 transition-colors"
                >
                  <Mail className="w-4 h-4" strokeWidth={2.5} />
                </div>
                {site.email}
              </a>
              {(site as { webDisplay?: string }).webDisplay ? (
                <a
                  href={siteSettings.baseUrl}
                  className="flex items-center gap-3 text-primary-foreground/90 hover:text-accent transition-colors text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center group-hover:bg-accent/90 transition-colors text-xs font-bold">
                    www
                  </div>
                  {(site as { webDisplay?: string }).webDisplay}
                </a>
              ) : null}
            </div>

            {/* Social & Trust Links */}
            <div className="mt-6">
              <p className="text-xs text-primary-foreground/50 mb-3">
                {footer.connectHeading ?? "Public profiles"}
              </p>
              <div className="flex flex-wrap gap-3">
                {footer.socialLinks?.map((link) => {
                  const Icon = link.label.toLowerCase().includes("linkedin")
                    ? Linkedin
                    : link.label.toLowerCase().includes("instagram")
                      ? Instagram
                      : FaGoogle;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary border border-accent/30"
                      aria-label={link.label}
                    >
                      <Icon className="w-5 h-5 text-accent" />
                    </a>
                  );
                })}
                {!footer.socialLinks?.length
                  ? SOCIAL_FALLBACK.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary border border-accent/30"
                        aria-label={link.name}
                      >
                        <link.icon className={`w-6 h-6 ${link.color}`} />
                      </a>
                    ))
                  : null}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-display font-bold text-lg mb-4 text-accent">{footer.quickLinks}</p>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">
                  Contact Us
                </Link>
              </li>
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="/services"
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <p className="font-display font-bold text-lg mb-4 text-accent">{footer.areasCovered}</p>
            <ul className="space-y-2">
              {popularAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={`/locations/${area.slug}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
                  >
                    Damp surveys in {area.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/locations"
              className="text-accent text-sm mt-4 inline-block hover:underline font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
            >
              View all areas →
            </Link>
          </div>

          {/* Contact & Hours */}
          <div>
            <p className="font-display font-bold text-lg mb-4 text-accent">{footer.openingHours}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <p className="text-primary-foreground font-bold underline decoration-accent decoration-2 underline-offset-4 mb-1">{footer.emergencyService}</p>
                  <p className="text-primary-foreground/70">{footer.emergencyDescription}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <p className="text-primary-foreground">{site.address.split(',')[0]}</p>
                  <p className="text-primary-foreground/70">{site.address.split(',').slice(1).join(',').trim()}</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-xs text-primary-foreground/50 mb-2">Coverage</p>
              <p className="text-sm text-primary-foreground/70 max-w-xs">
                {footer.servingLine ??
                  "Independent surveys and remedial support across London, the Home Counties, the Midlands and specialist projects nationwide."}
              </p>
            </div>
          </div>
        </div>
      </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
              <p>{footer.rights}</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;