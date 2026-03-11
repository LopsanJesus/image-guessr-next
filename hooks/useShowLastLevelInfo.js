import { useEffect, useState } from "react";
import { getNumberOfLevels } from "../data/cities";
import { storeItem, getStoredItem } from "../helpers/storage";
import { SCORE_TO_UNLOCK_LEVEL } from "../helpers/score";

const LAST_LEVEL_COMPLETED_INFO_SHOWN_STORAGE_KEY = "LAST_LEVEL_CONGRATS_SEEN";

const shouldShowLastLevelInfo = (level, score) => {
  if (typeof window === "undefined") return false;
  return (
    level === getNumberOfLevels().toString() &&
    score >= SCORE_TO_UNLOCK_LEVEL &&
    (getStoredItem(LAST_LEVEL_COMPLETED_INFO_SHOWN_STORAGE_KEY) === null ||
      !getStoredItem(LAST_LEVEL_COMPLETED_INFO_SHOWN_STORAGE_KEY).includes(level))
  );
};

export function useShowLastLevelInfo(level, score) {
  const [showLastLevelInfo, setLastLevelInfoSeen] = useState(false);

  useEffect(() => {
    setLastLevelInfoSeen(shouldShowLastLevelInfo(level, score));
  }, [level, score]);

  const setShowLastLevelInfo = (level) => {
    const lastLevelInfoSeen = getStoredItem(LAST_LEVEL_COMPLETED_INFO_SHOWN_STORAGE_KEY);
    if (lastLevelInfoSeen === null || !lastLevelInfoSeen.includes(level)) {
      storeItem(level, LAST_LEVEL_COMPLETED_INFO_SHOWN_STORAGE_KEY);
      setLastLevelInfoSeen(false);
    }
  };

  return { showLastLevelInfo, setShowLastLevelInfo };
}
