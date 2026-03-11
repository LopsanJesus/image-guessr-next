import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import es from "./translations/es.json";

const resources = {
  en: en,
  es: es,
};

// Sync init without browser language detection — ensures server and client
// render the same language on first pass (no hydration mismatch).
// Language detection runs client-side after hydration (see I18nProvider).
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "es",
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    keySeparator: false,
    interpolation: { escapeValue: false },
  });
}

export default i18n;

export const detectAndApplyLanguage = () => {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("i18nextLng");
  const browserLang = navigator.language?.split("-")[0];
  const lang = stored || (["es", "en"].includes(browserLang) ? browserLang : "es");
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }
};
