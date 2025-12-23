import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Logger
import { zustandLogger } from '@/src/state/zustandLogger';

// Slices
import { createFavoritesSlice } from '@/src/state/slices/favoritesSlice';
import { createCategoriesSlice } from '@/src/state/slices/categoriesSlice';
import { createCartSlice } from '@/src/state/slices/cartSlice';
import { createAuthSlice } from '@/src/state/slices/authSlice';
import { createSettingsSlice } from '@/src/state/slices/settingsSlice';
import { createLanguageSlice } from '@/src/state/slices/languageSlice';

// Types
import type { RootState } from '@/src/state/types';

export const useStore = create<RootState>()(
  devtools(
    persist(
      zustandLogger((set, get) => ({
        ...createFavoritesSlice(set, get),
        ...createCategoriesSlice(set, get),
        ...createCartSlice(set, get),
        ...createLanguageSlice(set, get),
        ...createAuthSlice(set, get),
        ...createSettingsSlice(set),
      })),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: state => ({
          user: state.user,
          favorites: state.favorites,
          cart: state.cart,
          settings: state.settings,
        }),
      },
    ),
    { name: 'UserStore' },
  ),
);
