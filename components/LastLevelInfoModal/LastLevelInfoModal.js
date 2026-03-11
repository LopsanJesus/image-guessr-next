"use client";

import { useTranslation } from "react-i18next";
import CityBadge from "@/components/CityBadge/CityBadge";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import Portal from "@/components/Portal/Portal";

const LastLevelInfoModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Portal>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-gray-500/75" aria-hidden="true" />

      {/* Scrollable container */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-11/12 sm:max-w-3xl transform overflow-hidden rounded-lg bg-primary text-white text-left shadow-xl transition-all"
            role="dialog"
            aria-modal="true"
          >
            <div className="px-4 pt-16 pb-4 sm:p-6">
              <div className="m-5 flex justify-center">
                <CityBadge />
              </div>
              <span className="font-custom block text-secondary text-4xl text-center font-medium p-2">
                ImageGuessr
              </span>
              <div className="text-center text-xl m-3 mb-7">
                <span>{t("Last level completed!")}</span>
              </div>
              <ShareButtons />
              <div className="text-center text-base m-3 mt-5">
                <span>{t("More levels coming soon...")}</span>
              </div>
            </div>
            <div className="px-4 pb-4 sm:px-6 flex justify-center">
              <button
                type="button"
                className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:text-sm"
                onClick={onClose}
              >
                {t("Let me finish")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default LastLevelInfoModal;
