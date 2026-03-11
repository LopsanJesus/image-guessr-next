"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import ShareIcon from "@/assets/ShareIcon/ShareIcon";
import useNavTransition from "@/hooks/useNavTransition";

const TopBar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const navigate = useNavTransition();

  if (pathname === "/") return null;

  return (
    <div className="sticky top-0 z-40">
      <nav className="bg-primary">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center justify-start sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <span
                  className="font-custom block text-secondary text-4xl font-medium p-2 cursor-pointer"
                  onClick={() => navigate("/play")}
                >
                  ImageGuessr
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShareIcon />
              <button
                type="button"
                onClick={() => navigate("/play")}
                className="bg-secondary text-primary font-bold px-3 py-2 rounded-md text-sm transition-all active:scale-95"
              >
                {t("Levels")}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
