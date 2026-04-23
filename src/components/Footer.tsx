import { Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import TrustBar from "@/components/TrustBar";
import { areas } from "@/data/areas";
import { getFooterContent, getSiteContent } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";

const Footer = () => {
  const footer = getFooterContent() as ReturnType<typeof getFooterContent> & {
    tagline?: string;
    specialistLine?: string;
    servingLine?: string;
    description?: string;
    areasCovered?: string;
    openingHours?: string;
    emergencyService?: string;
    emergencyDescription?: string;
    projectSupport?: string;
    projectSupportDescription?: string;
    coverageDescription?: string;
    coverageNote?: string;
    popularAreas?: string[];
    rights?: string;
  };
  const site = getSiteContent() as { webDisplay?: string };
  const popularAreaNames = footer.popularAreas ?? [];
  const popularAreas = areas.filter((area) => popularAreaNames.includes(area.name));

  return (
    <>
      <TrustBar />
      <footer className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="h-1.5 w-full bg-accent" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <div>
              <Link
                to="/"
                aria-label={`${site.name} home`}
                className="mb-6 flex items-center gap-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                <img
                  src={siteSettings.logoPath}
                  alt=""
                  className="h-20 w-auto shrink-0 object-contain"
                  width={120}
                  height={200}
                  decoding="async"
                />
                <span className="flex flex-col leading-[1.08]">
                  <span className="font-display text-2xl font-bold tracking-tight text-primary-foreground">
                    {siteSettings.logoWordmarkLine1}
                  </span>
                  <span className="font-display text-lg font-semibold tracking-wide text-accent">
                    {siteSettings.logoWordmarkLine2}
                  </span>
                </span>
              </Link>
              {footer.tagline ? (
                <p className="font-display text-sm font-bold text-accent">{footer.tagline}</p>
              ) : null}
              {footer.specialistLine ? (
                <p className="mt-2 text-sm font-medium text-primary-foreground/90">
                  {footer.specialistLine}
                </p>
              ) : null}
              {footer.description ? (
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                  {footer.description}
                </p>
              ) : null}
              {footer.servingLine ? (
                <p className="mt-3 text-xs text-primary-foreground/60">{footer.servingLine}</p>
              ) : null}
            </div>

            <div>
              <p className="mb-4 font-display text-lg font-bold text-accent">{footer.quickLinks}</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-primary-foreground/70 hover:text-accent">About us</Link></li>
                <li><Link to="/services" className="text-primary-foreground/70 hover:text-accent">Services</Link></li>
                <li><Link to="/portfolio" className="text-primary-foreground/70 hover:text-accent">Case studies</Link></li>
                <li><Link to="/reviews" className="text-primary-foreground/70 hover:text-accent">Reviews</Link></li>
                <li><Link to="/faq" className="text-primary-foreground/70 hover:text-accent">FAQs</Link></li>
                <li><Link to="/contact" className="text-primary-foreground/70 hover:text-accent">Contact</Link></li>
              </ul>
            </div>

            <div>
              <p className="mb-4 font-display text-lg font-bold text-accent">{footer.areasCovered}</p>
              <ul className="space-y-2 text-sm">
                {popularAreas.map((area) => (
                  <li key={area.slug}>
                    <Link to={`/locations/${area.slug}`} className="text-primary-foreground/70 hover:text-accent">
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {footer.coverageNote ? (
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
                  {footer.coverageNote}
                </p>
              ) : null}
            </div>

            <div>
              <p className="mb-4 font-display text-lg font-bold text-accent">{footer.openingHours}</p>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-bold text-primary-foreground">{footer.emergencyService}</p>
                    <p className="text-primary-foreground/70">{footer.emergencyDescription}</p>
                  </div>
                </div>
                {footer.projectSupport ? (
                  <div>
                    <p className="font-bold text-primary-foreground">{footer.projectSupport}</p>
                    <p className="text-primary-foreground/70">{footer.projectSupportDescription}</p>
                  </div>
                ) : null}
                {footer.coverageDescription ? (
                  <div>
                    <p className="font-bold text-primary-foreground">Coverage</p>
                    <p className="text-primary-foreground/70">{footer.coverageDescription}</p>
                  </div>
                ) : null}
                <div className="space-y-3 pt-2">
                  <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-3 text-primary-foreground hover:text-accent">
                    <Phone className="h-4 w-4" />
                    <span>{siteSettings.phoneFormatted}</span>
                  </a>
                  <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-3 text-primary-foreground hover:text-accent">
                    <Mail className="h-4 w-4" />
                    <span>{siteSettings.email}</span>
                  </a>
                  {site.webDisplay ? (
                    <a href={siteSettings.baseUrl} className="text-primary-foreground hover:text-accent" target="_blank" rel="noopener noreferrer">
                      {site.webDisplay}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-6 text-sm text-primary-foreground/50">
            {footer.rights}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;