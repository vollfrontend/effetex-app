import type { LanguageSlice, RootState, Language } from '@/src/state/types';

type StoreSet = (partial: RootState | Partial<RootState>) => void;

// Всі доступні мови
export const availableLanguages: Language[] = [
  { code: 'uk', name: 'Українська', nativeName: 'Українська' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
];

export const createLanguageSlice = (set: StoreSet): LanguageSlice => ({
  availableLanguages,
  currentLanguage: 'uk', // За замовчуванням українська
  setCurrentLanguage: (languageCode) => set({ currentLanguage: languageCode }),
  getCurrentLanguageObject: () => {
    const state = set as unknown as RootState;
    return availableLanguages.find(lang => lang.code === state.currentLanguage) || availableLanguages[0];
  },
});
