"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[22vh]">
      <div className="mb-16">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 rounded-2xl shadow-lg">
          <h1
            className="text-5xl sm:text-7xl xl:text-9xl text-white tracking-widest text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            {t("ImageGuessr")}
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href="/play"
          className="bg-secondary hover:bg-yellow-300 text-white font-bold py-4 px-10 rounded-lg text-xl"
        >
          {t("Play")}
        </Link>
      </div>
    </div>
  );
};

export default Home;
