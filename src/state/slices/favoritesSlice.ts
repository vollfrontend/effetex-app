// Stores
import { logZustandAction } from '@/src/state/zustandLogger';

// Types
import type { RootState, FavoritesSlice } from '@/src/state/types';
import type { Product } from '@/src/api/products';

type StoreSet = (partial: RootState | Partial<RootState>) => void;
type StoreGet = () => RootState;

export const createFavoritesSlice = (
  set: StoreSet,
  get: StoreGet,
): FavoritesSlice => ({
  favorites: [],

  addToFavorites: (item: Product): void => {
    const prevFavorites: Product[] = get().favorites;

    if (!prevFavorites.find(product => product.id === item.id)) {
      const nextFavorites: Product[] = [...prevFavorites, item];

      logZustandAction<RootState, 'favorites'>(
        'favorites/add',
        'favorites',
        prevFavorites,
        nextFavorites,
      );

      set({ favorites: nextFavorites });
    }
  },

  removeFromFavorites: (id: string): void => {
    const prevFavorites: Product[] = get().favorites;
    const nextFavorites: Product[] = prevFavorites.filter(
      product => product.id !== id,
    );

    logZustandAction<RootState, 'favorites'>(
      'favorites/remove',
      'favorites',
      prevFavorites,
      nextFavorites,
    );

    set({
      favorites: nextFavorites,
    });
  },

  isFavorite: (id: string): boolean => {
    return get().favorites.some(product => product.id === id);
  },
});
