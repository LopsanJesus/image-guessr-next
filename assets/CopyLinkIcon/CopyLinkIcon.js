"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

const CopyLinkIcon = () => {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    const URL = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(URL);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <>
      <div className="copylink-icon-wrapper cursor-pointer" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-10 w-10 text-gray-300 hover:text-blue-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </div>
      {showConfirmation && (
        <span className="text-gray-500 text-sm absolute -mt-7">
          {t("Link copied to clipboard")}
        </span>
      )}
    </>
  );
};

export default CopyLinkIcon;
