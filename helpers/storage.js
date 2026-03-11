import { getNumberOfLevels } from "../data/cities";
import { SCORE_TO_UNLOCK_LEVEL } from "../helpers/score";

export const CITIES_PREFIX = "level";

export const getLastLevelAchieved = () => {
  if (typeof window === "undefined") return 0;
  var lastLevelAchieved = 0;
  for (let i = 1; i <= getNumberOfLevels(); i++) {
    if (getStoredArray(CITIES_PREFIX + i).length >= SCORE_TO_UNLOCK_LEVEL) {
      lastLevelAchieved = i;
    }
  }
  return lastLevelAchieved;
};

export const storeItem = (item, key) => {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(key) != null) {
    localStorage.setItem(key, localStorage.getItem(key) + item + ",");
  } else {
    localStorage.setItem(key, item + ",");
  }
};

export const getStoredItem = (key) => {
  if (typeof window === "undefined") return null;
  if (localStorage.getItem(key) != null) {
    return localStorage.getItem(key);
  }
  return null;
};

export const getStoredArray = (key) => {
  if (typeof window === "undefined") return [];
  if (
    typeof localStorage.getItem(key) !== "undefined" &&
    localStorage.getItem(key) !== null
  ) {
    return localStorage
      .getItem(key)
      .split(",")
      .filter((item) => item.length > 0);
  }
  return [];
};

export const clearStorage = () => {
  if (typeof window === "undefined") return;
  let i18nextLng = getStoredItem("i18nextLng");
  localStorage.clear();
  storeItem(i18nextLng, "i18nextLng");
};
