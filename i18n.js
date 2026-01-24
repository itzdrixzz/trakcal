import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locals/en.json";
import es from "./locals/es.json";
import fr from "./locals/fr.json";
import hi from "./locals/hi.json";
import it from "./locals/it.json";
import nl from "./locals/nl.json";
import pt from "./locals/pt.json";
import ru from "./locals/ru.json";
import sv from "./locals/sv.json";
import zh from "./locals/zh.json";

// Define your resources once
const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  hi: { translation: hi },
  it: { translation: it },
  nl: { translation: nl },
  pt: { translation: pt },
  ru: { translation: ru },
  sv: { translation: sv },
  zh: { translation: zh },
};

// Initialize i18n immediately with a fallback
i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Async function to load saved language and update i18n
const initI18n = async () => {
  try {
    const savedLang = await AsyncStorage.getItem("lang");
    const deviceLang = Localization.locale
      ? Localization.locale.split("-")[0]
      : "en";
    const langToUse = savedLang || deviceLang;

    await i18n.changeLanguage(langToUse);
  } catch (error) {
    console.error("Error loading language from storage:", error);
  }
};

// Call it immediately
initI18n();

export default i18n;
