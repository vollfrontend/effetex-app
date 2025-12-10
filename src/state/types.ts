// src/state/types.ts

import type { Category } from '@/src/api/types';
import type { Product } from '@/src/api/products';

// ---------- FAVORITES ----------
export interface FavoritesSlice {
  favorites: Product[];
  addToFavorites: (item: Product) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

// ---------- CATEGORIES ----------
export interface CategoriesSlice {
  categories: Category[];
  addToCategories: (item: Category) => void;
  setCategories: (items: Category[]) => void;
}

// ---------- NAVIGATION ----------
export interface NavigationSlice {
  currentRoute: string | null;
  setCurrentRoute: (route: string) => void;
  isSideMenuOpen: boolean;
  setSideMenuOpen: (isOpen: boolean) => void;
}

// ---------- CART ----------
export interface CartItem extends Product {
  quantity: number;
}

export interface CartSlice {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, amount: number) => void;
  clearCart: () => void;
}

// ---------- ROOT ----------
export interface RootState
  extends FavoritesSlice,
    CategoriesSlice,
    NavigationSlice,
    CartSlice {}
