import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { siteSettings } from "@/data/siteSettings";

const MobileCallButton = () => {
  const telHref = `tel:${siteSettings.phoneFormatted.replace(/\s/g, "")}`;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={telHref}
      className="fixed bottom-5 left-4 z-50 md:hidden flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground px-3.5 py-2.5 rounded-full shadow-lg font-semibold text-sm border-2 border-primary transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transform: hidden ? "translateY(12px)" : "translateY(0)",
      }}
      aria-label={`Call ${siteSettings.businessName}`}
    >
      <Phone className="w-4 h-4" />
      <span>Call Now</span>
    </a>
  );
};

export default MobileCallButton;
