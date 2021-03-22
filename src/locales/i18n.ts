import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cache from 'i18next-localstorage-cache';
import detector from "i18next-browser-languagedetector";

import ja from "./ja.json";
import en from "./en.json";

const resources = {
    en: {
        translation: en,
    },
    ja: {
        translation: ja,
    },
};

i18n
    .use(detector)
    .use(Cache)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        react: {
            wait: true,
        },
        resources: resources,
    });

export default i18n;