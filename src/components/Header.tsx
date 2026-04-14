import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getHeaderContent } from "@/data/content";
import { siteSettings } from "@/data/siteSettings";
import { cn } from "@/lib/utils";

const Header = () => {
  const header = getHeaderContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass =
    "text-white/80 hover:text-accent transition-colors font-medium text-nowrap relative group py-2";
  const navLinkUnderline =
    "absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-200 ease-out";

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex min-h-[4.5rem] items-center justify-between py-2 md:min-h-[6rem] md:py-2.5">
          <Link
            to="/"
            aria-label={`${siteSettings.businessName} home`}
            className="flex min-w-0 items-center gap-3 sm:gap-4 group"
          >
            <img
              src={siteSettings.logoPath}
              alt=""
              className="h-14 w-auto shrink-0 object-contain sm:h-16 md:h-[5.25rem]"
              width={120}
              height={200}
              decoding="async"
            />
            <span className="flex min-w-0 flex-col leading-[1.08]">
              <span className="font-display text-lg font-bold tracking-tight text-primary-foreground sm:text-xl md:text-2xl">
                {siteSettings.logoWordmarkLine1}
              </span>
              <span className="font-display text-sm font-semibold tracking-wide text-accent sm:text-base md:text-xl">
                {siteSettings.logoWordmarkLine2}
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-display">
            <a href="/#about" className={navLinkClass}>
              About
              <span className={cn(navLinkUnderline, "w-0 group-hover:w-full")} />
            </a>

            <Link to="/services" className={navLinkClass}>
              {header.services}
              <span className={cn(navLinkUnderline, "w-0 group-hover:w-full")} />
            </Link>

            <Link to="/locations" className={navLinkClass}>
              {header.areas}
              <span className={cn(navLinkUnderline, "w-0 group-hover:w-full")} />
            </Link>

            <Link to="/reviews" className={navLinkClass}>
              {header.reviews}
              <span className={cn(navLinkUnderline, "w-0 group-hover:w-full")} />
            </Link>

            <Link to="/contact" className={navLinkClass}>
              {header.contact}
              <span className={cn(navLinkUnderline, "w-0 group-hover:w-full")} />
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteSettings.phone}`}
              className="hidden sm:flex items-center text-accent font-display font-bold hover:text-accent/80 transition-colors group"
              aria-label="Call now"
            >
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all border-2 border-white/10 group-hover:border-accent">
                <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </div>
            </a>
            <Button
              asChild
              className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-md shadow-accent/20 border-2 border-accent hover:translate-y-0.5 transition-all"
            >
              <Link to="/get-quote">{header.getQuote}</Link>
            </Button>

            <button
              className="md:hidden p-2 -m-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            className="md:hidden py-4 border-t border-white/10 font-display animate-in fade-in-0 slide-in-from-top-2 duration-200"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              <a
                href="/#about"
                className="text-white/90 font-medium py-3 px-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>

              <Link
                to="/services"
                className="text-white/90 font-medium py-3 px-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {header.services}
              </Link>

              <Link
                to="/locations"
                className="text-white/90 font-medium py-3 px-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {header.areas}
              </Link>

              <Link
                to="/reviews"
                className="text-white/90 font-medium py-3 px-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {header.reviews}
              </Link>

              <Link
                to="/contact"
                className="text-white/90 font-medium py-3 px-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {header.contact}
              </Link>

              <Link
                to="/get-quote"
                className="mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                  {header.getQuote}
                </Button>
              </Link>

              <Button asChild className="w-full mt-2 bg-white/10 hover:bg-white/20 text-white font-display font-bold gap-2">
                <a
                  href={`tel:${siteSettings.phone}`}
                  aria-label="Call now"
                  className="flex items-center justify-center"
                >
                  <Phone className="w-5 h-5" />
                  Call now
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
      <div className="h-1 bg-accent w-full" />
    </header>
  );
};

export default Header;
