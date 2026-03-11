import { getStoredArray, CITIES_PREFIX } from "./storage.js";

export const SCORE_TO_UNLOCK_LEVEL = 10;
export const SCORE_TO_COMPLETE_LEVEL = 12;

export const isLevelCompleted = (hits) => {
  return SCORE_TO_COMPLETE_LEVEL === hits;
};

export const getHitsPerLevel = () => {
  const achievedCitiesPerLevel = [];
  const hitsPerLevel = [];

  var level = 1;
  while (getStoredArray(CITIES_PREFIX + level).length > 0) {
    achievedCitiesPerLevel.push(getStoredArray(CITIES_PREFIX + level));
    level++;
  }

  achievedCitiesPerLevel.map((element, index) => {
    return (hitsPerLevel[index + 1] = element.length);
  });

  return hitsPerLevel;
};
