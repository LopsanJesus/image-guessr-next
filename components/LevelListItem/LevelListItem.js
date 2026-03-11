"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { isLevelCompleted } from "@/helpers/score";
import CheckIcon from "@/assets/CheckIcon/CheckIcon";

const LevelListItem = ({ level, hits, disabled }) => {
  const { t } = useTranslation();
  const levelCompleted = useMemo(() => {
    return isLevelCompleted(hits);
  }, [hits]);

  return (
    <Link
      href={"/play/level/" + level}
      id={"level-" + level}
      className={`block group p-4 m-4 rounded-3xl relative
      ${
        levelCompleted
          ? "bg-bgGreen hover:bg-hoverGreen text-white group-hover:text-white"
          : disabled
          ? "bg-gray-400 opacity-25 cursor-not-allowed"
          : "text-primary bg-white hover:bg-hoverYellow"
      }
      `}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
    >
      {levelCompleted && (
        <div className="absolute right-0 mr-5">
          <CheckIcon />
        </div>
      )}
      <p
        className={`flex justify-center font-bold text-3xl mb-1 ${
          levelCompleted && "group-hover:text-white"
        }`}
      >
        {t("Level") + " " + level}
      </p>

      <p
        className={`flex justify-center text-grey-darker mb-2 ${
          levelCompleted && "group-hover:text-white"
        }`}
      >
        {hits ? hits : 0} / 12
      </p>
    </Link>
  );
};

export default LevelListItem;
