"use client";

import { useEffect } from "react";
import "@/config/i18n/i18n";
import { detectAndApplyLanguage } from "@/config/i18n/i18n";

export default function I18nProvider({ children }) {
  useEffect(() => {
    detectAndApplyLanguage();
  }, []);

  return children;
}
