import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Logger
import { zustandLogger } from '@/src/state/zustandLogger';

// Slices
import { createFavoritesSlice } from '@/src/state/slices/favoritesSlice';
import { createNavigationSlice } from '@/src/state/slices/navigation';
import { createCategoriesSlice } from '@/src/state/slices/categoriesSlice';
import { createCartSlice } from '@/src/state/slices/cartSlice';

import { createSettingsSlice } from '@/src/state/slices/settingsSlice';
import { createLanguageSlice } from '@/src/state/slices/languageSlice';

// Types
import type { RootState } from '@/src/state/types';

export const useStore = create<RootState>()(
  devtools(
    zustandLogger((set, get) => ({
      ...createFavoritesSlice(set, get),
      ...createNavigationSlice(set),
      ...createCategoriesSlice(set, get),
      ...createCartSlice(set, get),
      ...createLanguageSlice(set, get),
      ...createSettingsSlice(set),
    })),
    { name: 'UserStore' },
  ),
);
