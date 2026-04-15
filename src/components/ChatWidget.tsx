import { useEffect } from "react";

const ChatWidget = () => {
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

    // Load after a short delay to keep critical path clear
    const timer = setTimeout(loadChat, 3000);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default ChatWidget;
