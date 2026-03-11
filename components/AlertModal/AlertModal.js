"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import CTAButton from "@/components/CTAButton/CTAButton";
import Portal from "@/components/Portal/Portal";

const AlertModal = ({ level, setShowModal }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Portal>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-gray-500/75" aria-hidden="true" />

      {/* Scrollable container */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-full sm:max-w-3xl transform overflow-hidden rounded-lg bg-primary text-white text-left shadow-xl transition-all"
            role="dialog"
            aria-modal="true"
          >
            <div className="px-4 pt-5 pb-4 sm:p-6">
              <h3 className="text-lg font-medium text-white">
                {t("You unlocked level") + (parseInt(level) + 1) + "!"}
              </h3>
            </div>
            <div className="px-4 py-3 sm:px-6 flex flex-col sm:flex-row gap-2">
              <CTAButton
                text={t("Go")}
                level={level}
                onClick={() => {
                  setShowModal(false);
                  ReactGA.event({ category: "Modal new level unlocked", action: "Navigate to new level", label: "to -> level " + (parseInt(level) + 1) });
                  router.push("/play/level/" + (parseInt(level) + 1));
                }}
              />
              <button
                type="button"
                className="w-full sm:w-auto justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:text-sm"
                onClick={() => {
                  setShowModal(false);
                  ReactGA.event({ category: "Modal new level unlocked", action: "finish current level", label: "to -> level " + parseInt(level) });
                }}
              >
                {t("Let me finish")}
              </button>
            </div>
            <div className="my-5">
              <ShareButtons />
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AlertModal;
