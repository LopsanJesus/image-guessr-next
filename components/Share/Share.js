"use client";

import { useTranslation } from "react-i18next";
import ShareButtons from "@/components/ShareButtons/ShareButtons";

const Share = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center w-full py-8">
      <div className="overflow-hidden rounded max-w-md w-full shadow-lg bg-white pb-8">
        <div className="flex justify-center text-3xl my-10">
          {t("Play with your friends")}
        </div>
        <ShareButtons />
      </div>
    </div>
  );
};

export default Share;
