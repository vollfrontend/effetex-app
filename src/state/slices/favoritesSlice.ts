// Stores
import { logZustandAction } from '@/src/state/zustandLogger';

// API
import { getWishlist } from '@/src/api/products';
import type { ProductItem } from '@/src/api/types';

// Types
import type { RootState, FavoritesSlice } from '@/src/state/types';
import type { Product } from '@/src/api/productsOld';

type StoreSet = (partial: RootState | Partial<RootState>) => void;
type StoreGet = () => RootState;

// Mapper function to convert ProductItem to Product
const mapProductItemToProduct = (item: ProductItem): Product => ({
  id: String(item.id),
  title: item.name,
  image: item.image,
  price: String(item.price),
  oldPrice: item.special ? String(item.price) : undefined,
  discount: item.special
    ? Math.round((1 - Number(item.special) / item.price) * 100)
    : undefined,
  rating: item.rating,
  reviews: item.reviews,
});

export const createFavoritesSlice = (
  set: StoreSet,
  get: StoreGet,
): FavoritesSlice => ({
  favorites: [],
  isLoadingWishlist: false,

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

    set({ isLoadingWishlist: true } as Partial<RootState>);

    try {
      const wishlistItems = await getWishlist({
        sessionId: user.token,
        languageId,
      });

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
    } catch (error) {
      console.error('Помилка завантаження wishlist:', error);
      set({ isLoadingWishlist: false } as Partial<RootState>);
    }
  },
});
