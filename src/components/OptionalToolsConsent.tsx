import { useEffect, useState } from "react";

const storageKey = "true-damp-specialists-optional-tools";
const preferencesEvent = "true-damp-specialists:optional-tools-preferences";
export const optionalToolsChangedEvent = "true-damp-specialists:optional-tools-changed";

export const optionalToolsAreAllowed = () =>
  typeof window !== "undefined" && localStorage.getItem(storageKey) === "allowed";

const OptionalToolsConsent = () => {
  const [choice, setChoice] = useState<"allowed" | "declined" | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem(storageKey);
    return saved === "allowed" || saved === "declined" ? saved : null;
  });
  const [open, setOpen] = useState(choice === null);

  useEffect(() => {
    const showPreferences = () => setOpen(true);
    window.addEventListener(preferencesEvent, showPreferences);
    return () => window.removeEventListener(preferencesEvent, showPreferences);
  }, []);

  const saveChoice = (nextChoice: "allowed" | "declined") => {
    localStorage.setItem(storageKey, nextChoice);
    setChoice(nextChoice);
    setOpen(false);
    window.dispatchEvent(new Event(optionalToolsChangedEvent));
  };

  if (!open) return null;

  return (
    <section
      className="fixed bottom-4 right-4 z-[200] w-[min(30rem,calc(100%-2rem))] rounded-xl border border-border bg-card p-5 text-card-foreground shadow-xl"
      aria-label="Optional website tools"
    >
      <h2 className="font-display text-xl font-bold">Optional website tools</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        With your permission, this site uses Plausible to understand aggregate
        website use and LeadConnector to provide live chat. Both are off by
        default. We do not send enquiry or report contents to analytics.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          onClick={() => saveChoice("declined")}
        >
          Keep optional tools off
        </button>
        <button
          type="button"
          className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground hover:bg-accent/90"
          onClick={() => saveChoice("allowed")}
        >
          Allow optional tools
        </button>
      </div>
    </section>
  );
};

export const openOptionalToolsPreferences = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(preferencesEvent));
  }
};

export default OptionalToolsConsent;
