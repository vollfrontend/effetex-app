// i18n/index.ts
// English comment: i18next initialization with AsyncStorage + react-native-localize

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ua from './resources/ua.json';
import ru from './resources/ru.json';

export type AvailableLang = 'ru' | 'ua';

const resources = {
  ru: { translation: ru },
  ua: { translation: ua },
};

// English: Load language from device or AsyncStorage
const detectLanguage = async (): Promise<AvailableLang> => {
  try {
    const saved = await AsyncStorage.getItem('appLanguage');
    if (saved === 'ru' || saved === 'ua') return saved;

    const locales = RNLocalize.getLocales();
    const systemLang = locales[0]?.languageCode?.toLowerCase();

    return systemLang === 'uk' ? 'ua' : 'ua';
  } catch {
    return 'ua';
  }
};

// English: Change language and save to AsyncStorage
export const changeLanguage = async (lang: AvailableLang): Promise<void> => {
  await AsyncStorage.setItem('appLanguage', lang);
  await i18n.changeLanguage(lang);
};

export const initI18n = async (): Promise<void> => {
  const lang = await detectLanguage();

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: lang,
    fallbackLng: 'ua',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;
