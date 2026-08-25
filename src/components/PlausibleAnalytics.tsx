import { useEffect, useState } from "react";
import {
  optionalToolsAreAllowed,
  optionalToolsChangedEvent,
} from "@/components/OptionalToolsConsent";

const scriptId = "plausible-analytics-script";

const PlausibleAnalytics = () => {
  const [optionalToolsAllowed, setOptionalToolsAllowed] = useState(
    optionalToolsAreAllowed,
  );

  useEffect(() => {
    const refreshConsent = () => setOptionalToolsAllowed(optionalToolsAreAllowed());
    window.addEventListener(optionalToolsChangedEvent, refreshConsent);
    return () => window.removeEventListener(optionalToolsChangedEvent, refreshConsent);
  }, []);

  useEffect(() => {
    if (!optionalToolsAllowed) {
      document.getElementById(scriptId)?.remove();
      return;
    }

    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.defer = true;
    script.dataset.domain = "www.truedampspecialists.co.uk";
    script.src = "https://analytics.aspectstudio.net/js/script.js";
    document.head.appendChild(script);

    return () => script.remove();
  }, [optionalToolsAllowed]);

  return null;
};

export default PlausibleAnalytics;
