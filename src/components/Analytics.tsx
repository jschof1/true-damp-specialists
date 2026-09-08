import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { loadAnalytics, trackEvent } from "../lib/analytics";

export function Analytics() {
  const { pathname } = useLocation();
  const lastPath = useRef<string>();
  useEffect(() => {
    loadAnalytics();
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      trackEvent("pageview");
    }
  }, [pathname]);
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      const href = link?.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackEvent("Phone Click");
      if (href.startsWith("mailto:")) trackEvent("Email Click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
