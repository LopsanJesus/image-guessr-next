"use client";

import { useTranslation } from "react-i18next";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { SCORE_TO_UNLOCK_LEVEL } from "@/helpers/score";
import useNavTransition from "@/hooks/useNavTransition";

const ScoreHeader = ({ level, score, nextLevelExists }) => {
  const { t } = useTranslation();
  const navigate = useNavTransition();
  const nextLevel = parseInt(level) + 1;
  const isUnlocked = score >= SCORE_TO_UNLOCK_LEVEL;

  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      {/* Score + bar inline */}
      <div className="flex items-center gap-3">
        <span className="shrink-0 font-bold text-white">
          <span className="text-2xl">{score}</span>
          <span className="text-sm text-white/60"> / 12</span>
        </span>
        <div className="flex-1">
          <ProgressBar score={score} total={12} unlockAt={SCORE_TO_UNLOCK_LEVEL} />
        </div>
      </div>

      {/* Next level button — full width on mobile */}
      {nextLevelExists && (
        <div className="flex justify-center mb-1">
          <button
            type="button"
            disabled={!isUnlocked}
            onClick={isUnlocked ? () => navigate("/play/level/" + nextLevel) : undefined}
            className={`w-full sm:w-auto sm:px-10 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 ${
              isUnlocked
                ? "bg-secondary text-primary hover:bg-yellow-400"
                : "bg-secondary/20 text-white/30 cursor-not-allowed"
            }`}
          >
            {t("Next level")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreHeader;
