import { useEffect } from "react";

const HubSpotChat = () => {
  useEffect(() => {
    if (!document.getElementById("hs-script-loader")) {
      const script = document.createElement("script");
      script.src = "//js-na1.hs-scripts.com/49400152.js";
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.id = "hs-script-loader";
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default HubSpotChat;
