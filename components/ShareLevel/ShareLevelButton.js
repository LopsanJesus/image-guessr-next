"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

const ShareLevelButton = ({ level, score, storedCities, images }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const buildShareText = () => {
    const grid = images
      .map((img) => (storedCities.includes(img.image) ? "🟩" : "⬜"))
      .join("");
    const url = typeof window !== "undefined" ? window.location.origin : "";
    return `ImageGuessr ${t("Level")} ${level} ${score}/12\n${grid}\n${url}`;
  };

  const handleShare = async () => {
    const text = buildShareText();
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-yellow-400 text-primary font-bold transition-colors shadow-md"
    >
      {copied ? `✅ ${t("Copied!")}` : `📤 ${t("Share result")}`}
    </button>
  );
};

export default ShareLevelButton;
