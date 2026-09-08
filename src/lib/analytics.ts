import { indexableRoutes } from "../routes";

const domain = "www.truedampspecialists.co.uk";
const paths = new Set(indexableRoutes.map(route => route.path.replace(/\/$/, "") || "/"));
type EventName = "pageview" | "Phone Click" | "Email Click" | "Enquiry Submitted";
type Plausible = ((name: EventName, options: { u: string }) => void) & { q?: unknown[][] };
declare global { interface Window { plausible?: Plausible } }

// Only public routes and campaign labels: never form data, arbitrary query strings or hashes.
export function analyticsUrl(href: string): string | null {
  const url = new URL(href);
  if (![domain, "truedampspecialists.co.uk"].includes(url.hostname)) return null;
  if (!paths.has(url.pathname.replace(/\/$/, "") || "/")) return null;
  const clean = new URL(url.pathname, `https://${domain}`);
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = url.searchParams.get(key);
    if (value && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) clean.searchParams.set(key, value);
  }
  return clean.href;
}

export function trackEvent(name: EventName) {
  if (typeof window === "undefined") return;
  const u = analyticsUrl(window.location.href);
  if (!u) return;
  // Analytics must never interrupt navigation or a successful enquiry.
  try { window.plausible?.(name, { u }); } catch { /* best effort */ }
}

export function loadAnalytics() {
  if (!analyticsUrl(window.location.href) || document.getElementById("plausible-tracker")) return;
  window.plausible = window.plausible || Object.assign(
    (name: EventName, options: { u: string }) => { window.plausible?.q?.push([name, options]); },
    { q: [] as unknown[][] },
  );
  const script = document.createElement("script");
  script.id = "plausible-tracker";
  script.defer = true;
  script.dataset.domain = domain;
  // Installed self-hosted version supports the manual extension and URL override `u`.
  script.src = "https://analytics.aspectstudio.net/js/script.manual.js";
  document.head.appendChild(script);
}
