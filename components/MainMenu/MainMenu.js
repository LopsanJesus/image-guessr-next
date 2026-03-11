"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import LevelListItem from "@/components/LevelListItem/LevelListItem";
import { getLastLevelAchieved } from "@/helpers/storage";
import { getHitsPerLevel } from "@/helpers/score";
import { getNumberOfLevels } from "@/data/cities";
import _ from "lodash";
import Footer from "@/components/Footer/Footer";

const MainMenu = () => {
  const { t } = useTranslation();
  const numberOfLevels = getNumberOfLevels();
  const [lastLevelAchieved, setLastLevelAchieved] = useState(0);
  const [hitsPerLevel, setHitsPerLevel] = useState({});

  useEffect(() => {
    setLastLevelAchieved(getLastLevelAchieved());
    setHitsPerLevel(getHitsPerLevel());
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-center w-full py-8">
          <div className="max-w-md w-full px-4">
            {numberOfLevels > 0 ? (
              _.times(numberOfLevels, (index) => {
                return (
                  <LevelListItem
                    key={"levelListItem" + index}
                    level={index + 1}
                    hits={hitsPerLevel[index + 1]}
                    disabled={index + 1 > lastLevelAchieved + 1}
                  />
                );
              })
            ) : (
              <div className="flex justify-center text-white p-8">
                No levels were found
              </div>
            )}

            {/* Bottom section */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <p className="text-white/40 text-sm tracking-widest uppercase">
                {t("More levels coming soon...")}
              </p>

              <div className="w-full h-px bg-white/10" />

              <Link
                href="/stats"
                className="w-full flex items-center justify-center py-3 rounded-2xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors text-sm font-medium"
              >
                {t("Your progress")}
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainMenu;
