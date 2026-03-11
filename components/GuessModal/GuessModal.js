"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga";
import { getImageTranslations, getCityId } from "@/data/cities";
import Image from "@/components/Image/Image";
import Portal from "@/components/Portal/Portal";
import { getHints } from "@/helpers/hints";

const GuessModal = ({
  imageName, imageType, addHit, onCloseModal, level, isStored,
  hintsLeft, onUseHint,
}) => {
  const { t } = useTranslation();
  const modalInput = useRef(null);
  const [error, setError] = useState(false);
  const [hintIndex, setHintIndex] = useState(null); // which hint is showing

  const cityId = getCityId(imageName);
  const hints = getHints(cityId);

  const getLabel = () => "Level: " + level + " - Imagen: " + imageName;

  const trackHit = () =>
    ReactGA.event({ category: "Image", action: "Image guess hit", label: getLabel() });

  const trackError = () =>
    ReactGA.event({ category: "Image", action: "Image guess error", label: getLabel() + " - tried: " + modalInput.current?.value });

  const checkGuess = () => {
    if (!modalInput.current) return;
    if (getImageTranslations(imageName).includes(modalInput.current.value.trim().toLowerCase())) {
      addHit();
      trackHit();
    } else {
      setError(true);
      trackError();
    }
  };

  const handleUseHint = () => {
    const next = hintIndex === null ? 0 : hintIndex + 1;
    if (next < hints.length && hintsLeft > 0) {
      setHintIndex(next);
      onUseHint();
      ReactGA.event({ category: "Hint", action: "Hint used", label: getLabel() });
    }
  };

  const canUseHint = hintsLeft > 0 && (hintIndex === null || hintIndex < hints.length - 1);

  return (
    <Portal>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-full sm:max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-primary"
            role="dialog"
            aria-modal="true"
          >
            {/* Image */}
            <div className="px-4 pt-5 text-center sm:p-6 sm:pb-4">
              <Image
                showTypeInHeader={true}
                imageName={imageName}
                imageType={imageType}
                isStored={isStored}
              />
            </div>

            {/* Hint display */}
            {hintIndex !== null && (
              <div className="mx-4 mb-2 px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/30 text-center">
                <span className="text-secondary font-mono tracking-widest text-lg font-bold">
                  {hints[hintIndex]}
                </span>
              </div>
            )}

            {/* Input row */}
            {!isStored && (
              <div className="px-4 pb-3 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  maxLength="30"
                  className={`flex-1 uppercase rounded-xl border-2 px-4 py-2.5 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-secondary transition-colors ${
                    error ? "bg-red-100 border-red-400" : "bg-white border-white/20"
                  }`}
                  ref={modalInput}
                  onKeyUp={(e) => { if (e.key === "Enter") checkGuess(); }}
                  onChange={() => setError(false)}
                  autoFocus
                  autoComplete="off"
                  placeholder="..."
                />
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white font-bold transition-colors"
                  onClick={checkGuess}
                >
                  {t("Check")}
                </button>
              </div>
            )}

            {/* Actions row */}
            <div className={`px-4 pb-4 flex items-center justify-between gap-2 ${isStored ? "pt-4" : ""}`}>
              {/* Hint button */}
              {!isStored && (
                <button
                  type="button"
                  disabled={!canUseHint}
                  onClick={handleUseHint}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    canUseHint
                      ? "bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/40"
                      : "bg-white/5 text-white/30 cursor-not-allowed"
                  }`}
                >
                  💡 {t("Hint")} ({hintsLeft})
                </button>
              )}
              <button
                type="button"
                onClick={onCloseModal}
                className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors text-sm"
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default GuessModal;
