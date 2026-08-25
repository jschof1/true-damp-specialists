import { useEffect, useState } from "react";
import {
  optionalToolsAreAllowed,
  optionalToolsChangedEvent,
} from "@/components/OptionalToolsConsent";

const ChatWidget = () => {
  const [optionalToolsAllowed, setOptionalToolsAllowed] = useState(
    optionalToolsAreAllowed,
  );

  useEffect(() => {
    const refreshConsent = () => setOptionalToolsAllowed(optionalToolsAreAllowed());
    window.addEventListener(optionalToolsChangedEvent, refreshConsent);
    return () => window.removeEventListener(optionalToolsChangedEvent, refreshConsent);
  }, []);

  useEffect(() => {
    const loadChat = () => {
      // Check if script already exists
      if (document.getElementById("ghl-chat-widget-script")) return;

      const script = document.createElement("script");
      script.id = "ghl-chat-widget-script";
      script.src = "https://widgets.leadconnectorhq.com/loader.js";
      script.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
      script.setAttribute("data-widget-id", "69de51319f3b6fa7e276cf08");
      script.defer = true;
      
      document.body.appendChild(script);
    };

    const removeChat = () => {
      document.getElementById("ghl-chat-widget-script")?.remove();
      document
        .querySelectorAll(
          'iframe[src*="leadconnectorhq.com/chat-widget"], iframe[src*="widgets.leadconnectorhq.com"], [data-widget-id="69de51319f3b6fa7e276cf08"]',
        )
        .forEach((element) => element.remove());
    };

    if (!optionalToolsAllowed) {
      removeChat();
      return removeChat;
    }

    // Load after a short delay to keep critical path clear
    const timer = setTimeout(loadChat, 3000);

    return () => {
      clearTimeout(timer);
      removeChat();
    };
  }, [optionalToolsAllowed]);

  return null;
};

export default ChatWidget;
