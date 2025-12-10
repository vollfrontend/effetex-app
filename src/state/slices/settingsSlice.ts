import type { SettingsSlice, RootState } from '@/src/state/types';

type StoreSet = (partial: RootState | Partial<RootState>) => void;

export const createSettingsSlice = (set: StoreSet): SettingsSlice => ({
  theme: 'light',
  language: 'uk',
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
});
