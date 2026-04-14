import { Clock } from "lucide-react";

import { getTopBannerContent } from "@/data/content";
import GasSafeIcon from "@/components/GasSafeIcon";

interface TopBannerProps {
  areaName?: string;
}

const TopBanner = ({ areaName }: TopBannerProps) => {
  const topBanner = getTopBannerContent(areaName);
  return (
    <div className="hidden md:block bg-primary text-primary-foreground py-0.5 px-3 sm:py-1 sm:px-4 border-b-2 border-accent/20">
      <div className="container mx-auto flex items-center justify-center gap-2 sm:gap-4 text-sm font-medium">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" strokeWidth={3} />
            <span className="uppercase tracking-widest text-[10px] sm:text-[11px] font-black line-clamp-2 sm:line-clamp-none">{topBanner.emergency}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 border-l-2 border-accent/20 pl-4 shrink-0">
            <GasSafeIcon className="w-4 h-4 shrink-0" />
            <span className="font-bold">{topBanner.accreditation}</span>
          </div>
          <div className="flex items-center gap-1.5 border-l-2 border-accent/20 pl-2 sm:pl-4 shrink-0">
            <span className="bg-accent text-accent-foreground px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] uppercase tracking-widest font-black animate-pulse border border-primary/20">{topBanner.live}</span>
            <span className="hidden sm:inline font-bold">{topBanner.availability}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;

