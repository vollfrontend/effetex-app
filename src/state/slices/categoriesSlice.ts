// Stores
import { logZustandAction } from '@/src/state/zustandLogger';

// Types
// RootState та CategoriesSlice залишаємо зі state/types
import type { RootState, CategoriesSlice } from '@/src/state/types';
// А ось Category беремо з API-типів
import type { Category } from '@/src/api/types';

type StoreSet = (partial: RootState | Partial<RootState>) => void;
type StoreGet = () => RootState;

export const createCategoriesSlice = (
  set: StoreSet,
  get: StoreGet,
): CategoriesSlice => ({
  categories: [],

  addToCategories: (item: Category): void => {
    const prevCategories: Category[] = get().categories;

    const exists: boolean = prevCategories.some(
      category => category.category_id === item.category_id,
    );

    if (!exists) {
      const nextCategories: Category[] = [...prevCategories, item];

      logZustandAction<RootState, 'categories'>(
        'categories/add',
        'categories',
        prevCategories,
        nextCategories,
      );

      set({ categories: nextCategories });
    }
  },

  setCategories: (items: Category[]): void => {
    set({ categories: items });
  },
});
