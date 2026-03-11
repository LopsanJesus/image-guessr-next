"use client";

import CityIcon from "@/assets/CityIcon/CityIcon";
import CountryIcon from "@/assets/CountryIcon/CountryIcon";
import MonumentIcon from "@/assets/MonumentIcon/MonumentIcon";
import Portal from "@/components/Portal/Portal";
import {
  SCORE_TO_COMPLETE_LEVEL,
  SCORE_TO_UNLOCK_LEVEL,
} from "@/helpers/score";
import { useTranslation } from "react-i18next";

const TypeCard = ({ icon, bg, label, description }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl ${bg}`}>
    <div className="p-2 rounded-lg bg-white/20 shrink-0">{icon}</div>
    <div>
      <p className="font-bold text-white text-sm">{label}</p>
      <p className="text-white/70 text-xs">{description}</p>
    </div>
  </div>
);

const InfoModal = ({ onCloseInfoModal, level }) => {
  const { t } = useTranslation();
  const nextLevel = parseInt(level) + 1;
  const isAdvancedLevel = parseInt(level) > 4;
  const isNewTypeLevel = parseInt(level) === 5;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="bg-primary px-6 pt-6 pb-4">
              <h2 className="text-xl font-bold text-white text-center mb-1">
                {t("Info")} · {t("Level")} {level}
              </h2>
              {isNewTypeLevel && (
                <div className="mt-3 px-3 py-2 rounded-lg bg-secondary/20 border border-secondary/40 text-center">
                  <span className="text-secondary text-sm font-semibold">
                    🔓 {t("New type of images unlocked!")}
                  </span>
                </div>
              )}
            </div>

            {/* Goal banner */}
            <div className="bg-primary px-6 py-3 flex flex-col items-center gap-0.5 text-center">
              <span className="text-white/80 text-sm">
                {t("Achieve 10 points to get to level")} {nextLevel}
              </span>
              <span className="text-secondary font-bold text-lg">
                {SCORE_TO_UNLOCK_LEVEL}/{SCORE_TO_COMPLETE_LEVEL}
              </span>
            </div>

            {/* Type cards */}
            <div className="bg-primary px-6 py-4 flex flex-col gap-2">
              <TypeCard
                icon={<CityIcon />}
                bg="bg-yellow-500/40 border border-yellow-400/60"
                label={t("Guess the city")}
                description={t("city")}
              />
              {isAdvancedLevel && (
                <>
                  <TypeCard
                    icon={<CountryIcon />}
                    bg="bg-blue-500/40 border border-blue-400/60"
                    label={t("Guess the country")}
                    description={t("country")}
                  />
                  <TypeCard
                    icon={<MonumentIcon />}
                    bg="bg-pink-500/40 border border-pink-400/60"
                    label={t("Guess the monument")}
                    description={t("monument")}
                  />
                </>
              )}
            </div>

            {/* Footer */}
            <div className="bg-primary px-6 pb-6 pt-2 flex justify-center">
              <button
                type="button"
                onClick={onCloseInfoModal}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-white/90 text-primary font-semibold transition-colors"
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

export default InfoModal;
