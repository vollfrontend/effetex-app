import type { SettingsSlice, RootState } from '@/src/state/types';

type StoreSet = (
  partial:
    | RootState
    | Partial<RootState>
    | ((state: RootState) => RootState | Partial<RootState>),
) => void;

export const createSettingsSlice = (set: StoreSet): SettingsSlice => ({
  settings: {
    theme: 'light',
    language: 'uk',
    currentRoute: null,
    currentProductId: null,
    isSideMenuOpen: false,
    currentLanguage: 'uk',
    currentLanguageId: 1,
    isLanguagesLoaded: false,
    isAuthenticated: false,
  },

  setTheme: theme => set(state => ({ settings: { ...state.settings, theme } })),
  setLanguage: language =>
    set(state => ({ settings: { ...state.settings, language } })),

  setCurrentRoute: route =>
    set(state => ({ settings: { ...state.settings, currentRoute: route } })),

  setCurrentProductId: id =>
    set(state => ({ settings: { ...state.settings, currentProductId: id } })),

  setSideMenuOpen: isOpen =>
    set(state => ({ settings: { ...state.settings, isSideMenuOpen: isOpen } })),

  setCurrentLanguage: languageCode =>
    set(state => ({
      settings: { ...state.settings, currentLanguage: languageCode },
    })),

  setCurrentLanguageById: languageId =>
    set(state => ({
      settings: { ...state.settings, currentLanguageId: languageId },
    })),
});
