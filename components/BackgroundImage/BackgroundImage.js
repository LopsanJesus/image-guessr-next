"use client";

import { useEffect } from "react";

const BackgroundImage = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(/background2.jpg)`;
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";

    return () => {
      document.body.style.backgroundImage = "";
    };
  });

  return null;
};

export default BackgroundImage;
