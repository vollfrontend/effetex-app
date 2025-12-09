import type { RootState, NavigationSlice } from '@/src/state/types';

type StoreSet = (partial: RootState | Partial<RootState>) => void;

export const createNavigationSlice = (set: StoreSet): NavigationSlice => ({
  currentRoute: 'Home',
  setCurrentRoute: name => set({ currentRoute: name }),
});
