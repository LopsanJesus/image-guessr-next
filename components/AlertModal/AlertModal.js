"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Portal from "@/components/Portal/Portal";
import useNavTransition from "@/hooks/useNavTransition";

const AlertModal = ({ level, setShowModal, score, storedCities, images }) => {
  const { t } = useTranslation();
  const navigate = useNavTransition();
  const nextLevel = parseInt(level) + 1;
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
    <Portal>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-primary text-center"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="px-6 pt-8 pb-4">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-white">
                {t("You unlocked level")} {nextLevel}!
              </h3>
              <p className="text-white/60 text-sm mt-1">{t("Keep it up!")}</p>
            </div>

            {/* Share result */}
            <div className="px-6 pb-4">
              <button
                type="button"
                onClick={handleShare}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {copied ? <>✅ {t("Copied!")}</> : <>📤 {t("Share result")}</>}
              </button>
            </div>

            {/* Navigation buttons */}
            <div className="px-6 pb-6 flex flex-col gap-2">
              <button
                type="button"
                className="w-full py-3 rounded-xl bg-secondary text-primary font-bold text-base hover:bg-yellow-400 transition-all active:scale-95"
                onClick={() => {
                  setShowModal(false);
                  navigate("/play/level/" + nextLevel);
                }}
              >
                {t("Go to level")} {nextLevel}
              </button>
              <button
                type="button"
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 text-sm transition-colors"
                onClick={() => setShowModal(false)}
              >
                {t("Let me finish")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AlertModal;
