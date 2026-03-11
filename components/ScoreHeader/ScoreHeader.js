"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { SCORE_TO_UNLOCK_LEVEL } from "@/helpers/score";

const ScoreHeader = ({ level, score, nextLevelExists }) => {
  const { t } = useTranslation();
  const router = useRouter();
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
        <button
          type="button"
          disabled={!isUnlocked}
          onClick={isUnlocked ? () => router.push("/play/level/" + nextLevel) : undefined}
          className={`w-full py-2 rounded-xl font-bold text-sm transition-colors ${
            isUnlocked
              ? "bg-secondary text-primary hover:bg-yellow-400"
              : "bg-secondary/20 text-white/30 cursor-not-allowed"
          }`}
        >
          {t("Next level")}
        </button>
      )}
    </div>
  );
};

export default ScoreHeader;
