import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { setupI18n } from "vite-plugin-i18n-detector/client";

i18next.use(LanguageDetector).use(initReactI18next).init({
    resources: {},
    nsSeparator: ".",
});

export const i18n = setupI18n({
    language: i18next.language,
    onInited(langs, currentLang) {
        
    },
    fallbackLng: 'zh-CN',
    onResourceLoaded(langHelper, currentLang) {
        Object.keys(langHelper).forEach((ns) => {
            i18next.addResourceBundle(currentLang, ns, langHelper[ns])
        });
    },
});
