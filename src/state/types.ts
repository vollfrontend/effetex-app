// src/state/types.ts

import type { Category, Language } from '@/src/api/types';
import type { Product } from '@/src/api/products';

// Re-export Language for convenience
export type { Language };

// ---------- FAVORITES ----------
export interface FavoritesSlice {
  favorites: Product[];
  isLoadingWishlist: boolean;
  addToFavorites: (item: Product) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  fetchWishlist: () => Promise<void>;
  setFavorites: (items: Product[]) => void;
}

// ---------- CATEGORIES ----------
export interface CategoriesSlice {
  categories: Category[];
  addToCategories: (item: Category) => void;
  setCategories: (items: Category[]) => void;
}

// ---------- NAVIGATION ----------
// ---------- NAVIGATION ----------
// Navigation properties moved to Settings

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

// ---------- LANGUAGE ----------
// Використовуємо тип Language з API

export interface LanguageSlice {
  availableLanguages: Language[];
  setAvailableLanguages: (languages: Language[]) => void;
  getCurrentLanguageObject: () => Language | undefined;
  loadLanguages: () => Promise<void>;
}

// ---------- SETTINGS ----------
export interface SettingsState {
  theme: 'light' | 'dark';
  language: 'uk' | 'en';
  currentRoute: string | null;
  currentProductId: string | null;
  isSideMenuOpen: boolean;
  currentLanguage: string;
  currentLanguageId: number;
  isLanguagesLoaded: boolean;
  isAuthenticated: boolean;
}

export interface SettingsSlice {
  settings: SettingsState;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'uk' | 'en') => void;
  setCurrentRoute: (route: string) => void;
  setCurrentProductId: (id: string | null) => void;
  setSideMenuOpen: (isOpen: boolean) => void;
  setCurrentLanguage: (languageCode: string) => void;
  setCurrentLanguageById: (languageId: number) => void;
}

// ---------- AUTH ----------
export interface User {
  customer_id: number;
  firstname: string;
  lastname: string;
  email: string;
  telephone?: string;
  token?: string;
}

export interface AuthSlice {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// ---------- ROOT ----------
export interface RootState
  extends FavoritesSlice,
    CategoriesSlice,
    CartSlice,
    LanguageSlice,
    SettingsSlice,
    AuthSlice {}
