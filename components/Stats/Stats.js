"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { getStoredArray, CITIES_PREFIX } from "@/helpers/storage";
import { getNumberOfLevels } from "@/data/cities";
import { SCORE_TO_COMPLETE_LEVEL } from "@/helpers/score";
import Footer from "@/components/Footer/Footer";

const TOTAL_IMAGES = 12;

const LevelBar = ({ level, hits, total }) => {
  const pct = Math.min((hits / total) * 100, 100);
  const completed = hits >= total;

  return (
    <Link href={`/play/level/${level}`} className="block group">
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
        <span className="text-white/60 text-sm w-16 shrink-0">
          {completed ? "✅" : "🔵"} Niv. {level}
        </span>
        <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              backgroundColor: completed ? "var(--color-bgGreen)" : "var(--color-secondary)",
            }}
          />
        </div>
        <span className="text-white/80 text-sm w-10 text-right shrink-0">{hits}/{total}</span>
      </div>
    </Link>
  );
};

const Stats = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const numLevels = getNumberOfLevels();
    const levels = [];
    let totalGuessed = 0;
    let levelsCompleted = 0;

    for (let i = 1; i <= numLevels; i++) {
      const stored = getStoredArray(CITIES_PREFIX + i);
      const hits = stored.length;
      totalGuessed += hits;
      if (hits >= SCORE_TO_COMPLETE_LEVEL) levelsCompleted++;
      levels.push({ level: i, hits });
    }

    setData({ levels, totalGuessed, levelsCompleted, numLevels });
  }, []);

  if (!data) return null;

  const totalImages = data.numLevels * TOTAL_IMAGES;
  const globalPct = Math.round((data.totalGuessed / totalImages) * 100);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          {t("Your progress")}
        </h1>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "var(--bg-card)" }}>
            <p className="text-4xl font-bold text-secondary">{data.totalGuessed}</p>
            <p className="text-white/60 text-sm mt-1">{t("Total guessed")}</p>
          </div>
          <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "var(--bg-card)" }}>
            <p className="text-4xl font-bold text-secondary">{data.levelsCompleted}</p>
            <p className="text-white/60 text-sm mt-1">{t("Levels completed")}</p>
          </div>
        </div>

        {/* Global progress */}
        <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: "var(--bg-card)" }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/80 text-sm font-semibold">Global</span>
            <span className="text-secondary font-bold">{globalPct}%</span>
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${globalPct}%`, backgroundColor: "var(--color-bgGreen)" }}
            />
          </div>
          <p className="text-white/40 text-xs mt-2 text-right">{data.totalGuessed} / {totalImages}</p>
        </div>

        {/* Per-level breakdown */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)" }}>
          <h2 className="text-white/80 text-sm font-semibold mb-2 px-3">{t("Levels completed")}</h2>
          {data.levels.map(({ level, hits }) => (
            <LevelBar key={level} level={level} hits={hits} total={TOTAL_IMAGES} />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Stats;
