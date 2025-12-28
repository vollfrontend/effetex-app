// Stores
import { logZustandAction } from '@/src/state/zustandLogger';

// API
import {
  getWishlist,
  addToWishlist,
  deleteFromWishlist,
} from '@/src/api/products';
import type { ProductItem } from '@/src/api/types';

// Types
import type { RootState, FavoritesSlice } from '@/src/state/types';
import type { Product } from '@/src/api/products';

type StoreSet = (partial: RootState | Partial<RootState>) => void;
type StoreGet = () => RootState;

// Mapper function to convert ProductItem to Product
const mapProductItemToProduct = (item: ProductItem): Product => {
  console.log('item', item);

  return {
    id: String(item.id),
    title: item.name,
    image: item.image,
    price: Number(item.special ?? 0),
    oldPrice: Number(item.price ?? 0),
    discount: item.special
      ? Math.round((1 - Number(item.price) / Number(item.special)) * 100)
      : undefined,
  };
};

export const createFavoritesSlice = (
  set: StoreSet,
  get: StoreGet,
): FavoritesSlice => ({
  favorites: [],
  isLoadingWishlist: false,

  addToFavorites: async (item: Product): Promise<void> => {
    const state = get();
    const prevFavorites: Product[] = state.favorites;
    const user = state.user;

    // Перевіряємо чи товар вже є в favorites
    if (prevFavorites.find(product => product.id === item.id)) {
      return;
    }

    // Оптимістичне оновлення - додаємо локально одразу
    const nextFavorites: Product[] = [...prevFavorites, item];

    logZustandAction<RootState, 'favorites'>(
      'favorites/add',
      'favorites',
      prevFavorites,
      nextFavorites,
    );

    set({ favorites: nextFavorites });

    // Синхронізуємо з API якщо користувач авторизований
    if (user && user.token) {
      try {
        await addToWishlist({
          productId: Number(item.id),
          sessionId: user.token,
        });
      } catch (error) {
        console.error('Помилка додавання до wishlist в API:', error);
        // Rollback при помилці
        set({ favorites: prevFavorites });
      }
    }
  },

  removeFromFavorites: async (id: string): Promise<void> => {
    const state = get();
    const prevFavorites: Product[] = state.favorites;
    const user = state.user;

    // Оптимістичне оновлення - видаляємо локально одразу
    const nextFavorites: Product[] = prevFavorites.filter(
      product => product.id !== id,
    );

    logZustandAction<RootState, 'favorites'>(
      'favorites/remove',
      'favorites',
      prevFavorites,
      nextFavorites,
    );

    set({ favorites: nextFavorites });

    // Синхронізуємо з API якщо користувач авторизований
    if (user && user.token) {
      try {
        await deleteFromWishlist({
          productId: Number(id),
          sessionId: user.token,
        });
      } catch (error) {
        console.error('Помилка видалення з wishlist в API:', error);
        // Rollback при помилці
        set({ favorites: prevFavorites });
      }
    }
  },

  isFavorite: (id: string): boolean => {
    return get().favorites.some(product => product.id === id);
  },

  setFavorites: (items: Product[]): void => {
    const prevFavorites: Product[] = get().favorites;

    logZustandAction<RootState, 'favorites'>(
      'favorites/set',
      'favorites',
      prevFavorites,
      items,
    );

    set({ favorites: items });
  },

  fetchWishlist: async (): Promise<void> => {
    const state = get();
    const user = state.user;
    const languageId = state.settings.currentLanguageId;

    if (!user || !user.token) {
      console.log('fetchWishlist: користувач не авторизований');
      return;
    }

    console.log('fetchWishlist: Початок завантаження з API...', {
      token: user.token.substring(0, 10) + '...',
      languageId,
    });

    set({ isLoadingWishlist: true } as Partial<RootState>);

    try {
      const wishlistItems = await getWishlist({
        sessionId: user.token,
        languageId,
      });

      console.log('fetchWishlist: Отримано товарів з API:', wishlistItems);

      const products = wishlistItems.map(mapProductItemToProduct);

      logZustandAction<RootState, 'favorites'>(
        'favorites/fetchWishlist',
        'favorites',
        state.favorites,
        products,
      );

      set({
        favorites: products,
        isLoadingWishlist: false,
      } as Partial<RootState>);

      console.log(
        'fetchWishlist: Успішно оновлено стор, товарів:',
        products.length,
      );
    } catch (error) {
      console.error('Помилка завантаження wishlist:', error);
      set({ isLoadingWishlist: false } as Partial<RootState>);
    }
  },
});
